import { createBrowserRouter } from "react-router-dom";

import Home from "./Pages/Home";
import About from "./Pages/About";
import Root from "./Pages/root";
import Error from "./Pages/error";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/About",
                element: <About />
            },
        ]
    }
])