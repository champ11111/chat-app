import React, {useState} from 'react';
import viteLogo from "/vite.svg";

interface Props {
    name: string;
    id: string;
    status: string;
    pictureUrl: string;
    setIsOpen: (isOpen: boolean) => void;
}

export default function ProfileOverlay(prop: Props) {

    return(
        <div className="bg-white shadow-lg rounded-lg overflow-hidden flex-col">
            <img
                className="w-full h-50 object-cover object-center"
                src={viteLogo}
                alt="avatar"
            />
            <div className="p-4 flex font-11 test-left">
                <h2 className="font-bold text-2m mb-2">Bozo Tarmarn</h2>
            </div>
            {(status != 'friend')&& (
                <button className="bg-blue-500 text-white py-2 px-4 rounded-md w-full">
                Add Friend
                </button>
            )}
            {(status === 'friend')&& (
                <button className="bg-blue-500 text-white py-2 px-4 rounded-md w-full">
                Chat
                </button>
            )}
            
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md w-full"
            onClick={()=>setIsOpen(false)}>
                Cancel
            </button>
        </div>
    )
}