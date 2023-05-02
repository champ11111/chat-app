import {useState, useEffect, createContext, useContext} from 'react';
import Sidebar from '../component/Sidebar';
import Chatroom from '../component/ChatRoom';
import { getUsers, getUserByID } from '../api/user';
import { getRooms } from '../api/room';
import { getUID } from '../utils/jwtGet';
import User from '../types/user';
import { Room } from '../types/room';
import { Spin } from 'antd';

export const ChatIdContext = createContext({});

export default function Chat(){
    const [uid, setUID] = useState(getUID());
    const [users, setUsers] = useState<User[]>([]);
    const [myProfile, setMyProfile] = useState<User>({} as User);
    const [rooms, setRooms] = useState<Room[]>([]);
    const [friends, setFriends] = useState([]);
    const [chatId, setChatId] = useState<number>(0);
    const [fetchTrigger, setFetchTrigger] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const fetchMyProfile = async () => {
        const res = await getUserByID(uid);
        setMyProfile(()=>res.data);
        const resRoom = await getRooms();
        console.log(resRoom)
        const roomArrays = res.data.userRoomRelations.filter((room:Room)=> !room.isGroupChat).map((relation) => relation.room.id)
        console.log(roomArrays)
        const userRooms = resRoom.data.filter((room:Room) => room.isGroupChat === false && roomArrays.includes(room.id));
        console.log(userRooms)
        const friends = userRooms.map((room:Room) => room.userRoomRelations.filter((relation) => relation.user.id !== uid).map((relation) => relation.user.id.toString())).flat();
        console.log(friends) 
        setFriends(prevFriends => [...prevFriends, ...friends]);
        setIsLoading(false);
    }

    
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

        setIsLoading(true);
        fetchMyProfile();

    }, [fetchTrigger]);

    return (
        <ChatIdContext.Provider value={{chatId,setChatId,setFetchTrigger}}>
            <div id="chat-page" className= "flex w-full min-h-screen">
                {isLoading? <Spin spinning={isLoading} delay={500} /> : <Sidebar 
                    myProfile = {{
                        "profilePictureURL" : myProfile.profilePictureUrl,
                        "nickname" : myProfile.username,
                        "id" : myProfile.id
                    }}
                    users = {users.map((user: User) => ({
                        "profilePictureURL" : user.profilePictureUrl,
                        "nickname" : user.username,
                        "id" : user.id,
                        "isFriend" : friends.includes(user.id.toString())
                    }))}

                    groups = {rooms.filter((room: Room) => room.isGroupChat).map((room: Room) => ({
                        "profilePictureURL": room.groupPictureUrl,
                        "nickname": room.name,
                        "id": room.id,
                        "isJoined": room.userRoomRelations.some((userRoomRelation) => userRoomRelation.user.id === uid)
                    }))}
                    

                />}
                 
                <div id = "main" className = "w-3/4">
                    <Chatroom
                    id = {chatId}
                    />
                </div> 
     
                
            </div>
        </ChatIdContext.Provider >
    )
}