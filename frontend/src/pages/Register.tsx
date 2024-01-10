
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../api-client'
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export type RegisterFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Register = () => {
    const { register, watch, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();
    const { showToast } = useAppContext();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const mutation = useMutation(apiClient.register, {
        onSuccess: async () => {
            showToast({message: "Registration Succesful", type: "SUCCESS"});
            await queryClient.invalidateQueries("validateToken");
            navigate("/");
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR"});
        }
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    })


    return (
        <form className='flex flex-col gap-5' onSubmit={onSubmit}>
            <h2 className='text-3xl font-bold '>Create an Account</h2>

            <div className='flex flex-col md:flex-row gap-5'>
                <label className='text-gray-700 text-sm font-bold flex-1'>
                    First Name
                    <input type="text" className='border rounded py-1 px-2 font-normal w-full'
                        {...register("firstName", { required: "This field is required" })} />
                        {errors.firstName && <span className='text-red-700'>{errors.firstName.message}</span> }
                </label>
                <label className='text-gray-700 text-sm font-bold flex-1'>
                    Last Name
                    <input type="text" className='border rounded py-1 px-2 font-normal w-full'
                        {...register("lastName", { required: "This field is required" })} />
                         {errors.lastName && <span className='text-red-700'>{errors.lastName.message}</span> }
                </label>
            </div>

            <label className='text-gray-700 text-sm font-bold flex-1'>
                Email
                <input type="email" className='border rounded py-1 px-2 font-normal w-full'
                    {...register("email", { required: "This field is required" })} />
                     {errors.email && <span className='text-red-700'>{errors.email.message}</span> }
            </label>

            <label className='text-gray-700 text-sm font-bold flex-1'>
                Password
                <input type="password" className='border rounded py-1 px-2 font-normal w-full'
                    {...register("password", 
                    { required: "This field is required", 
                    minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters"
                    } })} />
                     {errors.password && <span className='text-red-700'>{errors.password.message}</span> }
            </label>

            <label className='text-gray-700 text-sm font-bold flex-1'>
                Confirm Password
                <input type="password" className='border rounded py-1 px-2 font-normal w-full'
                    {...register("confirmPassword", {
                        validate:(val) => {
                            if(!val) {
                                return "This field is required"
                            } else if (watch("password") !== val) {
                                return "Your passwords do not match";
                            }
                        }
                    }
                     )} />
                      {errors.confirmPassword && <span className='text-red-700'>{errors.confirmPassword.message}</span> }
            </label>

            <span>

                <button type="submit" className='bg-blue-600 px-2 py-3 rounded text-white'>Create Account</button>
            </span>
        </form>
    )
}

export default Register