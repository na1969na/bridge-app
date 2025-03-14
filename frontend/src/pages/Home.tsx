const Home = () => {
  return (
    <div className="p-10">
      <div className="flex flex-col gap-5 p-10 bg-amber-600">
        <h1 className="text-7xl font-semibold bg-white w-3/5">
          Connecting people
        </h1>
        <h1 className="text-7xl font-semibold bg-white w-1/2">
          across distances
        </h1>
        <h1 className="text-7xl font-semibold bg-white">Connecting people</h1>
        <h1 className="text-7xl font-semibold bg-white">across distances</h1>
      </div>
      <div>
        <p>
          Bridge is here to keep you and your loved ones connected, no matter
          where life takes you. Quick Check-Ins: Let others know you're safe
          with just a tap. Emergency Support: Ensure help is notified when it
          matters most. Built for Everyone: Simple, reliable, and secure
          communication. Your safety and connection, always within reach.
        </p>
      </div>
      <div className="flex justify-center items-center py-10 space-x-3 text-orange-600 text-2xl font-semibold">
        <div className="flex-1 text-center bg-bubble p-10 rounded-2xl flex flex-col justify-center items-center gap-10">
          <img
            className="w-80 h-80"
            src="/img_1.svg"
            alt="Social Illustration"
          />
          <p>Connect with Loved Ones, Anytime, Anywhere</p>
        </div>
        <div className="flex-1 text-center bg-grape p-10 rounded-2xl flex flex-col justify-center items-center gap-10">
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
        <div className="flex-1 text-center bg-light-lavender p-10 rounded-2xl flex flex-col justify-center items-center gap-10">
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
  );
};

export default Home;
