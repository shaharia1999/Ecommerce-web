import Image from 'next/image';
import Link from 'next/link';

const Banner = () => {
  return (
    <div className=" mx-auto flex flex-col md:flex-row bg-white rounded-lg overflow-hidden shadow-md">
      
  <Link href="/FlashSaleCardDiscount">

<div className="w-full max-w-[1285px] mx-auto h-[500px] bg-white rounded-xl shadow-md overflow-hidden flex items-center justify-center">
    <Image
    src="/images/Banner.jpg"
    alt="Ecommerce Banner Image"
    width={1285}
    height={0}
    className="w-full h-full object-cover"
    priority
  />
  


</div>
  </Link>
    </div>
  );
};

export default Banner;
