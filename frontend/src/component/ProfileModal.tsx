import React, {useState, FC, Dispatch, SetStateAction} from 'react';
import Modal from 'react-modal';

interface Props {
    type: string;
    name: string;
    isFriend: boolean;
    pictureUrl: string;
    isOpen: boolean;
    closeModal: () => void;
}

const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        borderRadius: '10px',
        margin: '0',
        padding: '0',
        width: '250px',
    }
}

const ProfileModal: FC<Props> = ({type, name, isFriend, pictureUrl, isOpen, closeModal}) => {
    const chatOrAddFriendHandler = () => {
        if(isFriend) {
            console.log("add friend")
        } else {
            console.log("chat")
        }
    }

    return(
        <Modal
            isOpen={isOpen}
            style={modalStyles}
            onRequestClose={closeModal}
        >
            <div className="flex flex-col items-center">
                <img
                    className="w-40 h-40 rounded-2xl"
                    src={pictureUrl}
                    alt="Profile image"
                />
                <p className="font-bold my-2">
                    {name}
                </p>
            </div>
            <button 
                className="w-full p-3 text-cyan-600 hover:bg-gray-200"
                onClick={chatOrAddFriendHandler}
                >
                {isFriend ? 'Chat' : (type === 'Users' ? 'Add Friend' : 'Join Group')}
            </button>
            <button 
                className="w-full p-3 text-cyan-600 hover:bg-gray-200"
                onClick={closeModal}
                >
                Cancel
            </button>
        </Modal>
    )
}

export default ProfileModal;