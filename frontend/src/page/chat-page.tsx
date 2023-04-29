import {useState, useEffect} from 'react';
import Sidebar from '../component/sidebar';
import ProfileOverlay from '../component/profile-overlay';
import Chatroom from '../component/chat-room';

export default function ChatPage(){
    return (
        <div id="chat-page" className= "flex w">
            <Sidebar/>
            <div id = "main" className = "w-3/4">
                <Chatroom/>
            </div>
        </div>
    )
}