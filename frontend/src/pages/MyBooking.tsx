
import { useQuery } from 'react-query'
import * as apiClient from "../api-client"

const MyBooking = () => {

    const { data: myBookings } = useQuery("myBookings", apiClient.getBookings)

    if (!myBookings || myBookings.length === 0) {
        return <span>No bookings found</span>;
    }

    console.log(myBookings)
    return (
        <div className='space-y-5'>
            <h3 className="text-3xl font-bold">My Bookings</h3>
            {myBookings.map((myBooking) => (
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] border-2 border-blue-600  rounded-md p-8 gap-5">
                    <div className='lg:w-full lg:h-[250px]'>
                        <img src={myBooking.imageUrls[0]}
                            className='w-full h-full object-cover object-center'
                            alt={myBooking.name} />
                    </div>

                    <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
                        <div className='text-2xl font-bold'>
                            {myBooking.name}
                            <div className="text-xs font-normal">
                                {myBooking.city}, {myBooking.country}
                            </div>
                        </div>

                        {myBooking.bookings.map((booking) => (
                            <div>
                                <div>
                                    <span className="font-bold mr-2">Dates:</span>
                                    <span>{new Date(booking.checkIn).toDateString()} -
                                        {new Date(booking.checkOut).toDateString()}
                                    </span>
                                </div>

                                <div>
                                    <span className="font-bold mr-2">Guests:</span>
                                    <span>
                                        {booking.adultCount} adults, {booking.childCount} child(ren)
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MyBooking