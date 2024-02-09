
import { HotelType } from '../../../backend/src/shared/types';

type Props = {
    nightsToSpend: number;
    checkIn: Date;
    checkOut: Date;
    adultCount: number;
    childCount: number;
    hotel: HotelType
}

const BookingDetailSumary = ({ adultCount, checkIn, checkOut, childCount, hotel, nightsToSpend }: Props) => {
    return (
        <div className="p-4 grid gap-3 h-fit rounded border-2">
            <h3>Your Booking Details</h3>

            <div className="border-b-2 py-3">Location:
                <div className="font-bold">
                    {`${hotel.name}, ${hotel.city}, ${hotel.country}`}
                </div>
            </div>

            <div className="flex items-center justify-between border-b py-2">
                <div>
                    Check-In:
                    <div className="font-bold">{checkIn.toDateString()}</div>
                </div>
                <div>
                    Check-Out:
                    <div className="font-bold">{checkOut.toDateString()}</div>
                </div>
            </div>

            <div>
                Total Nights:
                <div className="font-bold">{nightsToSpend} nights</div>
            </div>

            <div>
                Guest: <div className='font-bold'>{adultCount} adults & {childCount} child(ren)</div>
            </div>

        </div>
    )
}

export default BookingDetailSumary