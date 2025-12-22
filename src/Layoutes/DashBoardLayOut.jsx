import React, { useState } from "react";
import { Outlet } from "react-router";
import AdminSidebar from "../Components/DashBoard/AdminSidebar";
import { Menu } from "lucide-react";

const DashBoardLayOut = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-x-hidden">
      {/* ---------- Sidebar ---------- */}
      {/* Desktop */}
      <div className="hidden lg:block">
        <AdminSidebar />
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* overlay */}
          <div
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/40"
          ></div>

          {/* drawer */}
          <div className="absolute left-0 top-0 h-full w-64 bg-gray-700">
            <AdminSidebar closeDrawer={() => setOpen(false)} />
          </div>
        </div>
      )}

      {/* ---------- Main Content ---------- */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="lg:hidden flex items-center gap-3 p-4 shadow bg-white">
          <button onClick={() => setOpen(true)} className="btn btn-ghost">
            <Menu />
          </button>
          <h2 className="text-xl font-bold text-red-600">Dashboard</h2>
        </div>
        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-2 md:p-8 bg-gray-50">
          <div className="max-w-full overflow-x-hidden">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayOut;
