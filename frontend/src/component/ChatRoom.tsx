import { useState, useEffect, useContext, useRef,useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import  Message  from "../types/message";
import { getMessagesByRoomId, sendMessageToRoom, markMessageAsRead } from "../api/message";
import { ChatIdContext } from '../page/Chat';
import EditGroupModal from "./EditGroupModal";
import { UsergroupDeleteOutlined } from "@ant-design/icons";
import { getUID } from "../utils/jwtGet";
import { io } from "socket.io-client";
import Picker from "emoji-picker-react";
import {BsEmojiSmileFill} from "react-icons/bs";

export default function ChatRoom() {
  const [uid, setUID] = useState(getUID());
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const navigate = useNavigate();
  const {chatId,setChatId} = useContext(ChatIdContext);
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useLayoutEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const getMessages = async () => {
    try {
      const res = await getMessagesByRoomId(chatId);
      const newMessages = [...res.data];
      newMessages.sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());
      setMessages(newMessages);
    }
    catch (err) {
      setMessages([]);
    }
  }

  const handleEmojiPickerHide = () => {
    setShowEmojiPicker(!showEmojiPicker);
  }
  
  const handleEmojiClick = (e) => {
    console.log(e.emoji)
    let msg = newMessage;
    setNewMessage(msg + e.emoji);
    setShowEmojiPicker(!showEmojiPicker);
  }

  const handleNewMessage = () => {
    const sendMessage = async () => {
      const res = await sendMessageToRoom(chatId, newMessage, "text");
      if (socket){
        socket.emit('new message', res.data);
      }
      setMessages((prevMessages) =>  [...prevMessages, res.data].sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()));
      setNewMessage("");
    }
    sendMessage();
  };

  const handleSignout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  
  useEffect(() => {
    setChatId(0);
    
    const newSocket = io('http://localhost:3000'); // replace with your server URL
    setSocket(newSocket);

    return () => {
      newSocket.off('message received');
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        console.log('Connected to server');
        socket.emit('setup', {user:{ _id: uid }}); // replace with your user ID
      });
  
      socket.on('join room', () => {
        if (chatId!=0){
          console.log('New room joined', chatId);
          socket.emit('join room', chatId);
        }
      });

      socket.on('message received', (receivedMessage) => {
        if (receivedMessage){
          console.log('New message received', receivedMessage);
          setMessages((prevMessages) =>  [...prevMessages, receivedMessage].sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()));
        }
      });
  
      return () => {
        socket.off('connect');
        socket.off('join room');
      };
    }
  }, [socket]);
  
  useEffect(() => {
    getMessages();
    if (socket && chatId!=0) {
      socket.emit('join room', chatId);
    }
  }, [chatId]);
  


  return (
    <>
    {chatId != 0? (
      <div className="max-h-screen flex flex-col justify-between">
        <EditGroupModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          groupID={chatId}
      />
      <div className="bg-white dark:bg-gray-800 py-2 px-4 text-gray-800 dark:text-gray-200 flex items-center justify-between transition duration-500">
        <h1 className="text-lg font-bold ">Chatroom</h1>
        <div className="flex items-center space-x-4">
          <button 
            className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded transition duration-500"
            onClick={handleSignout}  
          >
            Sign out
          </button>
          <div className="bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center">
            <UsergroupDeleteOutlined onClick={() => setIsModalOpen(true)} className="dark:text-white text-xl" />
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-scroll p-4 gray-800">
        {messages.length > 0? (messages
        .map((message) => (
            <div
              key={message.id}
              className={`flex flex-col space-y-1 mb-4 dark:text-white ${message.sender.id === uid ? '' : ''}`}
            >
              <div className="flex items-center">
                <div className="bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center">
                    <img
                      className='w-full h-full object-cover rounded-full'
                      src={message.sender.profilePictureUrl}
                      alt="Profile image"
                  />
                </div>
                <div className="ml-2">
                  <h3 className="text-sm font-bold">{message.sender.username}</h3>
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
              <span className="text-xs text-gray-400">{message.updatedAt}</span>
            </div>
         
        ))) : <></>}
        <div  ref={messagesEndRef}/>
      </div >
      <div className="Container dark:bg-gray-800 transition duration-500">

          <div className="button-container">
            <div className="emoji">
              <BsEmojiSmileFill onClick={handleEmojiPickerHide} />
              {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick}/>}
            </div>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
          <div className="input">
            <input
              type="text"
              className="w-full border border-gray-300 dark:bg-gray-700 dark:text-100 py-2 px-4 rounded transition duration-500"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 ml-2 text-white font-bold rounded"
              onClick={handleNewMessage}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
    ):(
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-800 darl:text-gray-200 transition duration-500">
        <h1 className="text-4xl font-bold mb-4 dark:text-gray-200 transition duration-500">Welcome to Chat!</h1>
        <p className="text-gray-700 dark:text-gray-200 text-lg text-center">
          Select a chat to start talking.
        </p>
      </div>
    )}
    
    </>
    
  );
};

