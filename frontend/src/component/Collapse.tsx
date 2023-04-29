import { FC, Dispatch, SetStateAction, useState } from 'react'
import { CaretDownOutlined, CaretRightOutlined } from '@ant-design/icons'
import ProfileCard from './ProfileCard';

interface Item {
    imageUrl: string;
    nickname: string;
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
                <p className='text-l font-bold text-gray-800'>
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
            {collapsed ? (
                <div className='flex flex-col'>
                    {items.map((item) => (
                        <ProfileCard
                            key={item.nickname}
                            imageUrl={item.imageUrl}
                            nickname={item.nickname}
                        />
                    ))}
        </div>
            ) : <></>}
        </div>
    )
}

export default Collapse