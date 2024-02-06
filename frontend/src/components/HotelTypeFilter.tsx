import React from 'react'
import {  hotelTypes } from '../config/hotel-options-config';

type Props = {
    selectedType: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const HotelTypeFilter = ({ selectedType, onChange } : Props) => {
  return (
    <div className='border-b border-slate-700 pb-5'>
        <h4 className="font-bold">Property Type</h4>
        {hotelTypes.map((type) => (
            <label className='flex items-center space-x-2'>
                <input type="checkbox" 
                value={type} 
                checked={selectedType.includes(type)} 
                onChange={onChange}
                
                 />
                <span>{type}</span>
            </label>
        ))}
    </div>
  )
}

export default HotelTypeFilter