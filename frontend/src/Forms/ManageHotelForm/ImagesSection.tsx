import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm";

const ImagesSection = () => {
    const { register, formState: { errors }, watch, setValue } = useFormContext<HotelFormData>();

    const existingImages = watch("imageUrls")
    console.log(existingImages)

    const handleDelete = (
        event: React.MouseEvent<HTMLButtonElement,
            MouseEvent>, imageUrl: string) => {
        event.preventDefault();
        setValue("imageUrls", existingImages.filter((url) => url !== imageUrl))
    }


    return (
        <div>
            <h2 className="mb-3 text-xl font-bold">Hotel Images</h2>

            <div className=" border rounded-md p-4 flex flex-col gap-4">
                {existingImages && (
                    <div className="grid grid-cols-6 gap-4">
                        {existingImages.map((image) => (
                            <div className="relative group">
                                <img src={image} className="min-h-full object-cover" alt="" />
                                <button
                                    onClick={(event) => handleDelete(event, image)}
                                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white ">
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                <input type="file"
                    multiple
                    accept="image/*"
                    className="w-full text-gray-700 font-normal"
                    {...register("imageFiles", {
                        validate: (imageFiles) => {
                            const totalLength = imageFiles.length + (existingImages?.length || 0);

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