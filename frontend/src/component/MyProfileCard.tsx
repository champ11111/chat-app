import { FC } from 'react'

interface Props {
    profilePictureURL: string;
    nickname: string;
}

const MyProfileCard: FC<Props> = ({profilePictureURL, nickname}) => {
  return (
    <div className='flex items-center justify-between p-2 mx-1 my-2 rounded-md bg-gray-100 border-b border-gray-300 dark:bg-gray-600 dark:border-gray-600'>
        <p className='self-start mt-2 ml-2 text-l font-bold text-gray-800 dark:text-white'>
            {nickname}
        </p>
        <div
            className='w-14 h-14'
        >
            <img
                className='w-full h-full object-cover rounded-full'
                src={profilePictureURL}
                alt="Profile image"
            />
        </div>
    </div>
  )
}

export default MyProfileCard