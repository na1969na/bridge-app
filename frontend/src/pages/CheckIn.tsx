import React, { useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";


const CheckIn: React.FC = () => {
  const [message, setMessage] = useState("");

  const handleClick = () => {
    setMessage("Thank you for checking in!");
  };

  return (
    <div className="flex items-center justify-center bg-[url(/checkin_bg.svg)] bg-cover bg-center" style={{ minHeight: 'calc(100vh - 80px)' }}>
      <div className="p-10 pt-15 text-center text-6xl font-semibold flex flex-col items-center gap-5">
        {message ? (
          <>
            <p>{message}</p>
            <img src="/img_cat.svg" alt="Cat image" className="w-40 h-40" />
          </>
        ) : (
          <>
            <h1>Welcome back,</h1>
            <div className="flex items-center">
              <h2>How are you today?</h2>
              <img
                src="/checkin_img.svg"
                alt="Check in image"
                className="w-30 h-30 ml-4"
              />
            </div>
            <div className="p-10">
              <button
                onClick={handleClick}
                className="text-5xl bg-rose rounded-full px-20 py-10 transition-all duration-300 hover:drop-shadow-[0_0_2em_rgba(244,90,100,0.67)] mt-4 flex items-center gap-3"
              >
                CHECK IN
                <IoMdCheckmarkCircleOutline />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckIn;
