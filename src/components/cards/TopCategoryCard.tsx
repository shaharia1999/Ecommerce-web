// import Image from "next/image";

import Image from "next/image";

type Props = {
  category: string;
  image: string;
};

const TopCategoryCard = ({ category, image }: Props) => {
  return (
    <div className="border rounded p-4 shadow hover:scale-105 transition flex flex-col items-center">
      {/* <img src={image} alt={category} className="w-24 h-24 object-cover mb-2 rounded-full" /> */}

       <div className="w-24 h-24 mb-2 rounded-full relative overflow-hidden">
        <Image
          src={image}
          alt={category}
          fill
          className="object-cover rounded-full"
          sizes="96px"
        />
      </div>
      <h3 className="font-semibold">{category}</h3>
    </div>
  );
};

export default TopCategoryCard;
