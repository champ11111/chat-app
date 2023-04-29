import { useState } from "react";
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

function App() {

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;