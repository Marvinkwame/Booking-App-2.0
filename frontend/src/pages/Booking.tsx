import { useParams } from "react-router-dom";
import * as apiClient from "./../api-client";
import { useQuery } from "react-query";
import BookingForm from "../Forms/BookingForm/BookingForm";
import { useSearchContext } from "../context/SearchContext";
import { useEffect, useState } from "react";
import BookingDetailSumary from "../components/BookingDetailSumary";
import { Elements } from "@stripe/react-stripe-js";
import { useAppContext } from "../context/AppContext";

const Booking = () => {
    const { hotelId } = useParams();
    const search = useSearchContext()
    const { stripePromise } = useAppContext()

    const [nightsToSpend, setNightsToSpend] = useState<number>(0)

    useEffect(() => {
        if (search.checkIn && search.checkOut) {
            const nights =
                Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) / (1000 * 60 * 60 * 24)
            setNightsToSpend(Math.ceil(nights))
        }
    }, [search.checkIn, search.checkOut])

    const { data: paymentIntentData } = useQuery("createPayentIntent",
        () => apiClient.createPaymentIntent(hotelId as string, nightsToSpend.toString()), {
        enabled: !!hotelId && nightsToSpend > 0,
    }
    )

    const { data: currentUser } = useQuery("currentUser", apiClient.getUserDetails)

    //getting hotel details
    const { data: hotel } = useQuery(
        "bookedHotel",
        () => apiClient.getSingleHotel(hotelId || ""),
        {
            enabled: !!hotelId,
        }
    )

    if (!hotel) {
        return <></>
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-4">
            <BookingDetailSumary
                hotel={hotel}
                checkIn={search.checkIn}
                checkOut={search.checkOut}
                adultCount={search.adultCount}
                childCount={search.childCount}
                nightsToSpend={nightsToSpend}
            />
            {currentUser && paymentIntentData && (
                <Elements stripe={stripePromise} 
                options={{ 
                    clientSecret:paymentIntentData.clientSecret,
                    }}>
                    <BookingForm currentUser={currentUser} paymentIntent={paymentIntentData} />
                </Elements>
            )}

        </div>
    )
}

export default Booking