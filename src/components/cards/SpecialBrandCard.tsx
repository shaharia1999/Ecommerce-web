type Props = {
  brand: string;
  image: string;
};

const SpecialBrandCard = ({ brand, image }: Props) => {
  return (
    <div className="border rounded p-4 shadow hover:scale-105 transition flex flex-col items-center">
      <img src={image} alt={brand} className="w-24 h-24 object-cover mb-2 rounded-full" />
      <h3 className="font-semibold">{brand}</h3>
    </div>
  );
};

export default SpecialBrandCard;
