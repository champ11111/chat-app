import React, { useState } from "react";
import logo from "../assets/logo.jpg";

export default function LoginCard() : JSX.Element {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // TODO: Implement login logic
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 text-center space-y-auto">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className = "text-black">Login</h1>
        <img src={logo} className="w-full" alt="logo" />
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2 text-left" htmlFor="username">
              Email
            </label>
            <input
              className="border rounded-lg py-2 px-3 w-full"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2 text-left" htmlFor="password">
              Password
            </label>
            <input
              className="border rounded-lg py-2 px-3 w-full"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

