import { useState, useEffect, FC } from "react";
import Modal from "react-modal";
import { getUser } from "../api/user";
import { getUID } from "../utils/jwtGet"

interface Props {
    isOpen: boolean;
    closeModal: () => void;
}



const modalStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        transform: "translate(-50%, -50%)",
        borderRadius: "12px",
        margin: "0",
        padding: "0",
    },
};



const MyProfileModal: FC<Props> = ({
    isOpen,
    closeModal,
}) => {
    const [nickname, setNickname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [profilePictureURL, setProfilePictureURL] = useState<string>("");
    const [isDarkMode, setIsDarkMode] = useState<boolean>(localStorage.getItem("darkMode") === "true")
    
    async function fetchUserInfo() {
        const uid = await getUID();
        const response = await getUser(uid);
        setNickname(response.data.username);
        setEmail(response.data.email);
        setPassword(response.data.password);
        setProfilePictureURL(response.data.profileURL);
        console.log(response.data.username)
    }

    function handleUpdateProfile() {
        
    }

    useEffect(() => {
        fetchUserInfo();
    }, []);

    useEffect(() => { 
        setIsDarkMode(localStorage.getItem("darkMode") === "true");
    }, [localStorage.getItem("darkMode")])


    
    return (
        <Modal
            isOpen={isOpen}
            style={modalStyles}
            onRequestClose={closeModal}
        >
            <div className={`${isDarkMode ? 'dark' : ''}`}>
                <div className="flex flex-col items-center dark:bg-gray-800 px-16 pt-10 pb-10">
                    <h1 className="text-2xl text-gray-800 dark:text-white font-semibold mb-8">My Profile</h1>
                    <img
                        className="w-28 h-28 rounded-xl object-cover"
                        src = {profilePictureURL}
                        alt="Profile image"
                    />
                    <label className="block font-semibold my-2 text-gray-800 dark:text-white rounded-lg pt-2 px-3 w-full center" htmlFor="username">
                        Nickname
                    </label>
                    <input
                        className = "border bg-white dark:bg-gray-600 dark:border-gray-600 dark:text-white rounded-lg py-1 px-3 w-full"    
                        type="text"
                        id="username"
                        name="username"
                        placeholder = {nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                    <label className="block font-semibold my-2 text-gray-800 dark:text-white rounded-lg pt-4 px-3 w-full" htmlFor="email">
                        Email
                    </label>
                    <input
                        className = "border bg-white dark:bg-gray-600 dark:border-gray-600 dark:text-white rounded-lg py-1 px-3 w-full"
                        type="text"
                        id="email"
                        name="email"
                        placeholder = {email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="block font-semibold my-2 text-gray-800 dark:text-white rounded-lg pt-4 px-3 w-full" htmlFor="password">
                        Password
                    </label>
                    <input
                        className = "border bg-white dark:bg-gray-600 dark:border-gray-600 dark:text-white rounded-lg py-1 px-3 w-full "
                        type="password"
                        id="password"
                        name="password"
                        placeholder = {password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                <div
                    className="flex items-center justify between dark:bg-gray-800 mt-8"
                >
                     <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg my-2 mt-5 mx-2 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                        onClick={closeModal}
                    >
                        Save
                    </button>
                    <button
                        className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg my-2 mt-5 mx-2 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                </div>
                   
                </div>
            </div>
        </Modal>
    );
}

export default MyProfileModal;