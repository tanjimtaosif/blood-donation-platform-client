import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Provider/AuthProvider";
import { useNavigate } from "react-router";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(totalUsers / itemsPerPage);
  const pages = [...Array(totalPages).keys()];
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await axiosSecure.get(`/users/role/${user?.email}`);
        if (res.data?.role !== "admin") {
          navigate("/dashboard");
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error("Auth check failed", err);
        navigate("/");
      }
    };

    if (user?.email) {
      checkAdmin();
    }
  }, [user, axiosSecure, navigate]);
  const fetchUsers = async () => {
    try {
      const statusQuery = filter === "All" ? "all" : filter.toLowerCase();

      const res = await axiosSecure.get(
        `/users?status=${statusQuery}&page=${currentPage}&size=${itemsPerPage}`
      );

      setUsers(res.data.users);
      setTotalUsers(res.data.totalUsers);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!loading) {
      fetchUsers();
    }
  }, [filter, currentPage, loading]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setCurrentPage(0);
  };

  const handleStatusChange = async (email, status) => {
    await axiosSecure.patch(
      `/update/user/status?email=${email}&status=${status}`
    );
    fetchUsers();
  };

  const handleRoleChange = async (email, role) => {
    await axiosSecure.patch(`/update/user/role?email=${email}&role=${role}`);
    fetchUsers();
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-4xl text-center text-red-600 font-bold mb-4">All Users</h2>

      {/* Filter */}
      <div className="mb-4">
        <select
          className="select select-bordered max-w-xs"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Blocked">Blocked</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <img
                    src={user.mainPhotoUrl}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className="capitalize">{user.role}</td>
                <td>
                  <span className="btn btn-ghost">{user.status}</span>
                </td>
                <td>
                  <button
                    onClick={() =>
                      user.status === "active"
                        ? handleStatusChange(user.email, "blocked")
                        : handleStatusChange(user.email, "active")
                    }
                    className="btn btn-xs"
                  >
                    {user.status === "active" ? "Block" : "Unblock"}
                  </button>

                  {user.role !== "volunteer" && (
                    <button
                      onClick={() => handleRoleChange(user.email, "volunteer")}
                      className="btn btn-xs ml-2"
                    >
                      Make Volunteer
                    </button>
                  )}

                  {user.role !== "admin" && (
                    <button
                      onClick={() => handleRoleChange(user.email, "admin")}
                      className="btn btn-xs ml-2"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination UI */}
      <div className="flex justify-center mt-8 gap-2">
        <button 
          className="btn btn-sm" 
          disabled={currentPage === 0}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>
        
        {pages.map(page => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`btn btn-sm ${currentPage === page ? "btn-primary" : "btn-outline"}`}
          >
            {page + 1}
          </button>
        ))}

        <button 
          className="btn btn-sm" 
          disabled={currentPage === totalPages - 1}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
      </div>
    </div>
  );
};

export default AllUsers;
