import { useState, useEffect, FC,useRef } from "react";
import Modal from "react-modal";
import { getUser,updateUser } from "../api/user";
import { getUID } from "../utils/jwtGet"
import { toast } from 'react-toastify'
import { CameraOutlined } from '@ant-design/icons'


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
    const [id , setId] = useState<number>(0)
    const [nickname, setNickname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [profilePicture, setProfilePicture] = useState<string>("");
    const [pictureFile, setPictureFile] = useState<File>();
    const [isDarkMode, setIsDarkMode] = useState<boolean>(localStorage.getItem("darkMode") === "true")
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    
    async function fetchUserInfo() {
        const uid = await getUID();
        const response = await getUser(uid);
        setId(response.data.id);
        setNickname(response.data.username);
        setEmail(response.data.email);
        setPassword(response.data.password);
        setProfilePicture(response.data.profilePictureUrl);
    }
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0]
            console.log(file)
            setPictureFile(file)
            const reader = new FileReader()
            reader.readAsDataURL(file)
            console.log(reader.result)
            reader.onloadend = () => {
                setProfilePicture(reader.result as string)
            }
        }
    }

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (isSubmitting) {
            return
        }
        setIsSubmitting(true)
        const formData = new FormData()
        formData.append('username', nickname);
        formData.append('email', email);
        formData.append('password', password)
        if (pictureFile) {
            formData.append('profilePicture', pictureFile, pictureFile.name);
        }
        console.log(formData)
        const toastId = toast.loading('Updating Profile...')
        try{
            const res = await updateUser(id,formData)
            toast.update(toastId, {
                render: 'Update success!',
                type: 'success',
                isLoading: false,
                autoClose: 2000,
            })
        } catch (e) {
            toast.update(toastId, {
                render: 'Failed to update user',
                type: 'error',
                isLoading: false,
                autoClose: 2000,
            })
            console.log(e)
        }
        setIsSubmitting(false)
        closeModal()
    }

    useEffect(() => {
        fetchUserInfo();
        console.log(profilePicture)
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
                <form className="flex flex-col items-center w-full dark:bg-gray-800 p-2" onSubmit={handleFormSubmit}>
                <div className="flex flex-col items-center dark:bg-gray-800 px-16 pt-10 pb-10" >
                    <h1 className="text-2xl text-gray-800 dark:text-white font-semibold mb-8">My Profile</h1>
                    <div className="relative flex items-center rounded-full bg-blue-600 p-1 my-2">
                            <img
                                className="w-32 h-32 rounded-full"
                                src={profilePicture}
                                alt="Profile picture"
                            />
                            <div className="absolute flex items-center justify-center bg-blue-600 w-10 h-10 rounded-full right-0 bottom-0">
                                <CameraOutlined className="text-white text-2xl" />
                                <input
                                    type='file'
                                    accept="image/*"
                                    className="absolute opacity-0 w-full h-full cursor-pointer"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                    <label className="block font-semibold my-2 text-gray-800 dark:text-white rounded-lg pt-6 px-3 w-full center" htmlFor="username">
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
                    <label className="block font-semibold my-2 text-gray-800 dark:text-white rounded-lg pt-2 px-3 w-full" htmlFor="email">
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
                    <label className="block font-semibold my-2 text-gray-800 dark:text-white rounded-lg pt-2 px-3 w-full" htmlFor="password">
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
                    className="flex items-center justify between dark:bg-gray-800 mt-4"
                >
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg my-2 mt-5 mx-2 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                        type="submit"
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
                </form>
            </div>
        </Modal>
    );
}

export default MyProfileModal;