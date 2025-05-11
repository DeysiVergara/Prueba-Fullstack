import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import type { LoginForm } from "../types";
import { ErrorMessage } from "../components/ErrorMessage";
import api from "../config/axios";

export const LoginView = () => {
  const initialValues: LoginForm = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const handleLogin = async (formData: LoginForm) => {
    try {
      const { data } = await api.post(`/auth/login`, formData);
      localStorage.setItem("AUTH_TOKEN", data);
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.error);
      }
    }
  };

  return (
    <>
      <div className='flex w-full h-screen'>
        <div className='w-full lg:w-1/2 flex justify-center bg-[#F2F2F2]'>
          <div className='bg-white px-10 py-20 rounded-3xl border-2 border-gray-100'>
            <h1 className='text-5xl font-semibold'>Welcome Back</h1>
            <p className='font-medium text-lg text-gray-500 mt-4'>
              Welcome back! Pleace enter your details.
            </p>
            <form onSubmit={handleSubmit(handleLogin)}>
              <div className='mt-8 '>
                <div>
                  <label htmlFor='' className='text-lg font-medium'>
                    Email
                  </label>
                  <input
                    id='email'
                    type='text'
                    className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                    placeholder='Enter your email'
                    {...register("email", {
                      required: "El email es obligatorio",
                    })}
                  />
                  {errors.email && (
                    <ErrorMessage>{errors.email.message}</ErrorMessage>
                  )}
                </div>
                <div>
                  <label htmlFor='' className='text-lg font-medium'>
                    Password
                  </label>
                  <input
                    id='password'
                    type='password'
                    className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                    placeholder='Enter your password'
                    {...register("password", {
                      required: "El password es obligatorio",
                    })}
                  />
                  {errors.password && (
                    <ErrorMessage>{errors.password.message}</ErrorMessage>
                  )}
                </div>
                <div className='mt-8 flex justify-between items-center'>
                  <div>
                    <input
                      type='checkbox'
                      id='remenber'
                      className='cursor-pointer'
                    />
                    <label
                      htmlFor='remenber'
                      className='cursor-pointer ml-2 font-medium text-base '
                    >
                      Remember for 30 days
                    </label>
                  </div>
                  <button className='font-medium text-base text-violet-400 cursor-pointer'>
                    Forgot password
                  </button>
                </div>
                <div className='mt-8 flex flex-col gap-y-4 '>
                  <button className='active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all bg-violet-500 text-white text-lg font-bold py-3 rounded-xl cursor-pointer'>
                    Sign in
                  </button>
                  <button className='flex items-center justify-center gap-2 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all cursor-pointer border-2 border-gray-100 py-3 rounded-xl'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      x='0px'
                      y='0px'
                      width='24'
                      height='24'
                      viewBox='0 0 48 48'
                    >
                      <path
                        fill='#fbc02d'
                        d='M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z'
                      ></path>
                      <path
                        fill='#e53935'
                        d='M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z'
                      ></path>
                      <path
                        fill='#4caf50'
                        d='M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z'
                      ></path>
                      <path
                        fill='#1565c0'
                        d='M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z'
                      ></path>
                    </svg>
                    Sign in with Google
                  </button>
                  <div className='flex mt-8 justify-center items-center '>
                    <p className='font-medium text-base '>
                      Don't have an account?{" "}
                    </p>
                    <Link to={"/auth/register"}>
                      <button className='text-violet-500 text-base font-medium ml-2 cursor-pointer'>
                        Sign up
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className='hidden lg:flex  relative h-full w-1/2 bg-gray-200 items-center justify-center'>
          <div className='h-60 w-60 bg-gradient-to-tr  from-violet-500 to-pink-500  rounded-full animate-bounce' />
          <div className='w-full h-1/2 absolute bg-white/10 backdrop-blur-lg bottom-0' />
        </div>
      </div>
    </>
  );
};
