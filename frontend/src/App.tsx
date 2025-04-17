import "./App.css";
import Home from "./screen/Home";
import AllBus from "./screen/AllBus";
import BusSeat from './screen/BusSeat';
import Header from './components/Header';
import Booking from "./screen/Booking";
import Offers from './screen/Offers';
import Signup from './screen/SignUp';
import Login from './screen/Login';


import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

// Layout with Header
const Layout = () => (
  <>
    <Header />
    <Outlet /> {/* Render matched route's element here */}
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> }, 
      { path: "allbus", element: <AllBus /> },
      { path: "busSeat/:id", element: <BusSeat /> },
      { path: "booking", element: <Booking /> },
      { path: "offers", element: <Offers /> },
      { path: "signup", element: <Signup /> },
      { path: "login", element: <Login /> },

    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
