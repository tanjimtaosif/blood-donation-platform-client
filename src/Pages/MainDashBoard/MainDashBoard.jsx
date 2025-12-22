import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import DonationRequestTable from "../../Components/DonationRequestTable";
import { Users, HeartHandshake, Droplets } from "lucide-react";
import { Link } from "react-router";
import logo from "../../assets/logo.png";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
const MainDashBoard = () => {
  const { user, role } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [recentRequests, setRecentRequests] = useState([]);
  const [stats, setStats] = useState({ bloodGroupStats: [] });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const COLORS = ["#dc2626", "#ef4444", "#f87171", "#fca5a5"];
  /* ---------------- DONOR DATA ---------------- */
  useEffect(() => {
    if (role === "donar") {
      axiosSecure.get("/my-donation-requests?size=3&page=0").then((res) => {
        setRecentRequests(res.data.request || []);
      });
    }
  }, [role, axiosSecure]);

  /* ---------------- ADMIN / VOLUNTEER DATA ---------------- */
  useEffect(() => {
    if (role === "admin" || role === "volunteer") {
      axiosSecure.get("/admin-stats").then((res) => {
        setStats(res.data);
      });
    }
  }, [role, axiosSecure]);

  return (
    <div className="text-center">
      {/*  Welcome Section */}
      <h2 className="text-3xl font-bold mb-6">
        Welcome, <span className="text-red-600">{user?.displayName}</span>
      </h2>

      {/* ---------- DONOR DASHBOARD ---------- */}
      {role === "donar" && recentRequests.length > 0 && (
        <>
          <h3 className="text-xl font-semibold mb-3">
            Your Recent Donation Requests
          </h3>
          <DonationRequestTable
            requests={recentRequests}
            currentPage={1}
            itemsPerPage={3}
             userRole={role}
          />
          <Link
            to="my-donation-requests"
            className="btn m-5 bg-red-600 text-white"
          >
            View My All Request
          </Link>
        </>
      )}

      {/* ---------- ADMIN / VOLUNTEER DASHBOARD ---------- */}
      {(role === "admin" || role === "volunteer") && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
            <StatCard
              icon={<Users size={32} />}
              title="Total Users"
              count={stats.totalUsers}
            />
            <StatCard
              icon={<HeartHandshake size={32} />}
              title="Total Funding"
              count={`$${stats.totalFunding}`}
            />
            <StatCard
              icon={<Droplets size={32} />}
              title="Total Requests"
              count={stats.totalRequests}
            />
          </div>
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-md border border-gray-100 mt-10">
            <h3 className="text-lg md:text-xl font-bold mb-6 text-gray-700 text-center">
              Blood Requests by Group (Real-time)
            </h3>
            <div className="w-full h-[300px] md:h-[400px]">
              {isMounted && stats?.bloodGroupStats?.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={stats.bloodGroupStats}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#f3f4f6"
                    />
                    <XAxis
                      dataKey="group"
                      tick={{ fontSize: 12 }}
                      interval={0}
                    />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip cursor={{ fill: "#fecaca", opacity: 0.3 }} />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                      {stats.bloodGroupStats.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2">
                  <Droplets size={40} className="animate-pulse" />
                  <p>
                    {isMounted ? "No request data found" : "Loading Chart..."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MainDashBoard;

/* ---------- Reusable Stat Card ---------- */
const StatCard = ({ icon, title, count }) => {
  return (
    <div className="bg-base-100 shadow-sm rounded-xl border-red-500 border hover:scale-105 transition px-4 pb-4 flex flex-col items-center justify-center gap-4 text-center">
      <div className="flex flex-col items-center gap-2">
        <img src={logo} className="w-25 h-25" alt="logo" />
        <span className="text-3xl font-bold text-red-600">BloodCare</span>
      </div>

      <div className="flex  items-center gap-2">
        <div className="p-3 bg-red-100 text-red-600 rounded-full">{icon}</div>
        <div>
          <p className="text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold">{count}</h3>
        </div>
      </div>
    </div>
  );
};
