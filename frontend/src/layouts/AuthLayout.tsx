import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export const AuthLayout = () => {
  return (
    <>
      <div className='flex justify-center items-center'>
        <div className='bg-slate-800 rounded-full mx-4 mt-8 flex justify-center items-center flex-row w-[200px] h-[200px]'>
          <img src='/logo.svg' className='w-30 h-30' />
        </div>
      </div>
      <div className='py-10'>
        <Outlet />
      </div>
      <Toaster position='top-right' />
    </>
  );
};
