import {useState, useEffect, createContext, useContext} from 'react';
import Sidebar from '../component/Sidebar';
import Chatroom from '../component/ChatRoom';
import { getUsers, getUserByID } from '../api/user';
import { getRooms } from '../api/room';
import { getUID } from '../utils/jwtGet';
import User from '../types/user';
import { Room } from '../types/room';
import { io,Socket } from 'socket.io-client';

export const ChatIdContext = createContext({});

export default function Chat(){
    const [uid, setUID] = useState(getUID());
    const [users, setUsers] = useState<User[]>([]);
    const [myProfile, setMyProfile] = useState<User>({} as User);
    const [rooms, setRooms] = useState<Room[]>([]);
    const [friends, setFriends] = useState([]);
    const socket = useRef<Socket | null>(null);

    const [chatId, setChatId] = useState<number>(0);


    useEffect(() => {
        const fetchUsers = async () => {
            const res = await getUsers();
            // console.log(res)
            setUsers(()=>res.data.filter((user: User) => user.id !== uid));
        }
        fetchUsers();
        const fetchRooms = async () => {
            const res = await getRooms();
            setRooms(()=>res.data);
        }
        fetchRooms();
        const fetchMyProfile = async () => {
            const res = await getUserByID(uid);
            setMyProfile(()=>res.data);
            setFriends(()=>res.data.userRoomRelations.map((friend) => friend.user.id));
        }
        fetchMyProfile();
    }, [])

    useEffect(() => {
        socket.current = io("ws://localhost:3000");
        socket.current.emit("addUser", uid);
    }, [uid])
    // console.log("users", users)
    // console.log("myProfile", myProfile)
    // console.log("rooms", rooms)

    return (
        <ChatIdContext.Provider value={{chatId,setChatId}}>
            <div id="chat-page" className= "flex w-full min-h-screen">
                <Sidebar 
                    myProfile = {{
                        "profilePictureURL" : myProfile.profilePictureUrl,
                        "nickname" : myProfile.username,
                        "id" : myProfile.id
                    }}
                    users = {users.map((user: User) => ({
                        "profilePictureURL" : user.profilePictureUrl,
                        "nickname" : user.username,
                        "id" : user.id,
                        "isFriend" : false
                    }))}

                    groups = {rooms.filter((room: Room) => room.isGroupChat).map((room: Room) => ({
                        "profilePictureURL": room.groupPictureUrl,
                        "nickname": room.name,
                        "id": room.id,
                        "isJoined": room.userRoomRelations.some((userRoomRelation) => userRoomRelation.user.id === uid)
                    }))}
                    

                />
                <div id = "main" className = "w-3/4">
                    <Chatroom
                    id = {chatId}
                    />
                </div>
            </div>
        </ChatIdContext.Provider >
    )
}