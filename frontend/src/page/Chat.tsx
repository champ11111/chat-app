import {useState, useEffect} from 'react';
import Sidebar from '../component/Sidebar';
import Chatroom from '../component/ChatRoom';
import { getUsers } from '../api/user';
import { getRooms } from '../api/room';
import { getUID } from '../utils/jwtGet';
import User from '../types/user';
import { Room } from '../types/room';

export default function Chat(){
    const [uid, setUID] = useState(getUID());
    const [users, setUsers] = useState<User[]>([]);
    const [myProfile, setMyProfile] = useState<User>({} as User);
    const [rooms, setRooms] = useState<Room[]>([]);
    useEffect(() => {
        const fetchUsers = async () => {
            const res = await getUsers();
            // console.log(res)
            setUsers(()=>res.data.filter((user: User) => user.id !== uid));
            setMyProfile(()=>res.data.filter((user: User) => user.id === uid)[0]);
        }
        fetchUsers();
        const fetchRooms = async () => {
            const res = await getRooms();
            setRooms(()=>res.data);
        }
        fetchRooms();
    }, [])
    // console.log("users", users)
    // console.log("myProfile", myProfile)
    // console.log("rooms", rooms)

    // "profilePictureURL" : user.profilePictureUrl,
    // "nickname" : user.username,
    // "isFriend" : true
    return (
        <div id="chat-page" className= "flex w">
            <Sidebar 
                myProfile = {{
                    "profilePictureURL" : myProfile.profilePictureUrl,
                    "nickname" : myProfile.username
                }}
                users = {users.map((user: User) => ({
                    "profilePictureURL" : user.profilePictureUrl,
                    "nickname" : user.username,
                    "isFriend" : true
                }))}

                groups = {rooms.filter((room: Room) => room.isGroupChat).map((room: Room) => ({
                    "profilePictureURL": room.groupPictureUrl,
                    "nickname": room.name,
                    "isJoined": room.userRoomRelations.some((userRoomRelation) => userRoomRelation.user.id === uid)
                }))}
                

            />
            <div id = "main" className = "w-3/4">
                <Chatroom/>
            </div>
        </div>
    )
}