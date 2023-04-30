import { FC, Dispatch, SetStateAction, useState } from 'react'
import { CaretDownOutlined, CaretRightOutlined } from '@ant-design/icons'
import ProfileCard from './ProfileCard';

interface Item {
    imageUrl: string;
    nickname: string;
    isFriend: boolean;
}

interface Props {
    type: string;
    items: Item[];
}

const Collapse: FC<Props> = ({ type, items }) => {
    const [collapsed, setCollapsed] = useState<boolean>(false)
    const collapseHandler = () => {
        setCollapsed((prev) => !prev)
    }

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
                        imageUrl={item.imageUrl}
                        nickname={item.nickname}
                        isFriend={item.isFriend}
                    />
                ))}
            </div>
        </div>
    )
}

export default Collapse