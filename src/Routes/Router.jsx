import { createBrowserRouter } from "react-router";
import RootLayoute from "../Layoutes/RootLayoute";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import DashBoardLayOut from "../Layoutes/DashBoardLayOut";
import MainDashBoard from "../Pages/MainDashBoard/MainDashBoard";
import AddRequest from "../Pages/MainDashBoard/AddRequest";
import AllUsers from "../Pages/Allusers/AllUsers";
import PrivateRoutes from "../Provider/PrivateRoutes";
import MyDonateRequest from "../Pages/MainDashBoard/MyDonateRequest";
import Profile from "../Pages/Profile";
import Funding from "../Pages/Founding/Funding";
import PaymentSuccess from "../Pages/Founding/PaymentSuccess";
import PaymentCancelled from "../Pages/Founding/PaymentCancelled";
import SearchPage from "../Pages/searchPage/SearchPage";
import DonateRequest from "../Pages/donateRequest/DonateRequest";
import DonarDetails from "../Pages/DonarDetails/DonarDetails";
import Banner from "../Components/Banner";
import FeaturedSection from "../Components/FeaturedSection";
import ContactUs from "../Components/ContactUs";
import EditRequest from "../Pages/EditRequest/EditRequest";
import AllDonationRequests from "../Components/DashBoard/AllDonationRequests";
import AddVolunteer from "../Pages/MainDashBoard/AddVolunteer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayoute></RootLayoute>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/banner",
        element: <Banner></Banner>,
      },
      {
        path: "/feature-section",
        element: <FeaturedSection></FeaturedSection>,
      },
      {
        path: "/search-page",
        element: <SearchPage></SearchPage>,
      },
      {
        path: "/contact-us",
        element: <ContactUs></ContactUs>,
      },
      {
        path: "/funding",
        element: <Funding></Funding>,
      },
      {
        path: "/donate-request",
        element: <DonateRequest></DonateRequest>,
      },
      {
        path: "/donate-details/:id",
        element: (
          <PrivateRoutes>
            {" "}
            <DonarDetails></DonarDetails>
          </PrivateRoutes>
        ),
      },
      {
        path: "/payment-success",
        element: <PaymentSuccess></PaymentSuccess>,
      },
      {
        path: "/payment-cancelled",
        element: <PaymentCancelled></PaymentCancelled>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoutes>
        {" "}
        <DashBoardLayOut></DashBoardLayOut>
      </PrivateRoutes>
    ),
    children: [
      {
        index: true,
        element: <MainDashBoard></MainDashBoard>,
      },
      {
        path: "add-request",
        element: <AddRequest></AddRequest>,
      },
      {
        path: "all-users",
        element: <AllUsers></AllUsers>,
      },
      {
        path: "my-donation-requests",
        element: <MyDonateRequest></MyDonateRequest>,
      },
      {
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path: "edit-request/:id",
        element: <EditRequest></EditRequest>,
      },
      {
        path: "all-blood-donation-request",
        element: <AllDonationRequests />,
      },
      {
        path: "add-volunteer",
        element: <AddVolunteer></AddVolunteer>,
      },
    ],
  },
]);

export default router;
