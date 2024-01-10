
import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../api-client'
import { useAppContext } from '../context/AppContext';

const LogoutBtn = () => {
    const queryClient = useQueryClient()
    const { showToast } = useAppContext();


    const mutation = useMutation(apiClient.logout, {
        onSuccess: async () => {
          await queryClient.invalidateQueries("validateToken")
        showToast({message: "Logged Out", type: "SUCCESS"})
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR"});
        }
    })

    const handleClick = () => {
        mutation.mutate();
    }

  return (
    <button onClick={handleClick} className='text-white cursor-pointer bg-black px-4 py-2 font-bold'>Logout</button>
  )
}

export default LogoutBtn