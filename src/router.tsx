import CreateProductPage from "./pages/CreateProductPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

export const router = [
  {
    path: "/",
    element: <Home />,
    showNavbar: true,
  },
  {
    path: "/login",
    element: <Login />,
    showNavbar: false,
  },
  {
    path: "/register",
    element: <Register />,
    showNavbar: false,
  },
];
