import { FaFacebook, FaLinkedin, FaEnvelope, FaTwitter } from "react-icons/fa";
import { Link } from "react-router";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-100 ">
      <div className="w-11/12 mx-auto py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-gray-700">
        {/* ===== Brand Info ===== */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img src={logo} className="w-9 h-9" alt="logo" />
            <h2 className="text-2xl font-bold text-red-600">BloodCare</h2>
          </div>
          <p className="text-sm leading-relaxed">
            BloodCare connects blood donors with patients in need. Our mission
            is to save lives by making blood donation simple, fast, and
            accessible for everyone.
          </p>
        </div>

        {/* ===== Quick Links ===== */}
        <div>
          <h4 className="font-semibold mb-3 text-gray-900">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-red-600">
                Home
              </Link>
            </li>
            <li>
              <Link to="/donate-request" className="hover:text-red-600">
                Donation Requests
              </Link>
            </li>
            <li>
              <Link to="/funding" className="hover:text-red-600">
                Funding
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-red-600">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* ===== Donation ===== */}
        <div>
          <h4 className="font-semibold mb-3 text-gray-900">Donation</h4>
          <ul className="space-y-2 text-sm">
            <li>Become a Donor</li>
            <li>Request Blood</li>
            <li>Donation Guidelines</li>
            <li>Success Stories</li>
          </ul>
        </div>

        {/* ===== Support & Legal ===== */}
        <div>
          <h4 className="font-semibold mb-3 text-gray-900">Support</h4>
          <ul className="space-y-2 text-sm">
            <li>Help Center</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>Contact Us</li>
          </ul>
        </div>

        {/* ===== Social & Contact ===== */}
        <div>
          <h4 className="font-semibold mb-3 text-gray-900">Connect With Us</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <FaFacebook className="text-blue-600" />
              facebook.com/bloodcare
            </li>
            <li className="flex items-center gap-2">
              <FaTwitter className="text-sky-500" />
              twitter.com/bloodcare
            </li>
            <li className="flex items-center gap-2">
              <FaLinkedin className="text-blue-700" />
              linkedin.com/bloodcare
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-red-500" />
              support@bloodcare.com
            </li>
          </ul>
        </div>
      </div>

      {/* ===== Bottom ===== */}
      <div className="border-t py-4 text-center text-sm text-red-700">
        © {new Date().getFullYear()} BloodCare. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
