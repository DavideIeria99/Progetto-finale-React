import { createBrowserRouter } from "react-router-dom";

import Root from "./Pages/root";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Error from "./Pages/Error";
import Login from "./Pages/Login";
import Search, { getGenres } from "./Pages/search";
import Profile from "./Pages/profile";
import ProtectedRoute from "./Components/ProtectedRoute";
import SignIn from "./Pages/signIn";
import Details, { getGameDetails } from "./Pages/Details";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about-us",
        element: <About />,
      },
      {
        path: "/search/:genre?/:num?",
        element: <Search />,
        loader: getGenres,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/details/:id",
        element: <Details />,
        loader: getGameDetails,
      },
      {
        path: "/profile",
        element: <ProtectedRoute element={<Profile />} />,
      },
    ],
  },
]);
