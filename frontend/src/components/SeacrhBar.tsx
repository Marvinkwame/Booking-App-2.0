import React, { FormEvent, useState } from 'react'
import { useSearchContext } from '../context/SearchContext'
import { CiLocationOn } from "react-icons/ci";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';

const SeacrhBar = () => {
  const search = useSearchContext()
  console.log(search)
  const navigate = useNavigate()

  const [destination, setDestination] = useState<string>(search.destination)
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn)
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut)
  const [adultCount, setAdultCount] = useState<number>(search.adultCount)
  const [childCount, setChildCount] = useState<number>(search.childCount)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    //save the values to the global state 
    search.saveSearchValues(
      destination,
      checkIn, checkOut,
      adultCount, childCount)
    navigate("/search")
  }

  const minDate = new Date(); //todays date
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1); //1 year from now
  return (
    <form onSubmit={handleSubmit}
      className='-mt-16 px-4 py-8  rounded-md bg-slate-800
      shadow-md grid grid-cols-2 lg:grid-cols-5 2xl:grid-cols-5 gap-4 items-center'>
      {/* Destination */}


      <fieldset className='border-2 border-slate-500 text-white'>
        <legend className='ml-4'>Destination</legend>
        <div className='flex flex-row items-center flex-1 gap-2 bg-transparent p-2'>
          <CiLocationOn  size={23} className="mr-2" />
          <input type="text" className='text-base p-1 w-full focus:outline-none bg-transparent'
            placeholder='Enter Destination' value={destination}
            onChange={(event) => setDestination(event.target.value)}
          />
        </div>
      </fieldset>

      {/* Adult and Child Count */}

      <fieldset className='border-2 border-slate-500 text-white'>
        <legend className='ml-4'>Adult-&-Child</legend>
        <div className="flex bg-transparent justify-center gap-2 p-2">
          <label className='flex items-center '>
            Adults:
            <input type="number"
              className='w-full p-1 focus:outline-none font-bold bg-transparent' min={1}
              value={adultCount} max={25}
              onChange={(event) => setAdultCount(parseInt(event.target.value))} />
          </label>

          <label className='flex items-center'>
            Children:
            <input type="number"
              className='w-full p-1 focus:outline-none font-bold bg-transparent' min={0}
              value={childCount} max={15}
              onChange={(event) => setChildCount(parseInt(event.target.value))} />
          </label>
        </div>
      </fieldset>

      {/* Dates */}
      <fieldset className='border-2 border-slate-500 text-white'>
        <legend className='ml-4'>Check-in</legend>
        <div>
          <DatePicker
            selected={checkIn}
            onChange={(date) => setCheckIn(date as Date)}
            selectsStart //select the first date
            startDate={checkIn}
            endDate={checkOut}
            minDate={minDate}
            maxDate={maxDate}
            placeholderText='Check-In Date'
            className='min-w-full bg-transparent p-3 focus:outline-none'
            wrapperClassName='min-w-full'
          />
        </div>
      </fieldset>

      <fieldset className='border-2 border-slate-500 text-white'>
        <legend className='ml-4'>Check-Out</legend>
        <div>
          <DatePicker
            selected={checkOut}
            onChange={(date) => setCheckOut(date as Date)}
            selectsStart //select the first date
            startDate={checkIn}
            endDate={checkOut}
            minDate={minDate}
            maxDate={maxDate}
            placeholderText='Check-In Date'
            className='min-w-full bg-transparent p-3 focus:outline-none'
            wrapperClassName='min-w-full'
          />
        </div>
      </fieldset>


      <div className="flex items-center  justify-center gap-4">
        <button type="submit"
          className='border-none w-2/3 h-[55px] px-4 py-2 bg-teal-950 hover:bg-teal-900 text-white font-bold'
        >
          Search
        </button>

        <button type="submit"
          className='border-none w-2/3 h-[55px] px-4 py-2 bg-black hover:bg-red-800 text-white font-bold'>
          Clear
        </button>
      </div>

    </form>
  )
}

export default SeacrhBar