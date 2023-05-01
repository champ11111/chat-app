import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [lightMode, setLightMode] = useState(false); // [state, setState
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true" ? true : false);
  useEffect(() => {
      localStorage.setItem("darkMode", JSON.stringify(darkMode))
  }, [darkMode])

  return (
    <div className={darkMode ? "dark" : ""}>
      <ToastContainer 
          position="top-center"
      />
      <button onClick={() => setDarkMode((prev)=>!prev)}>Toggle Dark Mode</button>
      <div className="dark:bg-gray-800 transition duration-500">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;