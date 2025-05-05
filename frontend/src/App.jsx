import { useState } from "react";
import { Form } from "./Components/Form";

function App() {
  return (
    <>
      <div className='flex w-full h-screen'>
        <div className='w-full flex items-center lg:w-1/2'>
          <Form />
        </div>
        <div className='hidden lg:flex h-full items-center bg-gray-200'></div>
      </div>
    </>
  );
}

export default App;
