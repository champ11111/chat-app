import React, { useState, useEffect, FC, Dispatch, SetStateAction } from 'react';
import Modal from 'react-modal';

interface Props {
    type: string;
    name: string;
    isFriend: boolean;
    pictureUrl: string;
    isOpen: boolean;
    closeModal: () => void;
}

const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        borderRadius: '12px',
        margin: '0',
        padding: '0',
    }
}

const ProfileModal: FC<Props> = ({ type, name, isFriend, pictureUrl, isOpen, closeModal }) => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(localStorage.getItem("darkMode") === "true")
    useEffect(() => {
        setIsDarkMode(localStorage.getItem("darkMode") === "true")
    }, [localStorage.getItem("darkMode")])

    const chatOrAddFriendHandler = () => {
        if (isFriend) {
            console.log("add friend")
        } else {
            console.log("chat")
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            style={modalStyles}
            onRequestClose={closeModal}
        >
            <div className={`${isDarkMode ? 'dark' : ''}`}>
                <div className="flex flex-col items-center dark:bg-gray-800">
                    <img
                        className="w-56 h-56 rounded-xl object-cover"
                        src={pictureUrl}
                        alt="Profile image"
                    />
                    <p className="font-bold my-2 dark:text-white">
                        {name}
                    </p>
                </div>
                <button
                    className="w-full p-3 text-cyan-600 hover:bg-gray-200 dark:text-white dark:bg-gray-800 dark:hover:bg-gray-200 dark:hover:text-cyan-600"
                    onClick={chatOrAddFriendHandler}
                >
                    {isFriend ? 'Chat' : (type === 'Users' ? 'Add Friend' : 'Join Group')}
                </button>
                <button
                    className="w-full p-3 text-cyan-600 hover:bg-gray-200 dark:text-white dark:bg-gray-800 dark:hover:bg-gray-200 dark:hover:text-cyan-600"
                    onClick={closeModal}
                >
                    Cancel
                </button>
            </div>
        </Modal>
    )
}

export default ProfileModal;