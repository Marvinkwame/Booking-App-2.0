import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import * as apiClient from "../api-client"
import { useAppContext } from '../context/AppContext'
import { FaLocationDot, FaRegStar } from "react-icons/fa6";
import { FaRegBuilding } from "react-icons/fa";
import { BiDollar } from "react-icons/bi";
import { MdPeople } from "react-icons/md";

const MyHotels = () => {
    const { showToast } = useAppContext()

    const { data: hotelData } = useQuery("getHotels", apiClient.getHotels, {
        onError: () => {
            showToast({ message: "Fetching Hotels Failed", type: "ERROR" })
        }
    })

    if (!hotelData) {
        return <span>No Hotel Found</span>
    }


    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <h2 className='text-3xl font-semibold'>My Hotels</h2>

                <Link to="/add-hotel"
                    className='border-none px-4 py-2 bg-teal-950 hover:bg-teal-900 text-white font-bold'>
                    Add Hotel
                </Link>
            </div>

            <div className="flex flex-col gap-y-6 items-center">
                {hotelData.map((hotel) => (
                    <div className='flex flex-col gap-y-4'>
                        <h2 className='text-2xl font-semibold  flex'> {hotel.name}.
                            <span className='flex items-center'>
                                <FaLocationDot className="h-4" /> ({hotel.city}, {hotel.country})
                            </span>
                        </h2>
                        <p className='whitespace-pre-line'>{hotel.description}</p>
                        <div className="grid grid-cols-4 gap-2">
                            <div className="border flex items-center">
                                <BiDollar />
                                {hotel.pricePerNight} per night
                            </div>
                            <div className="border flex items-center gap-2">
                                <FaRegBuilding />
                                {hotel.type} 
                            </div>
                            <div className="border flex items-center gap-2">
                                <MdPeople />
                                {hotel.adultCount} Adults,  {hotel.childCount} Children
                            </div>
                            <div className="border flex items-center gap-2">
                                <FaRegStar className="text-yellow-500 font-bold h-6" />
                                {hotel.starRating} rating
                            </div>
                        </div>
                        <span className='flex justify-end'>
                            <Link to={`/edit-hotel/${hotel._id}`}
                                className='border-none px-4 py-2 bg-teal-950 hover:bg-teal-900 text-white font-bold'>
                                View Hotel
                            </Link>
                        </span>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default MyHotels