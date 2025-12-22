import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import DonationRequestTable from "../../Components/DonationRequestTable";
import { AuthContext } from "../../Provider/AuthProvider";

const MyDonateRequest = () => {
  const [totalRequest, setTotalRequest] = useState(0);
  const [myRequest, setMyRequest] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const { role } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    let url = `/my-donation-requests?page=${
      currentPage - 1
    }&size=${itemsPerPage}`;
    if (statusFilter) url += `&status=${statusFilter}`;

    axiosSecure
      .get(url)
      .then((res) => {
        setMyRequest(res.data.request);
        setTotalRequest(res.data.totalRequest);
      })
      .catch((err) => console.error(err));
  }, [axiosSecure, currentPage, itemsPerPage, statusFilter]);

  const numberOfPage = Math.ceil(totalRequest / itemsPerPage);
  const pages = [...Array(numberOfPage).keys()].map((e) => e + 1);

  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () =>
    currentPage < pages.length && setCurrentPage(currentPage + 1);

  const handleStatusUpdate = (id, status) => {
    axiosSecure
      .patch(`/update-donation-status?id=${id}&status=${status}`)
      .then(() => {
        setMyRequest((prev) =>
          prev.map((req) =>
            req._id === id ? { ...req, donation_status: status } : req
          )
        );

        Swal.fire({
          icon: "success",
          title: `Donation ${status}`,
          timer: 1500,
          showConfirmButton: false,
        });
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This donation request will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/delete/${id}`).then(() => {
          setMyRequest((prev) => prev.filter((req) => req._id !== id));
        });
      }
    });
  };

  return (
    <div className="p-3 md:p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl md:text-4xl font-bold mb-6 text-center text-red-600">
        All Blood Donation Requests
      </h2>

      {/* Filter */}
      <div className="mb-4 flex items-center gap-4">
        <label className="font-medium">Filter by Status:</label>
        <select
          className="select select-bordered w-52"
          value={statusFilter}
          onChange={(e) => {
            setCurrentPage(1);
            setStatusFilter(e.target.value);
          }}
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

     <div className="w-ful">
       {/* Table */}
      <DonationRequestTable
        requests={myRequest}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onDelete={handleDelete}
        onStatusUpdate={handleStatusUpdate}
        userRole={role}
      ></DonationRequestTable>
     </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        <button
          onClick={handlePrev}
          className="btn"
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {pages.map((page) => (
          <button
            key={page}
            className={`btn ${
              page === currentPage ? "bg-rose-500 text-white" : ""
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
        <button
          onClick={handleNext}
          className="btn"
          disabled={currentPage === pages.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MyDonateRequest;
