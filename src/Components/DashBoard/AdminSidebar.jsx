import React, { useContext } from "react";
import { NavLink } from "react-router";
import logo from "../../assets/logo.png";
import {
  Home,
  Users,
  LogOut,
  PlusCircle,
  HeartHandshake,
  SmilePlus,
  LogOutIcon,
  HomeIcon,
} from "lucide-react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { CgProfile } from "react-icons/cg";

const AdminSidebar = ({ closeDrawer }) => {
  const { role, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout().then(() => {
      Swal.fire({
        icon: "success",
        title: "Logout Successful!",
        timer: 1500,
        showConfirmButton: false,
      });
    });
  };

  const navItemClass = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-lg transition ${
      isActive ? "bg-blue-600 text-white" : "hover:bg-gray-600"
    }`;

  return (
    <aside className="w-64 h-screen bg-gray-700 text-gray-200 flex flex-col p-5">
      {/* Logo */}
      <div className=" mb-5">
        <div className="flex items-center gap-2 ">
          <img src={logo} className="w-10 h-10 rounded-full" />
          <span className="text-3xl font-bold text-red-500 ">BloodCare</span>
        </div>
        <div className="ml-12">
          <span className="capitalize text-white ">({role} Panel)</span>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-2">
        <NavLink onClick={closeDrawer} to="/dashboard" className={navItemClass}>
          <Home size={18} /> Dashboard
        </NavLink>

        <NavLink onClick={closeDrawer} to="profile" className={navItemClass}>
          <CgProfile size={18} /> Profile
        </NavLink>

        {(role === "donar" || role === "volunteer" || role === "admin") && (
          <NavLink
            onClick={closeDrawer}
            to="add-request"
            className={navItemClass}
          >
            <PlusCircle size={18} /> Add Request
          </NavLink>
        )}

        {role === "admin" && (
          <NavLink
            onClick={closeDrawer}
            to="all-users"
            className={navItemClass}
          >
            <Users size={18} /> All Users
          </NavLink>
        )}
        {role === "admin" && (
          <NavLink
            onClick={closeDrawer}
            to="add-volunteer"
            className={navItemClass}
          >
            <SmilePlus size={18} /> Add Volunteer
          </NavLink>
        )}

        {(role === "admin" || role === "volunteer") && (
          <NavLink
            onClick={closeDrawer}
            to="all-blood-donation-request"
            className={navItemClass}
          >
            <HeartHandshake size={18} /> All Requests
          </NavLink>
        )}

        {role === "donar" && (
          <NavLink
            onClick={closeDrawer}
            to="my-donation-requests"
            className={navItemClass}
          >
            <HeartHandshake size={18} /> My Requests
          </NavLink>
        )}
      </nav>

      {/* Footer */}
      <div className="mt-auto space-y-3">
        <NavLink to="/" className="btn w-full bg-red-600 text-white">
          <HomeIcon size={20} /> Home
        </NavLink>
        <button
          onClick={handleLogout}
          className="btn w-full bg-red-600 text-white"
        >
          <LogOutIcon size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
