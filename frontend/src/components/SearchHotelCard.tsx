
import { HotelType } from '../../../backend/src/shared/types'
import { TiStar } from "react-icons/ti";
import { Link } from 'react-router-dom';
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

type SearchResultProps = {
    hotel: HotelType
}

const SearchHotelCard = ({ hotel }: SearchResultProps) => {
    return (
        <div className='border-2 border-sky-900 gap-4  rounded-md p-4 grid grid-cols-1 xl:grid-cols-[2fr_3fr]'>
            {/* Hotel Images */}
            <div className="w-full h-[330px]">
                <img src={hotel.imageUrls[0]} alt="" className='w-full h-full object-cover object-center' />
            </div>

            {/* Hotel Content */}
            <div className='grid grid-rows-[1fr_2fr_1fr]'>
                <div>
                    <div className='flex items-center gap-1'>
                        <span className='flex'>
                            {Array.from({ length: hotel.starRating }).map(() => (
                                <TiStar className="fill-yellow-500" />
                            ))}
                        </span>
                        <span className='font-bold text-xl'> {hotel.type} </span>
                    </div>
                    <Link to={`/hotel-details/${hotel._id}`} className='cursor-pointer text-xl font-semibold'>{hotel.name}</Link>
                </div>

                <div>
                    <div className='line-clamp-3'>
                        {hotel.description}
                    </div>
                </div>

                <div className='grid grid-cols-2 items-end p-2 whitespace-nowrap'>
                    <div className="flex gap-1 items-center">
                        {hotel.facilities.slice(0, 3).map((facility) => (
                            <span className='bg-sky-500 p-2 text-xs rounded-md'>{facility}</span>
                        ))}
                        <span className='text-sm'>
                            {hotel.facilities.length > 3 && `+${hotel.facilities.length - 3} more`}'
                        </span>
                    </div>

                    <div className='flex flex-col items-end'>
                        <p className='text-bold'>
                            <span className='font-bold text-2xl'>${hotel.pricePerNight} </span>
                            per night
                        </p>
                        <Link to={`/hotel-details/${hotel._id}`}
                            className='bg-teal-950 flex items-center gap-2 font-bold h-full max-w-fit p-2 text-white'>
                            View More
                            <MdOutlineKeyboardDoubleArrowRight />
                        </Link>
                    </div>
                </div>
            </div>
        </div> 
    )
}

export default SearchHotelCard