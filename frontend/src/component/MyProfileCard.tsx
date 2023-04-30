import { FC,useState } from 'react'
import MyProfileModal from './MyProfileModal'


interface Props {
    profilePictureURL: string;
    nickname: string;
}

const MyProfileCard: FC<Props> = ({profilePictureURL, nickname}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  
    return (
        <>
            <MyProfileModal
                isOpen={isModalOpen}
                closeModal={() => setIsModalOpen(false)}
            />
            <div
                className='flex items-center justify-between p-2 mx-1 my-2 rounded-md bg-gray-100 border-b border-gray-300 dark:bg-gray-600 dark:border-gray-600 transition duration-500 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-700'
                onClick={() => setIsModalOpen(true)}
            >
                <p className='self-start mt-2 ml-2 text-l font-bold text-gray-800 dark:text-white'>
                    {nickname}
                </p>
                <div
                    className='w-14 h-14'
                >
                    <img
                        className='w-full h-full object-cover rounded-full'
                        src = {profilePictureURL}
                        alt="Profile image"
                    />
                </div>
            </div>
        </>

    // <div className='flex items-center justify-between p-2 mx-1 my-2 rounded-md bg-gray-100 border-b border-gray-300 dark:bg-gray-600 dark:border-gray-600'>
    //     <p className='self-start mt-2 ml-2 text-l font-bold text-gray-800 dark:text-white'>
    //         {nickname}
    //     </p>
    //     <div
    //         className='w-14 h-14'
    //     >
    //         <img
    //             className='w-full h-full object-cover rounded-full'
    //             src={profilePictureURL}
    //             alt="Profile image"
    //         />
    //     </div>
    // </div>
    )
}

export default MyProfileCard