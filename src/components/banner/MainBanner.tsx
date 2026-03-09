import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  return (
    <div className="w-full">
      <Link href="/FlashSaleCardDiscount">
        <div className="relative w-full h-[55vh] md:h-[70vh] mt-6 lg:mt-0 rounded-lg overflow-hidden">
          {/* Desktop Image */}
          <div className="hidden sm:block w-full h-full">
            <Image
              src="/images/DextopBanner.png"
              alt="Ecommerce Banner Image"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Mobile Image */}
          <div className="block sm:hidden w-full h-full ">
            <Image
              src="/images/MobileBanner.jpg"
              alt="Ecommerce Mobile Banner"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Banner;