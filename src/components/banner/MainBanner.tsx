import Image from 'next/image';

const Banner = () => {
  return (
    <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row bg-white rounded-lg overflow-hidden shadow-md">
      
      {/* Left Section */}
      <div className="flex-1 p-8 flex flex-col justify-center">
        <p className="text-purple-600 font-medium mb-2">New Arrivals Of 2025</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Where Fashion Meets <br /> Individuality
        </h1>
        <button className="mt-4 bg-purple-600 hover:purple-700 text-white px-6 py-3 rounded-md transition">
          Shop Now &rarr;
        </button>
      </div>

      {/* Middle Image */}
      <div className="relative w-full md:w-[400px] h-[300px] md:h-auto">
        <Image
          // src="/shopping-girl.png" // your image here
            src="/images/cat1.jpg"
          alt="Fashion Girl"
          layout="fill"
          objectFit="contain"
        />
      </div>

      {/* Right Section */}
      <div className="bg-orange-50 flex-1 p-8 flex flex-col justify-center items-center">
        <p className="text-purple-600 font-semibold mb-2">Summer Offer</p>
        <h2 className="text-2xl font-bold mb-4 text-center">
          Make Your Fashion Story Unique Every Day
        </h2>
        <button className="mt-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md transition">
          Shop Now &rarr;
        </button>

        <div className="relative w-[200px] h-[250px] mt-4">
          <Image
            // src="/cool-girl.png" // 2nd image here
              src="/images/cat1.jpg" // 2nd image here
            alt="Cool Girl"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
