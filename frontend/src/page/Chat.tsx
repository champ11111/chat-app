import {useState, useEffect} from 'react';
import Sidebar from '../component/Sidebar';
import Chatroom from '../component/ChatRoom';

export default function Chat(){
    const [myProfile, setMyProfile] = useState({
        imageUrl: "https://chapabc.s3.us-west-1.amazonaws.com/defaultProfile.jpeg",
        nickname: 'Andrew Ng',
    })
    const [items, setItems] = useState([
        {
            imageUrl: "https://chapabc.s3.us-west-1.amazonaws.com/defaultProfile.jpeg",
            nickname: 'Andrew Ng2',
            isFriend: true,
        },
        {
            imageUrl: "https://chapabc.s3.us-west-1.amazonaws.com/defaultProfile.jpeg",
            nickname: 'Andrei NJU',
            isFriend: false,
        },
    ])

    return (
        <div id="chat-page" className= "flex w">
            <Sidebar 
                myProfile={myProfile}
                items={items}
            />
            <div id = "main" className = "w-3/4">
                <Chatroom/>
            </div>
        </div>
    )
}