import { Link } from "react-router";
import { motion } from "framer-motion";
import bannerImage from "../assets/banner.png";

const Banner = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl">
      <div className="absolute inset-0 bg-linear-to-r from-red-600 via-red-500 to-red-700" />

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 w-11/12 mx-auto py-15 grid grid-cols-1 md:grid-cols-2 gap-10 items-center text-white ">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Donate Blood <br /> Save Lives
          </h1>

          <p className="text-gray-200 max-w-md">
            Every drop of blood is a gift of life. Join our donor community or
            find donors near you to help those in urgent need.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/register"
              className="btn bg-white text-red-600 hover:bg-gray-100 px-6"
            >
              Join as a Donor
            </Link>

            <Link
              to="/search-page"
              className="btn btn-outline border-white text-white hover:bg-white hover:text-red-600 px-6"
            >
              Search Donors
            </Link>
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center"
        >
          <img
            src={bannerImage}
            alt="Blood Donation"
            className="max-w-sm md:max-w-md w-full drop-shadow-xl"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
