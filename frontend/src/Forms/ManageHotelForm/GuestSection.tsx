import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm";

const GuestSection = () => {
    const { register, formState: { errors } } = useFormContext<HotelFormData>();


    return (
        <div>
            <h2 className="mb-3 text-xl font-bold">Guests(To be Allowed)</h2>

            <div className="flex gap-4 bg-blue-400 p-4 rounded-md">

                <label className='text-gray-700 text-sm font-bold flex-1'>
                    Adults
                    <input type="number" min={1} 
                        {...register("adultCount", { required: "This field is required" })}
                        className='border rounded py-1 px-2 font-normal w-full' id="" />
                    {errors.adultCount?.message && <span className='text-red-700'>{errors.adultCount?.message}</span>}
                </label>

                <label className='text-gray-700 text-sm font-bold flex-1'>
                    Children
                    <input type="number" min={1} 
                        {...register("childCount", { required: "This field is required" })}
                        className='border rounded py-1 px-2 font-normal w-full' id="" />
                    {errors.childCount?.message && <span className='text-red-700'>{errors.childCount?.message}</span>}
                </label>
            </div>


        </div>
    )
}

export default GuestSection