import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"
import { createBrowserRouter,RouterProvider } from "react-router-dom";

import LandingPage from "./page/landing-page";
import ErrorPage from "./page/error-page"
import ChatPage from "./page/chat-page";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/main",
        element: <ChatPage />,
    }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );