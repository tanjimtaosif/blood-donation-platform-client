import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const RootLayoute = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar></Navbar>
      <main className="grow w-11/12 mx-auto my-7">
        <Outlet />
      </main>
      <Footer></Footer>
    </div>
  );
};

export default RootLayoute;
