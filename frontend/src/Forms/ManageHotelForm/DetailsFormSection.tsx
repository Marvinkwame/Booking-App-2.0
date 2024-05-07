import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm";
import { useLocation } from "react-router-dom";


const DetailsFormSection = () => {
    const { register, formState: { errors } } = useFormContext<HotelFormData>();
    const location = useLocation();
    const { pathname } = location;
    const addHotelPath = pathname === '/add-hotel';

    return (
        <div className="flex flex-col gap-8">
            <h2 className="text-3xl font-bold mb-3">
                {addHotelPath ? "Add Hotel" : "Edit Hotel"}
            </h2>

            <label className='text-gray-700 text-sm font-bold flex-1'>
                Name
                <input type="text" className='border rounded py-1 px-2 font-normal w-full'
                    {...register("name", { required: "This field is required" })} />
                {errors.name && <span className='text-red-700'>{errors.name.message}</span>}
            </label>

            <div className='flex flex-col md:flex-row gap-5'>
                <label className='text-gray-700 text-sm font-bold flex-1'>
                    City
                    <input type="text" className='border rounded py-1 px-2 font-normal w-full'
                        {...register("city", { required: "This field is required" })} />
                    {errors.city && <span className='text-red-700'>{errors.city.message}</span>}
                </label>
                <label className='text-gray-700 text-sm font-bold flex-1'>
                    Country
                    <input type="text" className='border rounded py-1 px-2 font-normal w-full'
                        {...register("country", { required: "This field is required" })} />
                    {errors.country && <span className='text-red-700'>{errors.country.message}</span>}
                </label>
            </div>

            <label className='text-gray-700 text-sm font-bold flex-1'>
                Description
                <textarea
                    className='border rounded py-1 px-2 font-normal w-full'
                    cols={30} rows={10}
                    {...register("description", { required: "This field is required" })}
                >
                </textarea>
                {errors.description && <span className='text-red-700'>{errors.description.message}</span>}
            </label>

            <label className='text-gray-700 text-sm font-bold max-w-[50%]'>
                Price Per Night
                <input type="number" min={1}
                    className='border rounded py-1 px-2 font-normal w-full'
                    {...register("pricePerNight", { required: "This field is required" })}
                />
                {errors.pricePerNight && <span className='text-red-700'>{errors.pricePerNight.message}</span>}
            </label>

            <label className='text-gray-700 text-sm font-bold max-w-[50%]'>
                Star Rating
                <select {...register("starRating", { required: "This field is required" })} className="border rounded w-full p-2 text-gray-700 font-normal">
                    <option value="" className="text-sm font-bold">
                        Select as Rating
                    </option>
                    {[1, 2, 3, 4, 5].map((num) => (
                        <option value={num}>{num}</option>
                    ))}
                </select>
                {errors.starRating && <span className='text-red-700'>{errors.starRating.message}</span>}
            </label>


        </div>
    )
}

export default DetailsFormSection