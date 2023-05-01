import { FC, useState, useEffect, useContext } from 'react'
import { ChatIdContext } from '../page/Chat'
import Modal from 'react-modal'
import { CameraOutlined } from '@ant-design/icons'
import { createRoom } from '../api/room'

interface Props {
    isOpen: boolean;
    closeModal: () => void;
    users : {
        profilePictureURL: string;
        nickname: string;
        isJoined?: boolean;
        id: number;
    }[];
}

const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        borderRadius: '10px',
        margin: '0',
        padding: '0',
        width: '250px',
    }
}

const GroupCreateModal: FC<Props> = ({ isOpen, closeModal, users }) => {
    const { setFetchTrigger } = useContext(ChatIdContext)
    const [isDarkMode, setIsDarkMode] = useState<boolean>(localStorage.getItem("darkMode") === "true")
    useEffect(() => {
        setIsDarkMode(localStorage.getItem("darkMode") === "true")
    }, [localStorage.getItem("darkMode")])
    const [groupName, setGroupName] = useState<string>('')
    const [displayedGroupPicture, setDisplayedGroupPicture] = useState<string>("https://geodash.gov.bd/uploaded/people_group/default_group.png")
    const [groupPicture, setGroupPicture] = useState<File>()
    const [groupMembers, setGroupMembers] = useState<number[]>([])
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0]
            setGroupPicture(file)
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                setDisplayedGroupPicture(reader.result as string)
            }
        }
    }
    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', groupName);
        formData.append('isGroupChat', 'true')
        for (let i = 0; i < groupMembers.length; i++) {
            formData.append('userIds', groupMembers[i].toString());
        }
        if (groupPicture) {
            formData.append('groupPicture', groupPicture, groupPicture.name);
        }
        try{
            const res = await createRoom(formData)
            setFetchTrigger((prev) => !prev)
            setGroupName('')
            setGroupPicture(undefined)
            setDisplayedGroupPicture('https://geodash.gov.bd/uploaded/people_group/default_group.png')
            setGroupMembers([])
            closeModal()
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <Modal
            isOpen={isOpen}
            style={modalStyles}
            onRequestClose={closeModal}
        >
            <div className={`${isDarkMode ? 'dark' : ''}`}>
                <form className="flex flex-col items-center w-full dark:bg-gray-800 p-2" onSubmit={handleFormSubmit}>
                    <div className="flex justify-between p-2 w-full dark:bg-gray-800">
                        <button
                            className="text-blue-600 border-none bg-white dark:bg-gray-800 dark:text-blue-400"
                            onClick={closeModal}
                        >
                            Cancel
                        </button>
                        <button
                            className="text-blue-600 border-none bg-white dark:bg-gray-800 dark:text-blue-400"
                            type='submit'
                        >
                            Create
                        </button>
                    </div>
                    <hr className="w-full" />
                    <div className="flex align-center justify-center w-full">
                        <div className="relative flex items-center rounded-full bg-blue-600 p-1 my-2">
                            <img
                                className="w-32 h-32 rounded-full"
                                src={displayedGroupPicture}
                                alt="Group picture"
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
                    </div>
                    <label className="font-bold self-start text-gray-800 dark:text-white mt-2" htmlFor="groupName">Group Name</label>
                    <input
                        className="w-full p-1 border border-gray-300 dark:border-gray-700 rounded-md mt-1"
                        type="text"
                        id="groupName"
                        name="groupName"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                    />
                    <label className="font-bold self-start text-gray-800 dark:text-white mt-2" htmlFor="groupMembers">Group Members</label>
                    {
                        users.map((user) => (
                            <div key={user.id} className="flex items-center justify-between w-full mt-2">
                                <div className="flex items-center">
                                    <img
                                        className="w-10 h-10 rounded-full"
                                        src={user.profilePictureURL}
                                        alt="User profile"
                                    />
                                    <p className="text-gray-800 dark:text-white ml-3">{user.nickname}</p>
                                </div>
                                <input
                                    className="w-5 h-5"
                                    type="checkbox"
                                    checked={groupMembers.includes(user.id)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setGroupMembers((prev) => [...prev, user.id])
                                    }
                                        else {
                                            setGroupMembers((prev) => prev.filter((member) => member !== user.id))
                                        }
                                    }}
                                />
                            </div>
                        ))
                    }
                </form>
            </div>
        </Modal>
    )
}

export default GroupCreateModal