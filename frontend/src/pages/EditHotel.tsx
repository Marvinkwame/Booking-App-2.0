import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom"
import * as apiClient from "../api-client"
import ManageHotelForm from "../Forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../context/AppContext";


const EditHotel = () => {
    const { hotelId } = useParams();
    const { showToast } = useAppContext();

    //useQuery is used for basic data fetching
    const { data: hotelData}  = useQuery("getSingleHotelById", 
    () =>  apiClient.getSingleHotelById(hotelId || ""), { 
        //so if there is a hotelId, then this function runs
        enabled: !!hotelId //check for a truthy value
    })

    const { mutate, isLoading } = useMutation(apiClient.updateHotel, {
      onSuccess: () => {
        showToast({ message: "Hotel Updated Succesfully", type: "SUCCESS" })
      },
      onError: () => {
        showToast({ message: "Server Error", type: "ERROR" })
      }
    })

    const handleSave = (hotelFormData: FormData) => {
      mutate(hotelFormData);
    }
  return (
    <div>
        <ManageHotelForm 
        hotel={hotelData} 
        onSave={handleSave} 
        isLoading={isLoading} 
         />
    </div>
  )
}

export default EditHotel