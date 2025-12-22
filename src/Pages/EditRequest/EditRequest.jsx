import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import axios from "axios";

const EditRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [request, setRequest] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  // Load districts & upazilas
  useEffect(() => {
    axios
      .get("/districts.json")
      .then((res) => setDistricts(res.data.districts))
      .catch((err) => console.log(err));

    axios
      .get("/upazila.json")
      .then((res) => setUpazilas(res.data.upazilas))
      .catch((err) => console.log(err));
  }, []);

  // Load donation request
  useEffect(() => {
    axiosSecure.get(`/donation/${id}`).then((res) => {
      if (res.data.donation_status !== "pending") {
        Swal.fire("Cannot Edit", "Only pending request can be edited", "error");
        navigate("/dashboard/my-donation-requests");
      } else {
        setRequest(res.data);
      }
    });
  }, [id, axiosSecure, navigate]);

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    axiosSecure
      .patch(`/update-donation/${id}`, request)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Donation Request Updated",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/dashboard/my-donation-requests");
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Failed to update donation request", "error");
      });
  };

  if (!request) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4 p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Donation Request</h2>

      <div>
        <label className="block mb-1 font-medium">Recipient Name</label>
        <input
          type="text"
          className="input input-bordered w-full"
          value={request.Recipient_Name || ""}
          onChange={(e) => setRequest({ ...request, Recipient_Name: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Full Address</label>
        <input
          type="text"
          className="input input-bordered w-full"
          value={request.full_address || ""}
          onChange={(e) => setRequest({ ...request, full_address: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">District</label>
          <select
            className="select w-full"
            value={request.req_district || ""}
            onChange={(e) => setRequest({ ...request, req_district: e.target.value })}
            required
          >
            <option value="" disabled>Select District</option>
            {districts.map((d) => (
              <option key={d.id} value={d.name}>{d.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Upazila</label>
          <select
            className="select w-full"
            value={request.req_upazila || ""}
            onChange={(e) => setRequest({ ...request, req_upazila: e.target.value })}
            required
          >
            <option value="" disabled>Select Upazila</option>
            {upazilas.map((u) => (
              <option key={u.id} value={u.name}>{u.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block mb-1 font-medium">Hospital Name</label>
        <input
          type="text"
          className="input input-bordered w-full"
          value={request.hospital_name || ""}
          onChange={(e) => setRequest({ ...request, hospital_name: e.target.value })}
          placeholder="Dhaka Medical College"
          required
        />
      </div>

      <button type="submit" className="btn bg-red-600 text-white w-full">
        Update Donation Request
      </button>
    </form>
  );
};

export default EditRequest;
