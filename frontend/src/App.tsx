import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
      localStorage.setItem("darkMode", JSON.stringify(darkMode))
  }, [darkMode])

  return (
    <div className={darkMode ? "dark" : ""}>
      <button onClick={() => setDarkMode((prev)=>!prev)}>Toggle Dark Mode</button>
      <div className="dark:bg-gray-800 transition duration-500">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;