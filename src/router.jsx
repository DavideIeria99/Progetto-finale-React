import { createBrowserRouter } from "react-router-dom";

import Root from "./Pages/root";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Error from "./Pages/Error";
import Login from "./Pages/Login";

import ProtectedRoute from "./Components/ProtectedRoute";
import SignIn from "./Pages/SignIn";
import Details, { getGameDetails } from "./Pages/Details";
import SearchPage, { loadAll } from "./Pages/SearchPage";
import Profile from "./Pages/Profile";
import PagePrefer from "./Pages/PagePrefer";




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
        path: "/search-page",
        element: <SearchPage />,
        loader: loadAll,
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
      {
        path: "/preferer",
        element: <ProtectedRoute element={<PagePrefer />} />,
      }

    ],
  },
]);
