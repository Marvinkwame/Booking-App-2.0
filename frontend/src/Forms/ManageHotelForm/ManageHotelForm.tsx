import { FormProvider, useForm } from "react-hook-form";
import DetailsFormSection from "./DetailsFormSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestSection from "./GuestSection";
import ImagesSection from "./ImagesSection";
import { HotelType } from "../../../../backend/src/shared/types";
import { useEffect } from "react";

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string; 
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  imageUrls: string[];
  adultCount: number;
  childCount: number;
}

type Props = { 
  hotel?: HotelType;
  onSave: (hotelFormData: FormData) => void;
  isLoading: boolean;
}

const ManageHotelForm = ({ onSave, isLoading, hotel }: Props) => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    reset(hotel)
    
  }, [hotel, reset])

  const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
    const formData = new FormData();

    if(hotel) {
      formData.append("hotelId", hotel._id)
    }
    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append("pricePerNight", formDataJson.pricePerNight.toString()); //cos formData deals with only string
    formData.append("starRating", formDataJson.starRating.toString());
    formData.append("adultCount", formDataJson.adultCount.toString());
    formData.append("childCount", formDataJson.childCount.toString());

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility)
    })

    if(formDataJson.imageUrls) {
      formDataJson.imageUrls.forEach((imageUrl, index) => {
        formData.append(`imageUrls[${index}]`, imageUrl)
      })
    }

    //converting the imagefiles into an array. Reasons is filelist type doesnt allow let us to use foreach
    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });

    onSave(formData)

    //multer takes the array of image files and process them for us and attach them to the request
  })


  return (

    <FormProvider {...formMethods}>
      <form className='flex flex-col gap-5' onSubmit={onSubmit}>
        <DetailsFormSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestSection />
        <ImagesSection />

        <span className="flex justify-end">
        <button disabled={isLoading} 
        type="submit" 
        className="bg-blue-500 rounded-md p-2 text-white font-bold hover:bg-blue-800 disabled:bg-black">
          {isLoading ? "Saving..." : "Save"}
          
          </button>
        </span>
      </form>
    </FormProvider>
  )
}

export default ManageHotelForm