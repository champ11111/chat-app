import React, { useState, useEffect, FC, Dispatch, SetStateAction, useContext } from 'react';
import Modal from 'react-modal';
import { createRoom, addUserToRoom, getRooms, getRoomById } from '../api/room';
import { getUserByID } from '../api/user';
import { getUID } from '../utils/jwtGet';
import User from '../types/user';
import { Room } from '../types/room';
import { ChatIdContext } from '../page/Chat';

interface Props {
    type: string;
    name: string;
    isFriend?: boolean;
    isJoined?: boolean;
    pictureUrl: string;
    isOpen: boolean;
    id: number;
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

const ProfileModal: FC<Props> = ({ type, name, isFriend, isJoined, pictureUrl, id, isOpen, closeModal }) => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(localStorage.getItem("darkMode") === "true")
    const [uid, setUID] = useState(getUID());
    const [picture, setPicture] = useState<string>(pictureUrl);
    const [nameState, setNameState] = useState<string>(name);
    const [isFriendState, setIsFriendState] = useState<boolean>(isFriend);
    const [isJoinedState, setIsJoinedState] = useState<boolean>(isJoined);

    const fetchUser = async () => {
        const res = await getUserByID(id);
        const resRoom = await getRooms();
        const roomArrays = res.data.userRoomRelations.filter((room:Room)=> !room.isGroupChat).map((relation) => relation.room.id)
        const userRooms = resRoom.data.filter((room:Room) => room.isGroupChat === false && roomArrays.includes(room.id));
        const friends = userRooms.map((room:Room) => room.userRoomRelations.filter((relation) => relation.user.id !== id).map((relation) => relation.user.id.toString())).flat();
        setPicture(res.data.profilePictureUrl);
        setIsFriendState(friends.includes(uid.toString()));
        setNameState(res.data.username);
    };

    const fetchRoom = async () => {
        const res = await getRoomById(id);
        setPicture(res.data.groupPictureUrl);
        setIsJoinedState(res.data.name);
        setNameState(res.data.userRoomRelations.some((userRoomRelation) => userRoomRelation.user.id === uid))
    };


    useEffect(() => {
        setIsDarkMode(localStorage.getItem("darkMode") === "true")
    }, [localStorage.getItem("darkMode")])

    const {chatId,setChatId} = useContext(ChatIdContext);

    const chatOrAddFriendHandler = () => {
        if (isFriendState || isJoinedState) {
            // chat
            setChatId(id);
        } else {
            // add friend
            if (type === 'Users') {
                // add friend
                console.log('add friend')
                const createChat = async () => {
                    const res = await createRoom(name, false, [uid,id]);  
                    fetchUser();
                }  
                createChat();
            } else {
                // join group
                const joinGroup = async () => {
                    const res = await addUserToRoom(id,uid);
                    fetchRoom();
                }
                joinGroup();
            }
            
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
                        src={picture}
                        alt="Profile image"
                    />
                    <p className="font-bold my-2 dark:text-white">
                        {nameState}
                    </p>
                </div>
                <button
                    className="w-full p-3 text-cyan-600 hover:bg-gray-200 dark:text-white dark:bg-gray-800 dark:hover:bg-gray-200 dark:hover:text-cyan-600"
                    onClick={chatOrAddFriendHandler}
                >
                    {isFriendState || isJoinedState ? 'Chat' : (type === 'Users' ? 'Add Friend' : 'Join Group')}
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