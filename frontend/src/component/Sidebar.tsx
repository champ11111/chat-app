import React,{FC, ReactNode, useState, useRef, useEffect} from 'react';
import ProfileOverlay from './ProfileModal';
import MyProfileCard from './MyProfileCard';
import GroupCreateModal from './GroupCreateModal';
import Collapse from './Collapse';
import { PlusSquareFilled } from '@ant-design/icons';

interface Props {
    myProfile: {
        profilePictureURL: string;
        nickname: string;
    };
    users : {
        profilePictureURL: string;
        nickname: string;
        isFriend?: boolean;
    }[];
    groups: {
        profilePictureURL: string;
        nickname: string;
        isJoined?: boolean;
    }[];
}

const Sidebar: FC<Props> = ({myProfile, users, groups}) => { 
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    console.log("myProfile :",myProfile)

    return (<>
        <GroupCreateModal
            isOpen={isModalOpen}
            closeModal={() => setIsModalOpen(false)}
        />
        <div className="flex flex-col w-1/4 h-screen">
            <div className="flex justify-between p-2 border-b border-gray-300 dark:border-gray-700">
                <p className='text-xl font-bold text-gray-800 dark:text-gray-100'>
                    Chats
                    </p>
                <PlusSquareFilled 
                    onClick={() => setIsModalOpen(true)}
                    className='text-2xl text-gray-800 cursor-pointer dark:text-gray-400'
                />
            </div>
            <MyProfileCard
                profilePictureURL={myProfile.profilePictureURL}
                nickname={myProfile.nickname}
            />
            <Collapse
                type='Groups'
                groups={groups}
            />
            <Collapse
                type='Users'
                users={users}
            />
        </div>
        </>
    );
}

export default Sidebar;