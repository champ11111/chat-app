import React,{ReactNode, useState, useRef, useEffect} from 'react';
import ProfileOverlay from './ProfileModal';
import ProfileCard from './ProfileCard';
import MyProfileCard from './MyProfileCard';
import Collapse from './collapse';
import { PlusSquareFilled } from '@ant-design/icons';


export default function Sidebar() {
    const [myProfile, setMyProfile] = useState({
        imageUrl: "https://chapabc.s3.us-west-1.amazonaws.com/defaultProfile.jpeg",
        nickname: 'Andrew Ng',
    })
    const [items, setItems] = useState([
        {
            imageUrl: "https://chapabc.s3.us-west-1.amazonaws.com/defaultProfile.jpeg",
            nickname: 'Andrew Ng',
        },
        {
            imageUrl: "https://chapabc.s3.us-west-1.amazonaws.com/defaultProfile.jpeg",
            nickname: 'Andrew Ng',
        },
    ])
    return (
        <div className="flex flex-col w-1/4 h-screen">
            <div className="flex justify-between p-2 border-b border-gray-300">
                <p className='text-xl font-bold text-gray-800'>
                    Chats
                    </p>
                <PlusSquareFilled 
                    className='text-2xl text-gray-800 cursor-pointer'
                />
            </div>
            <MyProfileCard
                imageUrl={myProfile.imageUrl}
                nickname={myProfile.nickname}
            />
            <Collapse
                type='Groups'
                items={items}
            />
                
            
        </div>
    );
}

