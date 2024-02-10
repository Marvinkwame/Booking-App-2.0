
import { useForm } from 'react-hook-form';
import { PaymentIntentResponse, UserType } from '../../../../backend/src/shared/types';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { StripeCardElement } from '@stripe/stripe-js';
import { useNavigate, useParams } from "react-router-dom";
import { useSearchContext } from '../../context/SearchContext';
import { useMutation } from 'react-query';
import * as apiClient from '../../api-client'
import { useAppContext } from '../../context/AppContext';

type Props = {
    currentUser: UserType;
    paymentIntent: PaymentIntentResponse;
}

export type BookingFormData = {
    firstName: string;
    lastName: string;
    email: string;
    adultCount: number;
    childCount: number;
    checkIn: string;
    checkOut: string;
    hotelId: string;
    totalAmount: number;
    paymentIntentId: string; //USED TO CHECK THE STATUS OF THE PAYMENT
}

const BookingForm = ({ currentUser, paymentIntent }: Props) => {
    const stripe = useStripe(); //gives us access to all the features in stripe
    const elements = useElements();
    const { hotelId } = useParams()
    const search = useSearchContext()
    const { showToast } = useAppContext()
    const navigate = useNavigate()

    const { mutate: bookRoom, isLoading } = useMutation(apiClient.createBooking, {
        onSuccess: () => {
            showToast({ message: "Reservation Successful", type: "SUCCESS" });
            navigate("/my-bookings")
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" });
        }
    })


    const { handleSubmit, register } = useForm<BookingFormData>({
        defaultValues: {
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            email: currentUser.email,
            adultCount: search.adultCount,
            childCount: search.childCount,
            checkIn: search.checkIn.toISOString(),
            checkOut: search.checkOut.toISOString(),
            hotelId: hotelId,
            paymentIntentId: paymentIntent.paymentIntentId,
            totalAmount: paymentIntent.totalAmount,
        }
    })

    const onSubmit = async (formData: BookingFormData) => {

        if (!stripe || !elements) {
            return //very very important
        }

        //confirm and completes the payment with the card details the user entered 
        const result = await stripe.confirmCardPayment( //send the card details the user entered to stripe
            paymentIntent.clientSecret, //tells stripe what invoice the user is paying for 
            {
                payment_method: {
                    card: elements.getElement(CardElement) as StripeCardElement,
                }
            }
        ) //

        //NB: When the page loads, it immediately creates the payment intent by default. 
        //Displays the total price and the user enters the card details
        //Check the Page compnent to see how its done
        //checking the status for the status
        if (result.paymentIntent?.status == "succeeded") {
            //book the room
            bookRoom({ ...formData, paymentIntentId: result.paymentIntent.id }) //to make sure we have the most update payment intent
        }
    }

    return (
        <form className='flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
            <h2 className='text-3xl font-semibold'>Confirm Reservation Details</h2>

            <div className="grid grid-cols-2 gap-6">
                <label>
                    First Name
                    <input type="text"

                        disabled
                        readOnly
                        className='border w-full mt-1 rounded-md py-2 px-3 text-gray-700 bg-gray-200'
                        {...register("firstName")}
                    />
                </label>

                <label>
                    Last Name
                    <input type="text"

                        disabled
                        readOnly
                        className='border w-full mt-1 rounded-md py-2 px-3 text-gray-700 bg-gray-200'
                        {...register("lastName")}
                    />
                </label>
            </div>

            <label>
                Email
                <input type="email"
                    disabled
                    readOnly
                    className='border w-full mt-1 rounded-md py-2 px-3 text-gray-700 bg-gray-200'
                    {...register("email")}
                />
            </label>

            <div className="space-y-2">
                <h2 className='text-xl font-semibold'>Booking Summry</h2>
                <div className='bg-blue-200 p-4 rounded-md'>
                    <div className="font-semibold">
                        Total Cost: ${paymentIntent.totalAmount.toFixed(2)}
                    </div>

                    <div className="text-xs">
                        Includes taxes and charges
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <h3 className="text-xl font-semibold">
                    Payment Details
                </h3>
                <CardElement id='payment-element' className='border rounded-md p-2 text-sm' />
            </div>

            <div className="flex justify-end">
                <button type='submit'
                disabled={isLoading}
                    className='bg-teal-800 py-2 px-4 font-bold text-white disabled:bg-black'>
                    {isLoading ? "Confirming..." : 'Confirm Reservation'}
                </button>
            </div>
        </form>
    )
}

export default BookingForm