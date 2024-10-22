import { ChakraProvider } from "@chakra-ui/react";
import { extendBaseTheme, theme as chakraTheme } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import SingleProduct from "./Pages/SingleProduct";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import LayoutDashboard from "./Pages/Dashbord/LayoutDashboard ";
import Dashboard from "./Pages/Dashbord/Dashboard ";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Products from "./Pages/products";
import { Toaster } from "react-hot-toast";
import Protect from "./Pages/Protect";
import Management from "./Pages/Dashbord/Management";
import Categories from "./Pages/Dashbord/Categories";
import "@fortawesome/fontawesome-free/css/all.min.css"

export const BASE_URL = "http://localhost:1337";

const { Button } = chakraTheme.components;

const theme = extendBaseTheme({
  components: {
    Button,
  },
});

export const BaseUrl = "http://localhost:1337"
function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { path: "home", element: <Home /> },
        { path: "products", element: <Products /> },
        { path: "singleProduct/:id", element: <SingleProduct /> },
        { path: "login", element: <Login /> },
        { path: "Profile", element: <Profile /> },
      ],
    },

    {
      path: "layoutDashboard",
      element: <Protect>
        <LayoutDashboard />
      </Protect>,
      children: [
        {index:true, element: <Dashboard /> },
        {path:"tabel", element: <Management /> },
        {path:"Categories", element: <Categories /> },
      ],
    },
  ]);

  return (
    <>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <RouterProvider router={router}></RouterProvider>
          <Toaster
  position="top-center"
  reverseOrder={false}
/>
        </ChakraProvider>
      </Provider>
    </>
  );
}

export default App;
