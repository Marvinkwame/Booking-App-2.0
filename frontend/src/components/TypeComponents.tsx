
import { hotelTypes } from '../config/hotel-options-config'
import { Link } from 'react-router-dom'

const TypeComponents = () => {
  return (
    <div className='py-20'>
      <h2 className='mb-6 text-2xl font-bold'>Browse by Property Type</h2>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        {hotelTypes.map((type, index) => (
          <Link to={`/types/${type}`} key={index}>
            <div className="w-full h-[100px] md:h-[330px]">
              <img src={`/public/img/${type}.jpg`}
                className='w-full h-full object-cover object-center'
                alt={type} />
            </div>

            <span className='text-xl text-slate-600 font-bold'>{type}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default TypeComponents