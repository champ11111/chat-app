import { FC } from 'react'


interface Props {
    imageUrl: string;
    nickname: string;
}

const MyProfileCard: FC<Props> = ({imageUrl, nickname}) => {
  return (
    <div className='flex items-center justify-between p-2 mx-1 my-2 rounded-md bg-gray-100 border-b border-gray-300'>
        <p className='self-start mt-2 ml-2 text-l font-bold text-gray-800'>
            {nickname}
        </p>
        <div
            className='w-14 h-14'
        >
            <img
                className='w-full h-full object-cover rounded-full'
                src={imageUrl}
                alt="Profile image"
            />
        </div>
    </div>
  )
}

export default MyProfileCard