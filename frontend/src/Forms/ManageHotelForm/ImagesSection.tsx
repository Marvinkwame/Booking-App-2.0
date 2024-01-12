import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm";

const ImagesSection = () => {
    const { register, formState: { errors } } = useFormContext<HotelFormData>();


    return (
        <div>
            <h2 className="mb-3 text-xl font-bold">Hotel Images</h2>

            <div className=" border rounded-md p-4 flex flex-col gap-4">
                <input type="file"
                    multiple
                    accept="image/*"
                    className="w-full text-gray-700 font-normal"
                    {...register("imageFiles", {
                        validate: (imageFiles) => {
                            const totalLength = imageFiles.length;

                            if (totalLength === 0) {
                                return "At least 1 image should be added"
                            }

                            if (totalLength > 6) {
                                return "Total images canot be more than 6"
                            }

                            return true;
                        }
                    })}
                />
            </div>

            {errors.imageFiles && (<span className='text-red-700'>{errors.imageFiles.message}</span>)}
        </div>
    )
}

export default ImagesSection