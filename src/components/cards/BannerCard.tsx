import Link from 'next/link';
import Image from 'next/image';

type Props = {
  title: string;
  description: string;
  image: string;
  buttonText: string;
  link: string;
};

const BannerCard = ({ title, description, image, buttonText, link }: Props) => {
  return (
    <div className="relative rounded overflow-hidden shadow-lg group">
      <Image src={image} alt={title} className="w-full h-64 object-cover" />
      <div className="absolute inset-0 bg-purple-600 bg-opacity-40 flex flex-col justify-center items-center text-center text-white p-4">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="mb-4">{description}</p>
        <Link href={link}>
          <span className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition">{buttonText}</span>
        </Link>
      </div>
    </div>
  );
};

export default BannerCard;
