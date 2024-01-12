import { useFormContext } from "react-hook-form"
import { hotelFacilities } from "../../config/hotel-options-config"
import { HotelFormData } from "./ManageHotelForm";

const FacilitiesSection = () => {
  const { register, formState: { errors } } = useFormContext<HotelFormData>();


  return (
    <div>
      <h2 className="mb-3 text-xl font-bold">Facilities</h2>

      <div className="grid grid-cols-4 gap-4">
        {hotelFacilities.map((facility) => (
          <label className="text-sm flex gap-1">
            <input type="checkbox"  value={facility}
            {...register("facilities", { 
              validate: (facilities) => {
                if(facilities.length > 0) {
                  return true
                } else {
                  return "One facility is required"
                }

              }
            })} 
             />
            <span>{facility}</span>
          </label>
        ))}
      </div>
      {errors.facilities && <span className='text-red-700'>{errors.facilities.message}</span>}

    </div>
  )
}

export default FacilitiesSection