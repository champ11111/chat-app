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
    const {chatId,setChatId} = useContext(ChatIdContext);

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
        setNameState(res.data.name);
        setIsJoinedState(res.data.userRoomRelations.some((userRoomRelation) => userRoomRelation.user.id === uid))
    };

    const fecthRoomId = async () => {
        console.log("start")
        const res = await getUserByID(id);
        console.log("userId",res.data)
        const resRoom = await getRooms();
        console.log("resRoom",resRoom.data)
        const roomArrays = res.data.userRoomRelations.filter((room:Room)=> !room.isGroupChat).map((relation) => relation.room.id)
        console.log("roomArray",roomArrays)
        const userRooms = resRoom.data.filter((room:Room) => room.isGroupChat === false && roomArrays.includes(room.id));
        console.log("userRooms",userRooms)
        for (let i = 0; i < userRooms.length; i++) {
            if (userRooms[i].userRoomRelations.some((userRoomRelation) => userRoomRelation.user.id === uid)) {
                setChatId(userRooms[i].id);
                break;
            }
        }
    }

    const chatOrAddFriendHandler = () => {
        if (isJoinedState) {
            // chat
            setChatId(id);
            closeModal();
        } else if (isFriendState) {
            // chat
            fecthRoomId();
            closeModal();
        } else {
            // add friend
            if (type === 'Users') {
                // add friend
                console.log('add friend')
                const formData = {
                    name: name,
                    isGroupChat: false,
                    userIds: [uid,id],
                    groupPicture: picture?picture.split(",")[1]+".png":""
                }
                const createChat = async () => {
                    const res = await createRoom(formData);  
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

    useEffect(() => {
        setIsDarkMode(localStorage.getItem("darkMode") === "true")
    }, [localStorage.getItem("darkMode")])
    
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