import { FC, useState, useEffect, useContext } from 'react'
import { ChatIdContext } from '../page/Chat'
import { getRoomById, removeUserFromRoom } from '../api/room';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';
import Modal from 'react-modal'

interface Props {
    isOpen: boolean;
    closeModal: () => void;
    groupID: number;
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
        width: '350px',
    }
}

const GroupCreateModal: FC<Props> = ({ isOpen, closeModal, groupID }) => {
    const { setFetchTrigger } = useContext(ChatIdContext)
    const [isDarkMode, setIsDarkMode] = useState<boolean>(localStorage.getItem("darkMode") === "true")
    const [selectedMemberID, setSelectedMemberID] = useState<number>(-1)
    const [members, setMembers] = useState<User[]>([])
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    useEffect(() => {
        const fetchMembers = async () => {
            const res = await getRoomById(groupID)
            setMembers(()=>res.data.userRoomRelations.map((relation) => relation.user))
        }
        fetchMembers()
    }, [ isOpen, groupID ])
    useEffect(() => {
        setIsDarkMode(localStorage.getItem("darkMode") === "true")
    }, [localStorage.getItem("darkMode")])

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (selectedMemberID === -1 || isSubmitting) {
            return
        }
        setIsSubmitting(true)
        const toastId = toast.loading("Removing member...")
        try {
            const res: AxiosResponse<any, any> = await removeUserFromRoom(groupID, selectedMemberID)
            setFetchTrigger((prev) => !prev)
            toast.update(toastId, {
                render: "Member removed",
                type: "success",
                isLoading: false,
                autoClose: 2000,
            })
        } catch (err) {
            console.log(err)
            toast.update(toastId, {
                render: "Failed to remove member",
                type: "error",
                isLoading: false,
                autoClose: 2000,
            })
        }
        setIsSubmitting(false)
        closeModal()
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
                        <p className="text-gray-800 dark:text-white">Remove Member</p>
                        <button
                            className="text-blue-600 border-none bg-white dark:bg-gray-800 dark:text-blue-400"
                            type='submit'
                        >
                            Confirm
                        </button>
                    </div>
                    <hr className="w-full" />
                    {
                        members.map((member) => (
                            <div key={member.id} className="flex items-center justify-between w-full mt-2">
                                <div className="flex items-center">
                                    <img
                                        className="w-10 h-10 rounded-full"
                                        src={member.profilePictureUrl}
                                        alt="member profile"
                                    />
                                    <p className="text-gray-800 dark:text-white ml-3">{member.username}</p>
                                </div>
                                <input
                                    className="w-5 h-5"
                                    type="checkbox"
                                    onChange={() => setSelectedMemberID(()=>member.id)}
                                    checked={selectedMemberID === member.id}
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