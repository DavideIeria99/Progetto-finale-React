import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./router";
import { HelmetProvider } from "react-helmet-async";

export default function App() {
  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}
