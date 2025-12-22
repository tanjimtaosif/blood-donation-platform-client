import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import image from "../../assets/logo.png";
import axiosInstance from "../../Hooks/AxiosInstance";
import Swal from "sweetalert2";

const DonarDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchDonation = async () => {
      try {
        const res = await axiosInstance.get(`/donation/${id}`);
        setDonation(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonation();
  }, [id, user]);

  const handleConfirmDonation = async () => {
    if (donation?.donation_status !== "pending") return; // only pending

    try {
      await axiosInstance.patch(`/accept-donation/${donation._id}`); // use accept-donation endpoint

      setDonation((prev) => ({ ...prev, donation_status: "inprogress" }));

      document.getElementById("my_modal_3").close();
      Swal.fire({
        icon: "success",
        title: "Donation In Progress!",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Failed to confirm donation",
        text: error?.response?.data?.message || "Something went wrong",
      });
    }
  };

  if (loading)
    return <p className="text-center mt-10">Loading donation details...</p>;

  const isOwnRequest = user?.email === donation?.req_email;
  const isPending = donation?.donation_status === "pending";

  return (
    <div className="max-w-4xl mx-auto shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row gap-5 my-10">
      {/* Image */}
      <div className="md:w-1/3 flex justify-center items-center bg-gray-100 p-4">
        <img src={image} className="object-contain h-70 w-full" />
      </div>

      {/* Details */}
      <div className="md:w-2/3 p-6 flex flex-col justify-between">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-red-500">
            Donation Request Details
          </h2>
          <p><b>Requester Name:</b> {donation?.req_name}</p>
          <p><b>Requester Email:</b> {donation?.req_email}</p>
          <p><b>Recipient Name:</b> {donation?.Recipient_Name}</p>
          <p><b>Upazila:</b> {donation?.req_upazila}</p>
          <p><b>District:</b> {donation?.req_district}</p>
          <p><b>Full Address:</b> {donation?.full_address}</p>
          <p><b>Blood:</b> {donation?.blood}</p>
          <p><b>Hospital:</b> {donation?.hospital_name}</p>
          <p><b>Date:</b> {donation?.date}</p>
          <p><b>Time:</b> {donation?.time}</p>
          <p><b>Message:</b> {donation?.message}</p>
          <p>
            <b>Status:</b>{" "}
            <span
              className={`font-bold ${
                donation?.donation_status === "inprogress"
                  ? "text-green-600"
                  : "text-orange-500"
              }`}
            >
              {donation?.donation_status}
            </span>
          </p>
        </div>

        {/* Donate Button */}
        <button
          disabled={isOwnRequest || !isPending}
          onClick={() => document.getElementById("my_modal_3").showModal()}
          className={`btn mt-4 ${
            isOwnRequest || !isPending
              ? "btn-disabled"
              : "bg-red-200 text-red-700"
          }`}
        >
          {isOwnRequest
            ? "You can't donate your own request"
            : !isPending
            ? "Already Donated"
            : "Donate Now"}
        </button>

        {/* Modal */}
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById("my_modal_3").close()}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4 text-red-500 text-center">
              Confirm Donation
            </h2>
            <div className="space-y-2 mb-2">
              <input
                type="text"
                value={user?.displayName}
                readOnly
                className="w-full border px-3 py-2 rounded "
              />
              <input
                type="email"
                value={user?.email}
                readOnly
                className="w-full border px-3 py-2 rounded "
              />
            </div>
            <button
              onClick={handleConfirmDonation}
              className="w-full bg-red-500 text-white py-2 rounded"
            >
              Confirm
            </button>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default DonarDetails;
