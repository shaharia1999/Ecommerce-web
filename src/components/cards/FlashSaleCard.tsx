import Image from "next/image";

type Props = {
  title: string;
  price: number;
  image: string;
};

const FlashSaleCard = ({ title, price, image }: Props) => {
  return (
    <div className="border rounded p-4 shadow hover:scale-105 transition ">
      <Image src={image} alt={title} className="w-full h-40 object-cover mb-2" />
      <h3 className="font-semibold">{title}</h3>
      <p>${price}</p>
    </div>
  );
};

export default FlashSaleCard;
