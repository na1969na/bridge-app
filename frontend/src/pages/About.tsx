import React from 'react';
import { FaStarOfLife } from 'react-icons/fa';

const About: React.FC = () => {
  return (
    <div className="py-10 flex flex-col gap-10">
      <div className="pl-20">
        <div className="bg-grape rounded-l-[5rem] px-18 py-10 flex justify-between items-end">
          <h1 className="text-6xl font-semibold mb-10 animate-fade-in-scale">
            Connecting people <br />
            across distances, <br />
            Ensuring Safety and Support
          </h1>
          <div className="text-8xl animate-rotate-slow">
            <FaStarOfLife />
          </div>
        </div>
      </div>
      <div className="pr-20">
        <div className="bg-bubble rounded-r-[5rem] p-10 text-2xl">
          <h1 className="mb-8">
            <span className="font-bold text-5xl">BRIDGE</span> is...
          </h1>
          <div className="flex font-semibold">
            <div className="flex-1 flex text-center bg-bubble p-10 rounded-2xl flex-col justify-center items-center gap-10">
              <img
                className="w-80 h-80"
                src="/img_1.svg"
                alt="Social Illustration"
              />
              <p>Connect with Loved Ones, Anytime, Anywhere</p>
            </div>
            <div className="flex-1 text-center p-10 flex flex-col justify-center items-center gap-10">
              <img
                className="w-80 h-80"
                src="/img_2.svg"
                alt="Social Illustration"
              />
              <p>
                Stay Safe with
                <br /> Regular Check-Ins
              </p>
            </div>
            <div className="flex-1 text-center p-10 flex flex-col justify-center items-center gap-10">
              <img
                className="w-80 h-80"
                src="/img_3.svg"
                alt="Social Illustration"
              />
              <p>
                Emergency Contact
                <br /> at Your Fingertips
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
