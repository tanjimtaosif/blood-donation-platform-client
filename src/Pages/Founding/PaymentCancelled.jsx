import { ArrowLeft, XCircle, Home } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";

const PaymentCancelled = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 max-w-lg w-full text-center border border-gray-100">
          <div className="flex justify-center mb-6">
            <div className="bg-red-50 rounded-full p-4">
              <XCircle size={80} className="text-red-500 stroke-[1.5]" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Payment Cancelled
          </h1>
          <p className="text-gray-500 text-lg mb-10 leading-relaxed">
            Oops! Your payment process was cancelled. No charges were made to
            your account.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center gap-2 w-full md:w-auto px-8 py-3.5 border-2 border-gray-100 rounded-2xl text-gray-600 font-semibold hover:bg-gray-50 transition-all duration-200"
            >
              <ArrowLeft size={20} />
              Try Again
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex items-center justify-center gap-2 w-full md:w-auto px-8 py-3.5 bg-red-500 text-white font-semibold rounded-2xl hover:bg-red-600 shadow-lg shadow-red-200 transition-all duration-200"
            >
              <Home size={20} />
              Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelled;
