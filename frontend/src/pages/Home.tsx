import { useQuery } from "react-query"
import * as apiClient from "../api-client"
import { Link } from "react-router-dom";


const Home = () => {
  const { data: allHotels } = useQuery("fetchAllHotels", apiClient.getAllHotels)

  
  const choose = allHotels?.slice(0, 7) || [];
  return (
    <div className="space-y-3">
      <h2 className="text-3xl font-bold">Choose your perfect destinations</h2>
      <p>Search hotels and cities of your choice</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {choose.map((hotel) => (
          <Link className="grid grid-cols-[1fr_2fr] gap-2" to={`/hotel-details/${hotel._id}`} key={hotel._id}>
            <div className='lg:w-[200px] lg:h-[150px]'>
              <img src={hotel.imageUrls[0]}
                className='w-full h-full rounded-lg object-cover object-center'
                alt="" />
            </div>

            <div className="">
              <div className="text-blue-600 font-bold text-lg italic"> 
              {hotel.city}, {hotel.country} 
              <div className="text-gray-600">{hotel.type}</div>
            </div>
            </div>
          </Link>
        ))}
      </div>
      
    </div>
  )
}

export default Home