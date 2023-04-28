import React from "react";
import viteLogo from "/vite.svg";

interface ProfileCardProps {
  imageUrl: string;
  name: string;
  status: string;
}

export default function ProfileCard({imageUrl, name, status}: ProfileCardProps) {
  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4 text-left">
        <div className="flex-shrink-0">
            <img className="h-12 w-12" src={viteLogo} alt="ChitChat Logo"/>
        </div>
        <div>
            <div className="text-xl font-medium text-black">{name}</div>
            <p className="text-gray-500">You have a new message!</p>
        </div>
    </div>
  );
};
