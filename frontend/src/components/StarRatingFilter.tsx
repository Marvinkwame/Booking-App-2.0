import React from 'react'

type Props = {
  selectedStars: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void //type for checkbox
}

const StarRatingFilter = ({ selectedStars, onChange }: Props) => {
  return (
    <div className='border-b border-slate-700 pb-5'>
      <h4 className="font-bold">Property Rating</h4>
      {["1", "2", "3", "4", "5"].map((star) => (
        <label htmlFor="" className='flex items-center space-x-2'>
          <input type="checkbox"
            value={star}
            checked={selectedStars.includes(star)} //if the star selected is in the selectedStars array
            onChange={onChange}
          />
          <span>{star} Stars</span>
        </label>
      ))}
    </div>
  )
}

export default StarRatingFilter