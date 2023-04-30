import React, { useState } from "react";
import logo from "../assets/logo.svg";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function LoginModal() : JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // TODO: Implement login logic
    e.preventDefault();
    const res = await login({email, password});
    localStorage.setItem("token", res.data.accessToken)
    navigate("/main");

  };

  return (
    <div className="flex rounded-lg items-center justify-center bg-gray-100 text-center space-y-auto">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-2xl p-8">
        <h1 className = "text-2xl text-black dark:text-white font-semibold">Login</h1>
        <img src={logo} className="w-full" alt="logo" />
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 text-left" htmlFor="email">
              Email
            </label>
            <input
              className="border dark:bg-gray-700 dark:text-gray-100 rounded-lg py-2 px-3 w-full"
              type="text"
              id="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 text-left" htmlFor="password">
              Password
            </label>
            <input
              className="border dark:bg-gray-700 dark:text-gray-100 rounded-lg py-2 px-3 w-full"
              type="password"
              id="password"
              placeholder="Enter your password"
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

