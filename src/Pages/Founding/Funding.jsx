import React, { useContext, useEffect, useState } from "react";
import useAxios from "../../Hooks/UseAxios";
import { AuthContext } from "../../Provider/AuthProvider";
import { Calendar, Heart, HeartHandshake, User } from "lucide-react";

const Funding = () => {
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);
  const [donations, setDonations] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const size = 10;

  useEffect(() => {

    axiosInstance.get(`/payments?page=${currentPage}&size=${size}`).then((res) => {
      setDonations(res.data.payments);
      setTotalCount(res.data.totalCount);
    });
  }, [axiosInstance, currentPage]);

  const totalPages = Math.ceil(totalCount / size);
  const pages = [...Array(totalPages).keys()];
  const handleCheckOut = (e) => {
    e.preventDefault();
    const donateAmount = e.target.donateAmount.value;
    const donorEmail = user?.email;
    const donorName = user?.displayName;
    const formData = {
      donateAmount,
      donorEmail,
      donorName,
    };
    axiosInstance.post("/create-payment-checkout", formData).then((res) => {
      console.log(res.data);
      window.location.href = res.data.url;
    });
  };
  return (
    <div>
      <div className="flex flex-col items-center justify-center text-center px-4 py-8 md:py-12">
        <div className="text-red-500 mb-4 animate-pulse">
          <Heart
            size={60}
            className="md:w-[100px] md:h-[100px]"
            fill="currentColor"
          />
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-red-600 whitespace-nowrap overflow-hidden text-ellipsis w-full">
          Funding & Donations
        </h2>

        <p className="text-gray-500 text-sm md:text-base lg:text-lg max-w-md md:max-w-2xl mt-4">
          Your generosity powers our mission to save lives through blood
          donation.
        </p>
      </div>
      <form
        onSubmit={handleCheckOut}
        action=""
        className="flex justify-center items-center  gap-3"
      >
        <input
          type="text"
          name="donateAmount"
          placeholder="$ Enter Custom Amount"
          className="input"
        />
        <button className="btn btn-primary" type="submit">
          Donate
        </button>
      </form>
      <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm bg-white mt-10">
        {/* Table Header */}
        <div className="bg-red-500 p-4 flex items-center gap-3 text-white">
          <HeartHandshake size={24} />
          <h2 className="text-2xl font-semibold">Recent Donations</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-gray-50 uppercase text-xs font-bold text-gray-600 border-b">
              <tr>
                <th className="py-4 px-6">Donor</th>
                <th>Email</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {donations.map((donation) => (
                <tr
                  key={donation._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="bg-red-50 p-2 rounded-full">
                        <User size={18} className="text-red-500" />
                      </div>
                      <span className="font-medium text-gray-800">
                        {donation.donorName || "Anonymous"}
                      </span>
                    </div>
                  </td>
                  <td className="text-gray-500">{donation.donorEmail}</td>
                  <td>
                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-bold">
                      $ {donation.amount}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2 text-gray-500">
                      <Calendar size={16} className="text-red-400" />
                      {new Date(donation.paidAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-8 gap-2">
        <button
          className="btn btn-sm btn-outline"
          disabled={currentPage === 0}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`btn btn-sm ${currentPage === page ? "bg-red-500 text-white" : "btn-outline"
              }`}
          >
            {page + 1}
          </button>
        ))}

        <button
          className="btn btn-sm btn-outline"
          disabled={currentPage === totalPages - 1}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Funding;
