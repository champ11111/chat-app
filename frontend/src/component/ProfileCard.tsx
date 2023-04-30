import { FC, useState, useEffect } from "react";
import ProfileModal from "./ProfileModal";

interface Props {
  type: string;
  imageUrl: string;
  nickname: string;
  isFriend: boolean;
}

const ProfileCard: FC<Props> = ({ type, imageUrl, nickname, isFriend }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  return (
    <>
      <ProfileModal
        type={type}
        name={nickname}
        isFriend={isFriend}
        pictureUrl={imageUrl}
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      />
      <div
        className="flex items-center p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
        onClick={() => setIsModalOpen(true)}
      >
        <img
          className="w-12 h-12 rounded-full"
          src={imageUrl}
          alt="Profile image"
        />
        <p className="font-bold ml-2 dark:text-white">
          {nickname}
        </p>
      </div>
    </>
  )
}

export default ProfileCard