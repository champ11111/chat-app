import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import  Message  from "../types/message";
import { getMessagesByRoomId, sendMessageToRoom } from "../api/message";
import { ChatIdContext } from '../page/Chat';

export default function ChatRoom() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const navigate = useNavigate();
  const {chatId,setChatId} = useContext(ChatIdContext);

  const getMessages = async () => {
    try {
      const res = await getMessagesByRoomId(chatId);
      setMessages(()=>res.data);
    }
    catch (err) {
      setMessages([]);
    }
  }

  const handleNewMessage = () => {
    const sendMessage = async () => {
      const res = await sendMessageToRoom(chatId, newMessage, "text");
      setMessages((prevMessages) => [...prevMessages, res.data.content]);
      setNewMessage("");
    }
    sendMessage();
  };

  const handleSignout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    getMessages();
  }, [chatId]);


  return (
    <div className="min-h-full flex flex-col justify-between">
      <div className="bg-gray-800 py-2 px-4 text-gray-200 flex items-center justify-between">
        <h1 className="text-lg font-bold">Chatroom</h1>
        <div className="flex items-center space-x-4">
          <button 
            className="bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded"
            onClick={handleSignout}  
          >
            Sign out
          </button>
          <div className="bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center">
            <span className="text-sm font-bold">Y</span>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-scroll p-4">
        {messages.length > 0 ? (messages.map((message) => (
          <div
            key={message.id}
            className="flex flex-col space-y-1 mb-4"
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
      </div>
      <div className="bg-gray-200 py-2 px-4">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              className="w-full border border-gray-300 py-2 px-4 rounded"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 text-white font-bold rounded"
              onClick={handleNewMessage}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

