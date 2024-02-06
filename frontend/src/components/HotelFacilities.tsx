import React from 'react'
import { hotelFacilities } from '../config/hotel-options-config';

type Props = {
    selectedFacilites: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const HotelFacilities = ({ selectedFacilites, onChange }: Props) => {
    return (
        <div className='border-b border-slate-700 pb-5'>
            <h4 className="font-bold">Property Facilities</h4>
            {hotelFacilities.map((facility) => (
                <label htmlFor="" className='flex items-center space-x-2'>
                    <input type="checkbox"
                        value={facility}
                        checked={selectedFacilites.includes(facility)}
                        onChange={onChange}
                    />
                    <span>{facility}</span>
                </label>
            ))}
        </div>
    )
}

export default HotelFacilities