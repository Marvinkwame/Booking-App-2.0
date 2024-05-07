
import * as apiClient from "../api-client"
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';

const HomePageTypes = () => {
    const { type } = useParams()
    const { data: typeData } = useQuery("fetchTypes",
        () => apiClient.getTypes(type || ""),
        { enabled: !!type })

    if (!typeData) {
       return <span>No Data Found</span>
    }
    return (
        <div>
            <h2 className='font-bold text-2xl text-center mb-8'>
                {typeData &&
                    <>
                        {type} Available
                    </>
                }
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3'>
                {typeData?.map((type) => (
                    <Link to={`/hotel-details/${type._id}`} key={type._id}>
                        <div className='lg:w-full lg:h-[250px]'>
                            <img src={type.imageUrls[0]}
                                alt={type.name}
                                className='w-full h-full object-cover object-center'
                            />
                        </div>

                        <p className='text-lg font-bold'>{type.name}</p>
                        <p className='text-lg font-bold'>Location: {type.city} , {type.country}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default HomePageTypes 