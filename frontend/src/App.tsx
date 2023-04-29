import { useState } from "react";
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
  const [darkMode, setDarkMode] = useState(false);
  console.log(darkMode)
  return (
    <div className={darkMode ? "dark" : ""}>
      <button onClick={() => setDarkMode(!darkMode)}>Toggle Dark Mode</button>
      <div className="dark:bg-gray-800 transition duration-500">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;