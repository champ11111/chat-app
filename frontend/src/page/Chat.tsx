import {useState, useEffect} from 'react';
import Sidebar from '../component/Sidebar';
import ProfileOverlay from '../component/ProfileModal';
import Chatroom from '../component/ChatRoom';

export default function Chat(){
    return (
        <div id="chat-page" className= "flex w">
            <Sidebar/>
            <div id = "main" className = "w-3/4">
                <Chatroom/>
            </div>
        </div>
    )
}