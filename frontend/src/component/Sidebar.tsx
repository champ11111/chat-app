import React,{FC, ReactNode, useState, useRef, useEffect} from 'react';
import ProfileOverlay from './ProfileModal';
import ProfileCard from './ProfileCard';
import MyProfileCard from './MyProfileCard';
import Collapse from './Collapse';
import { PlusSquareFilled } from '@ant-design/icons';

interface Props {
    myProfile: {
        imageUrl: string;
        nickname: string;
    };
    items: {
        imageUrl: string;
        nickname: string;
        isFriend: boolean;
    }[];
}

const Sidebar: FC<Props> = ({myProfile, items}) => { 
    

    return (
        <div className="flex flex-col w-1/4 h-screen">
            <div className="flex justify-between p-2 border-b border-gray-300 dark:border-gray-700">
                <p className='text-xl font-bold text-gray-800 dark:text-gray-100'>
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
            <Collapse
                type='Users'
                items={items}
            />
        </div>
    );
}

export default Sidebar;