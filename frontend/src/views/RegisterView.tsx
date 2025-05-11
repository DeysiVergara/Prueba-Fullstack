import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import type { RegisterForm } from "../types";
import { ErrorMessage } from "../components/ErrorMessage";
import api from "../config/axios";

export const RegisterView = () => {
  const initialValues: RegisterForm = {
    name: "",
    email: "",
    handle: "",
    password: "",
    password_confirmation: "",
  };

  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const password = watch("password");

  const handleRegister = async (formData: RegisterForm) => {
    try {
      const { data } = await api.post(`/auth/register`, formData);
      toast.success(data);
      reset();
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.error);
      }
    }
  };
  return (
    <>
      <div className='flex w-full h-screen'>
        <div className='w-full lg:w-1/2 flex items-center justify-center bg-[#F2F2F2]'>
          <div className='bg-white px-10 py-20 rounded-3xl border-2 border-gray-100'>
            <h1 className='text-5xl font-semibold'>Regístrate</h1>
            <p className='font-medium text-lg text-gray-500 mt-4'>
              Welcome back! Pleace enter your details.
            </p>
            <form onSubmit={handleSubmit(handleRegister)}>
              <div className='mt-8 '>
                <div>
                  <label htmlFor='' className='text-lg font-medium'>
                    Nombre
                  </label>
                  <input
                    id='name'
                    type='text'
                    className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                    placeholder='Enter your name'
                    {...register("name", {
                      required: "El nombre es obligatorio",
                    })}
                  />
                  {errors.name && (
                    <ErrorMessage>{errors.name.message}</ErrorMessage>
                  )}
                </div>
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
                      required: "El mail es obligatorio",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "E-mail no válido",
                      },
                    })}
                  />
                  {errors.email && (
                    <ErrorMessage>{errors.email.message}</ErrorMessage>
                  )}
                </div>
                <div>
                  <label htmlFor='' className='text-lg font-medium'>
                    Handle
                  </label>
                  <input
                    id='handle'
                    type='text'
                    className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                    placeholder='Enter your handle'
                    {...register("handle", {
                      required: "El handle es obligatorio",
                    })}
                  />
                  {errors.handle && (
                    <ErrorMessage>{errors.handle.message}</ErrorMessage>
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
                      minLength: {
                        value: 8,
                        message: "El password debe ser minimo de 8 caracteres",
                      },
                    })}
                  />
                  {errors.password && (
                    <ErrorMessage>{errors.password.message}</ErrorMessage>
                  )}
                </div>
                <div>
                  <label htmlFor='' className='text-lg font-medium'>
                    Repetir Password
                  </label>
                  <input
                    id='password_confirmation'
                    type='password'
                    className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                    placeholder='Confirmation your password'
                    {...register("password_confirmation", {
                      required: "El password es obligatorio",
                      validate: (value) =>
                        value === password || "Los passwords no son iguales",
                    })}
                  />
                  {errors.password_confirmation && (
                    <ErrorMessage>
                      {errors.password_confirmation.message}
                    </ErrorMessage>
                  )}
                </div>
                <div className='mt-8 flex flex-col gap-y-4 '>
                  <button className='active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all bg-violet-500 text-white text-lg font-bold py-3 rounded-xl cursor-pointer'>
                    Crear cuenta
                  </button>
                  <div className='flex mt-8 justify-center items-center '>
                    <p className='font-medium text-base '>
                      Ya tienes una cuenta{" "}
                    </p>
                    <Link to={"/auth/login"}>
                      <button className='text-violet-500 text-base font-medium ml-2 cursor-pointer'>
                        Sign in
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
