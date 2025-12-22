import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import useAxios from "../../Hooks/UseAxios";
import { ArrowLeft, CheckCircle, Home } from "lucide-react";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosInstance = useAxios();
const navigate = useNavigate();
  useEffect(() => {
    axiosInstance
      .post(`/success-payment?session_id=${sessionId}`)
      .then((res) => {
        console.log(res.data);
      });
  }, [axiosInstance, sessionId]);
  return <div>
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 max-w-lg w-full text-center border border-gray-100">
          
          <div className="flex justify-center mb-6">
            <div className="bg-emerald-50 rounded-full p-4">
              <CheckCircle
                size={100}
                className="text-emerald-500 stroke-[1.5]"
              />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Payment Successful
          </h1>
          <p className="text-gray-500 text-lg mb-10 leading-relaxed">
            Thank you! Your payment has been processed successfully.
          </p>

      
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center gap-2 w-full md:w-auto px-8 py-3.5 border-2 border-gray-100 rounded-2xl text-gray-600 font-semibold hover:bg-gray-50 transition-all duration-200"
            >
              <ArrowLeft size={20} />
              Go Back
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex items-center justify-center gap-2 w-full md:w-auto px-8 py-3.5 bg-emerald-500 text-white font-semibold rounded-2xl hover:bg-emerald-600 shadow-lg shadow-emerald-200 transition-all duration-200"
            >
              <Home size={20} />
              Home
            </button>
          </div>
        </div>
      </div>
  </div>;
};

export default PaymentSuccess;
