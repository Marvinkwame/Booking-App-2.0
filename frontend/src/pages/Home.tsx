import { useQuery } from "react-query"
import * as apiClient from "../api-client"
import { Link } from "react-router-dom";
import TypeComponents from "../components/TypeComponents";


const Home = () => {
  const { data: allHotels } = useQuery("fetchAllHotels", apiClient.getAllHotels)


  const choose = allHotels?.slice(0, 7) || [];
  return (
    <div className="space-y-3">
      <h2 className="text-3xl font-bold">Choose your perfect destinations</h2>
      <p>Search hotels and cities of your choice</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {choose.map((hotel) => (
          <Link className="grid grid-cols-[1fr_2fr] p-2 rounded-lg bg-white gap-4" to={`/hotel-details/${hotel._id}`} key={hotel._id}>
            <div className='lg:w-[150px] lg:h-[130px]'>
              <img src={hotel.imageUrls[0]}
                className='w-full h-full rounded-lg object-cover object-center'
                alt="" />
            </div>

            <div className="grid gap-2">
              <div className="text-gray-600 font-bold text-lg italic">
                {hotel.city}, {hotel.country}
                <div className="text-gray-600">{hotel.type}</div>
              </div>
              <ul className="flex items-center flex-row flex-wrap  font-bold gap-4">
                {hotel.facilities.slice(0,3).map((facility) => (
                  <li className="text-[14px] flex ">{facility}</li>
                ))}
              </ul>
            </div>
          </Link>
        ))}
      </div>
      <TypeComponents />

    </div>
  )
}

export default Home