import { useState } from 'react'
import { useSearchContext } from '../context/SearchContext'
import { useQuery } from 'react-query'
import * as apiClient from "../api-client"
import SearchHotelCard from '../components/SearchHotelCard'
import Pagination from '../components/Pagination'
import StarRatingFilter from '../components/StarRatingFilter'
import HotelTypeFilter from '../components/HotelTypeFilter'
import HotelFacilities from '../components/HotelFacilities'
import PriceFilter from '../components/PriceFilter'

const SearchPage = () => {
  const search = useSearchContext()
  const [page, setPage] = useState<number>(1)
  const [selectedStars, setSelectedStars] = useState<string[]>([]) //state that stores the user selections
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedFacilites, setSelectedFacilities] = useState<string[]>([])
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>()
  const [sortOptions, setSortOptions] = useState<string>("")

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedTypes,
    facilities: selectedFacilites,
    maxPrice: selectedPrice?.toString(),
    sortOption: sortOptions
  }

  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value
    setSelectedStars((prevStars) =>
      event.target.checked ?
        [...prevStars, starRating] :
        prevStars.filter((star) => star !== starRating) //returns an new array of stars that star is not equl to the star selected
    )
  }

  const handleTypesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const typesSelected = event.target.value;
    setSelectedTypes((prevTypes) =>
      event.target.checked ?
        [...prevTypes, typesSelected] :
        prevTypes.filter(type => type !== typesSelected)
    )
  }

  const handleFacilitiesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const facilitiesSelected = event.target.value;
    setSelectedFacilities((prevFacilities) =>
      event.target.checked ?
        [...prevFacilities, facilitiesSelected]
        : prevFacilities.filter(facility => facility !== facilitiesSelected)
    )
  }

  const { data: hotelData } = useQuery(
    ["searchHotels", searchParams], () => apiClient.getSearchHotel(searchParams))

  console.log(hotelData)
  return (
    <div className='grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5'>
      {/* Filter Column */}
      <div className="rounded-lg border border-slate-800  p-5 h-fit sticky top-10">
        <div className='space-y-5 pb-5  '>
          <h3 className='pb-4 border-b border-b-slate-700 font-bold'>Filter By</h3>
          <StarRatingFilter selectedStars={selectedStars} onChange={handleStarsChange} />
          <HotelTypeFilter selectedType={selectedTypes} onChange={handleTypesChange} />
          <HotelFacilities selectedFacilites={selectedFacilites} onChange={handleFacilitiesChange} />
          <PriceFilter selectedPrice={selectedPrice} onChange={(value?: number) => setSelectedPrice(value)} />
        </div>

      </div>

      <div className="flex flex-col gap-4 ">
        <div className="flex items-center justify-between">
          <span className='text-2xl font-bold'>
            {hotelData?.pagination.total} Hotels Found
            {search.destination ? ` in ${search.destination} ` : "."}
          </span>

          {/* Sort Options */}
          <select
            className="p-2 border rounded-md"
            value={sortOptions}
            onChange={(event) => setSortOptions(event.target.value)}>
            <option>Sort by</option>
            <option value="starRating">Star Rating</option>
            <option value="pricePerNightAsc">Price Per Night(Low To High)</option>
            <option value="pricePerNightDesc">Price Per Night (High To Low)</option>

          </select>
        </div>

        {/* Hotels Display */}
        {hotelData?.data.map((hotel) => (
          <SearchHotelCard hotel={hotel} />
        ))}
        <Pagination
          page={hotelData?.pagination.page || 1}
          pages={hotelData?.pagination.pages || 1}
          onPageChange={(page) => setPage(page)}
        />

      </div>
    </div>
  )
}

export default SearchPage