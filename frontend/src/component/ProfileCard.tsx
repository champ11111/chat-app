import {FC} from "react";
import viteLogo from "/vite.svg";

interface Props {
    imageUrl: string;
    nickname: string;
}

const ProfileCard:FC<Props> = ({imageUrl, nickname}) => {
  return (
    <div
      className="flex items-center p-2"
    >
      <img 
        className="w-12 h-12 rounded-full"
        src={imageUrl}
        alt="Profile image"
      />
      <p className="font-bold ml-2">
        {nickname}
      </p>
    </div>
  )
}

export default ProfileCard