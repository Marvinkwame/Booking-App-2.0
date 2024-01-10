
import { useForm } from 'react-hook-form'
import * as apiClient from '../api-client'
import { useMutation, useQueryClient } from 'react-query';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'

export type LoginFormData = {
    email: string;
    password: string;
}

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
    const { showToast } = useAppContext();
    const navigate = useNavigate();
    const queryClient = useQueryClient()

    const mutation = useMutation(apiClient.login, {
        onSuccess: async () => {
            showToast({ message: "Login Succesful", type: "SUCCESS" });
            await queryClient.invalidateQueries("validateToken");
            navigate("/");
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" });
        }
    })

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    })


    return (
        <form className='flex flex-col gap-5' onSubmit={onSubmit}>
            <h2 className='text-3xl font-bold'>Login</h2>

            <label className='text-gray-700 text-sm font-bold flex-1'>
                Email
                <input type="email" className='border rounded py-1 px-2 font-normal w-full'
                    {...register("email", { required: "This field is required" })} />
                {errors.email && <span className='text-red-700'>{errors.email.message}</span>}
            </label>

            <label className='text-gray-700 text-sm font-bold flex-1'>
                Password
                <input type="password" className='border rounded py-1 px-2 font-normal w-full'
                    {...register("password",
                        {
                            required: "This field is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters"
                            }
                        })} />
                {errors.password && <span className='text-red-700'>{errors.password.message}</span>}
            </label>


            <span className='flex items-center justify-between'>
                <span className='text-sm'>
                    Not Registered?  <Link to="/register" className='underline'>Click here to create an account</Link>
                </span>
                <button type="submit" className='bg-blue-600 px-2 py-3 rounded text-white'>Login</button>
            </span>
        </form>
    )
}

export default Login