import React from "react";
import { Link } from "react-router";
import { FaTint, FaMapMarkerAlt, FaClock } from "react-icons/fa";
const RequestCardDesign = ({ data }) => {
  const {_id, Recipient_Name, blood, req_district, req_upazila, date, time } = data;
  return (
    
    <div className="card bg-base-100 border border-red-500  shadow-sm hover:scale-105 transition">
      <div className="card-body space-y-2">
        <h2 className="text-lg font-semibold">
          Recipient Name :{Recipient_Name}
        </h2>

        <p className="flex items-center gap-2 text-sm text-gray-600">
          <FaMapMarkerAlt />
          {req_upazila}, {req_district}
        </p>

        <span className="badge badge-error w-fit text-white flex gap-1">
          <FaTint /> {blood}
        </span>

        <p className="flex items-center gap-2 text-sm">
          <FaClock />
          {date} at {time}
        </p>

        <div className="card-actions justify-end">
          <Link
            to={`/donate-details/${_id}`}
            className="btn btn-sm btn-outline bg-red-500 text-white "
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
   
  );
};

export default RequestCardDesign;
