import { useMutation } from "react-query"
import ManageHotelForm from "../Forms/ManageHotelForm/ManageHotelForm"
import * as apiClient from '../api-client'
import { useAppContext } from "../context/AppContext"


const CreateHotel = () => {
  const { showToast } = useAppContext()


  const { mutate, isLoading } = useMutation(apiClient.createHotel, {
    onSuccess: () => {
      showToast({ message: "Hotel Created", type: "SUCCESS"})
    }, 
    onError: () => {
      showToast({ message: "Error in creating hotel", type: "ERROR"})
    }
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData)
  }
  return (
    <ManageHotelForm onSave={handleSave} isLoading={isLoading} />
  )
}

export default CreateHotel