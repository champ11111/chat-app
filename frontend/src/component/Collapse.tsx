import { FC, Dispatch, SetStateAction, useState } from 'react'
import { CaretDownOutlined, CaretRightOutlined } from '@ant-design/icons'
import ProfileCard from './ProfileCard';

interface Users {
    profilePictureURL: string;
    nickname: string;
    isFriend?: boolean;
    id: number;
}[];

interface Groups {
    profilePictureURL: string;
    nickname: string;
    isJoined?: boolean;
    id: number;
}[];

interface Props {
    type: string;
    users?: Users;
    groups?: Groups;
}

const Collapse: FC<Props> = ({ type, users, groups }) => {
    const [collapsed, setCollapsed] = useState<boolean>(false)
    const collapseHandler = () => {
        setCollapsed((prev) => !prev)
    }
    const items = users || groups

    return (
        <div className='flex flex-col'>
            <div className='flex items-center justify-between p-2'>
                <p className='text-l font-bold text-gray-800 dark:text-white'>
                    {type}
                </p>
                {collapsed ? (
                    <CaretDownOutlined
                        className='text-2xl text-gray-300 cursor-pointer'
                        onClick={collapseHandler}
                    />
                ) : (
                    <CaretRightOutlined
                        className='text-2xl text-gray-300 cursor-pointer'
                        onClick={collapseHandler}
                    />
                )}
            </div>
            <div className={`flex flex-col ${collapsed ? "":"hidden"}`}>
                {items.map((item, idx) => (
                    <ProfileCard
                        key={idx}
                        type={type}
                        imageUrl={item.profilePictureURL}
                        nickname={item.nickname}
                        isFriend={item.isFriend}
                        isJoined={item.isJoined}
                        id={item.id}
                    />
                ))}
            </div>
        </div>
    )
}

export default Collapse