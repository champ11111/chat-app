import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"
import { createBrowserRouter,RouterProvider } from "react-router-dom";

import Home from "./page/Home";
import ErrorPage from "./page/Error"
import ChatPage from "./page/Chat";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
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