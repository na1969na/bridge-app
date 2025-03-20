const Home = () => {
  return (
    <div className="p-10">
      <div className="flex flex-col gap-8 px-10 rounded-2xl bg-orange-600 justify-center bg-[url(/hug_img.svg)] min-h-[80vh] max-h-[80vh] bg-no-repeat bg-contain bg-[right_10%_bottom_10%]">
        <h1 className="text-7xl">
          <span className="bg-resene px-2">Connecting people</span>
        </h1>
        <h1 className="text-7xl">
          <span className="bg-resene px-2">across distances,</span>
        </h1>
        <h1 className="text-7xl">
          <span className="bg-resene px-2">Ensuring</span>
        </h1>
        <h1 className="text-7xl">
          <span className="bg-resene px-2">Safety and Support</span>
        </h1>
      </div>
      <div className="flex justify-center items-center p-20 min-h-[80vh] max-h-[80vh]">
        <div className="border-4 border-dotted border-gray-400 rounded-3xl p-20">
          <p className="text-xl leading-relaxed">
            <span className="font-bold text-5xl">BRIDGE</span> is a simple,
            secure app designed to keep you connected and safe.
            <br />
            With a simple tap, confirm your well-being while personalized
            reminders keep you on track. <br />
            If you miss a check-in, BRIDGE immediately notifies your emergency
            contact, ensuring help when it&apos;s needed most. Manage your
            details effortlessly and view your check-in history with ease.
            Designed to foster connection and peace of mind, BRIDGE empowers you
            and your loved ones to stay safe and supported—no matter where life
            takes you.
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center mb-10 space-x-3 text-orange-600 text-2xl font-semibold">
        <div className="flex-1 text-center bg-bubble p-10 rounded-2xl flex flex-col justify-center items-center gap-10">
          <p>Connect with Loved Ones, Anytime, Anywhere</p>
          <img
            className="w-80 h-80"
            src="/img_1.svg"
            alt="Social Illustration"
          />
        </div>
        <div className="flex-1 text-center bg-grape p-10 rounded-2xl flex flex-col justify-center items-center gap-10">
          <p>
            Stay Safe with
            <br /> Regular Check-Ins
          </p>
          <img
            className="w-80 h-80"
            src="/img_2.svg"
            alt="Social Illustration"
          />
        </div>
        <div className="flex-1 text-center bg-light-lavender p-10 rounded-2xl flex flex-col justify-center items-center gap-10">
          <p>
            Emergency Contact
            <br /> at Your Fingertips
          </p>
          <img
            className="w-80 h-80"
            src="/img_3.svg"
            alt="Social Illustration"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
