import { FaShieldAlt, FaBolt, FaHeartbeat } from "react-icons/fa";
import Reveal from "./Reveal";

const FeaturedSection = () => {
  return (
    <section className="bg-red-50 py-16 my-5 rounded-2xl">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div>
          <h2 className="text-3xl font-bold text-red-600 mb-4">
            Why Donate Blood With Us?
          </h2>
          <p className="text-gray-600 mb-10">
            One decision can save a life. Be the reason someone smiles today.
          </p>
        </div>

        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <FaShieldAlt className="text-4xl text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Verified & Safe Donations
              </h3>
              <p className="text-gray-600">
                All donation requests are verified to ensure safety and trust.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <FaBolt className="text-4xl text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Quick & Easy Process
              </h3>
              <p className="text-gray-600">
                Find requests and confirm donations in just a few simple steps.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <FaHeartbeat className="text-4xl text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Real-Time Donation Status
              </h3>
              <p className="text-gray-600">
                Stay updated with live donation status and progress.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default FeaturedSection;
