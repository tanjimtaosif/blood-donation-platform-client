import { Link } from "react-router";
import { CheckCircle, SquarePen, Trash2, XCircle } from "lucide-react";

const DonationRequestTable = ({
  requests,
  currentPage,
  itemsPerPage,
  onDelete,
  onStatusUpdate,
  userRole,
}) => {
  
  const isDonor = userRole === "donar";
  const isVolunteer = userRole === "volunteer";
  const isAdmin = userRole === "admin";

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-gray-200 shadow-sm bg-white">
      <table className="table w-full min-w-[900px] border-collapse">
        <thead className="bg-red-50 text-red-700">
          <tr className="bg-red-200">
            <th>SL</th>
            <th>Recipient Name</th>
            <th>Recipient Location</th>
            <th>Date</th>
            <th>Time</th>
            <th>Blood</th>
            <th>Status</th>
            <th>Donor Info</th>
            {!isVolunteer && <th>Action</th>}
            <th>View</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {requests.map((request, index) => (
            <tr key={request._id}>
              <th>{(currentPage - 1) * itemsPerPage + index + 1}</th>
              <td>{request.Recipient_Name}</td>
              <td
                className="max-w-[150px] truncate"
                title={request.full_address}
              >
                {request.full_address}
              </td>
              <td>{request.date}</td>
              <td>{request.time}</td>
              <td>{request.blood}</td>
              <td>
                {isDonor && (
                  <span className="font-medium capitalize">
                    {request.donation_status}
                  </span>
                )}

                {/* Admin */}
                {(isAdmin || isVolunteer) && (
                  <select
                    className="select select-sm select-bordered"
                    value={request.donation_status}
                    onChange={(e) =>
                      onStatusUpdate(request._id, e.target.value)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>
                    <option value="canceled">Canceled</option>
                  </select>
                )}
              </td>
              <td>
                {request.donation_status === "inprogress" ? (
                  <>
                    <p>{request.req_name}</p>
                    <p>{request.req_email}</p>
                  </>
                ) : (
                  "-"
                )}
              </td>

              {userRole !== "volunteer"  && (
                <td className="flex gap-2">
                  {request.donation_status === "pending" && (
                    <>
                      <Link to={`/dashboard/edit-request/${request._id}`}>
                        <SquarePen className="text-blue-600" />
                      </Link>
                      <button onClick={() => onDelete(request._id)}>
                        <Trash2 className="text-red-600" />
                      </button>
                    </>
                  )}
                  {request.donation_status === "inprogress" && (
                    <>
                      <button
                        onClick={() => onStatusUpdate(request._id, "done")}
                      >
                        <CheckCircle className="text-green-600" />
                      </button>
                      <button
                        onClick={() => onStatusUpdate(request._id, "canceled")}
                      >
                        <XCircle className="text-orange-600" />
                      </button>
                    </>
                  )}
                </td>
              )}

              <td>
                <Link
                  to={`/donate-details/${request._id}`}
                  className="btn bg-red-600 text-white font-semibold rounded"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DonationRequestTable;
