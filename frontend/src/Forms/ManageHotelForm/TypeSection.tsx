import { useFormContext } from "react-hook-form"
import { hotelTypes } from "../../config/hotel-options-config"
import { HotelFormData } from "./ManageHotelForm";

const TypeSection = () => {
    const { register, watch, formState: { errors } } = useFormContext<HotelFormData>();
    const  typeWatch = watch("type");


  return (
    <div>
        <h2 className="mb-3 text-xl font-bold">Types</h2>

        <div className="grid grid-cols-5 gap-3">
            {hotelTypes.map((type) => (
                <label className={
                    typeWatch === type ? 'bg-blue-400 cursor-pointer text-sm rounded-sm px-3 py-4 text-white font-semibold' 
                    : 'cursor-pointer text-sm rounded-sm px-3 py-4 font-semibold'
                }>
                    <input type="radio" value={type}  id="" className="hidden"
                    {...register("type", { required: "This field is required" })} />
                    <span>{type}</span>
                </label>
            ))}
        </div> 
        {errors.type && <span className='text-red-700'>{errors.type.message}</span>}
    </div>
  )
}

export default TypeSection