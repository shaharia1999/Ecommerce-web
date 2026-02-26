import { FaFacebook, FaInstagram, FaLinkedin, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-blue-950 text-gray-300 py-10 mt-10">
      <div className="max-w-[1285px] mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Column 1: Brand Info */}
        {/*  */}
        {/*  */}
        <div>
          <h2 className="text-2xl font-bold mb-2">Easy Shop</h2>
          <p className="text-sm mb-4">
            Your one-stop destination for all your shopping needs. Quality products at unbeatable prices.
          </p>
          <p className="text-sm">&copy; {new Date().getFullYear()} Easy Shop. All rights reserved.</p>
        </div>

        {/* Column 2: Contact Info */}
        <div>
          <h3 className="text-xl font-semibold border-b border-gray-600 mb-2 pb-1">Contact</h3>
          <p className="flex items-center gap-2 text-sm"><FaPhoneAlt className="text-base" /> +8801707018322 (Md Shaharia)</p>
          <p className="flex items-center gap-2 text-sm"><FaEnvelope className="text-base" /> adeptshaharia@gmail.com</p>
        </div>

        {/* Column 3: Terms & Social */}
        <div>
          <h3 className="text-xl font-semibold border-b border-gray-600 mb-2 pb-1">Terms & Policies</h3>
          <ul className="space-y-1 text-sm">
            <li>✔ All purchases are subject to availability and confirmation of price.</li>
            <li>✔ We reserve the right to cancel or refuse any order.</li>
            <li>✔ Data is handled securely as per our Privacy Policy.</li>
            <li>✔ Refunds are available within 7 days if unused and sealed.</li>
          </ul>

          <div className="mt-4 flex items-center gap-4 text-xl">
            <a href="#" className="hover:text-gray-600"><FaFacebook /></a>
            <a href="#" className="hover:text-gray-600"><FaInstagram /></a>
            <a href="#" className="hover:text-gray-600"><FaLinkedin /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
