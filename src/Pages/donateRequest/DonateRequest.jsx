import React, { useEffect, useState } from "react";
import RequestCardDesign from "../../Components/RequestCardDesign";
import useAxios from "../../Hooks/UseAxios";

const DonateRequest = () => {
  const axiosInstance = useAxios();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axiosInstance.get("/pending-requests?status=pending");
        setRequests(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [axiosInstance]);

  return (
    <div>
      <div className="text-red-500 text-center space-y-2 ">
        <h2 className="font-bold text-3xl">All Pending Donation Request</h2>
        <p className=" ">
          “Be the hope for someone in need. Answer the call for blood
          donation❤️❤️
        </p>
      </div>
      <div className="grid py-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {requests.length > 0 ? (
          requests.map((request) => (
            <RequestCardDesign key={request._id} data={request} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No requests found. Please perform a search.
          </p>
        )}
      </div>
    </div>
  );
};

export default DonateRequest;
