import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useSearchContext } from "../../context/SearchContext";
import { useAppContext } from "../../context/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
    hotelId: string;
    pricePerNight: number;
}

type GuestInfoFormData = {
    checkIn: Date;
    checkOut: Date;
    adultCount: number;
    childCount: number
}

const GuestInfoForm = ({ hotelId, pricePerNight }: Props) => {
    const search = useSearchContext()
    const { isLoggedIn } = useAppContext()
    const navigate = useNavigate()
    const location = useLocation()


    const { watch,
        handleSubmit,
        register,
        setValue,
        formState: { errors }
    } = useForm<GuestInfoFormData>({
        defaultValues: {
            checkIn: search.checkIn,
            checkOut: search.checkOut,
            adultCount: search.adultCount,
            childCount: search.childCount
        }
    });

    const checkIn = watch("checkIn");
    const checkOut = watch("checkOut")

    const minDate = new Date(); //todays date
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1); //1 year from now

    //save the data inside the searchContext
    //saving it becos when the user signs it, we want to pre-populate the fields with the already existing data
    const signClick = (data: GuestInfoFormData) => {
        search.saveSearchValues("",
            data.checkIn,
            data.checkOut,
            data.adultCount,
            data.childCount)
        navigate("/login", { state: { from: location } })
        //saves the url which has the hotelId so that we can push them back to this page after they have signed in
    }

    //when the user is signed in
    const onBookingSubmit = (data: GuestInfoFormData) => {
        search.saveSearchValues(
            "",
            data.checkIn,
            data.checkOut,
            data.adultCount,
            data.childCount)
        navigate(`/hotel/${hotelId}/booking`);
    }


    return (
        <div className="bg-teal-800 p-4 flex flex-col gap-4">
            <h3 className="text-white font-bold text-xl">
                ${pricePerNight} PerNight
            </h3>

            <form action=""
                onSubmit={
                    isLoggedIn ? handleSubmit(onBookingSubmit) : handleSubmit(signClick)
                }>
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <DatePicker
                            required
                            selected={checkIn}
                            onChange={(date) => setValue("checkIn", date as Date)}
                            selectsStart //select the first date
                            startDate={checkIn}
                            endDate={checkOut}
                            minDate={minDate}
                            maxDate={maxDate}
                            placeholderText='Check-In Date'
                            className='min-w-full bg-blue-500 font-semibold text-xl text-white p-3 focus:outline-none'
                            wrapperClassName='min-w-full'
                        />
                    </div>

                    <div>
                        <DatePicker
                            required
                            selected={checkOut}
                            onChange={(date) => setValue("checkOut", date as Date)}
                            selectsStart //select the first date
                            startDate={checkIn}
                            endDate={checkOut}
                            minDate={minDate}
                            maxDate={maxDate}
                            placeholderText='Check-Out Date'
                            className='min-w-full bg-blue-500 font-semibold text-xl text-white p-3 focus:outline-none'
                            wrapperClassName='min-w-full'
                        />
                    </div>

                    <div className="flex justify-center bg-blue-500  gap-2 p-2">
                        <label className='flex items-center'>
                            Adults:
                            <input type="number"
                                className='w-full p-1 focus:outline-none font-bold bg-blue-500'
                                min={1}
                                max={20}
                                {...register("adultCount", {
                                    required: "This field is required",
                                    min: {
                                        message: "There must be at least 1 adult",
                                        value: 1
                                    },
                                    valueAsNumber: true //gets the input as a number
                                })}
                            />
                        </label>
                        <label className='flex items-center'>
                            Child:
                            <input type="number"
                                className='w-full p-1 focus:outline-none font-bold bg-blue-500'
                                min={0}
                                max={20}
                                {...register("childCount", {
                                    valueAsNumber: true
                                })}
                            />
                        </label>
                        {errors.adultCount && (
                            <span className="text-red-500 font-semibold text-sm">
                                {errors.adultCount.message}
                            </span>
                        )}
                    </div>
                    {isLoggedIn ?
                        (<button className="bg-black p-4 rounded-md text-white font-bold">Book Now</button>)
                        : (
                            <button className="bg-black p-4 rounded-md text-white font-bold">Sign In To Book</button>
                        )}
                </div>
            </form>

        </div>
    )
}

export default GuestInfoForm