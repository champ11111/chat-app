import React, { useState } from "react";
import { register } from "../api/auth";
import { useNavigate } from "react-router-dom";

interface RegisterModalProps {
  onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({onClose}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // TODO: Implement registration logic
    e.preventDefault();
    const res = await register({username, email, password});
    console.log(res);
    onClose();

  };

  return (
    <div className="flex items-center justify-center bg-gray-100 space-y-auto text-center rounded-lg">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-2xl p-8">
          <h1 className="text-2xl text-gray-800 dark:text-white font-bold mb-4">Register</h1>
          <div className="mb-4 text-left">
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2" htmlFor="username">
              Nickname
            </label>
            <input
              className="border dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg py-2 px-3 w-full"
              type="text"
              id="username"
              placeholder="Enter your nickname"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4 text-left">
            <label className="block text-gray-700 dark:text-gray-300  font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="border dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg py-2 px-3 w-full"
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4 text-left">
            <label className="block text-gray-700 dark:text-gray-300  font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="border dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg py-2 px-3 w-full"
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleRegister}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;