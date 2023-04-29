import React, {ReactNode, useState, useRef, useEffect} from "react";
import logo from "../assets/logo.svg";
import LoginModal from "../component/LoginModal";
import RegisterModal from "../component/RegisterModal";

export default function Home(){

    const [isLogin, setIsLogin] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [buttonType , setButtonType] = useState();

    const overlayRef = useRef<HTMLDivElement>(null);

    const handleClick = (event: MouseEvent) => {
        if (overlayRef.current 
            && !overlayRef.current.contains(event.target as Node)
            ) {
                setIsLogin(false);
                setIsRegister(false)
            }
    
    };

    useEffect(() => {
            document.addEventListener("mousedown", handleClick);
            return () => {
                document.removeEventListener("mousedown", handleClick);
            };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <div className="flex flex-col items-center justify-center space-y-50">
                <img src={logo} className="h-64 w-64" alt="logo" />
                <h1 className="text-6xl font-normal dark:text-white transition duration-500">
                    ChapABC
                </h1>
                
                {/* login button */}
                <div className="flex flex-col items-center justify-center my-10" >
                    <button className="bg-gray-700 dark:bg-gray-300 hover:bg-dark dark:hover:bg-white text-white dark:text-gray-800 font-med py-2 px-20 rounded-full w-full text-center cursor-pointer transition duration-500 ease-in-out"
                    onClick={()=>setIsLogin(!isLogin)}>Login</button>
                    {isLogin && (
                        <div className="fixed top-0 left-0 w-full h-full opacity-50 z-10"></div>
                        )}
                        {isLogin && (
                            <div 
                            className="fixed rounded-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 p-6 z-20" 
                            ref = {overlayRef}>
                                <LoginModal/>
                            </div>
                        )}
                    <div className= "my-2"></div>
                    <button className="bg-blue-500 dark:bg-blue-700 hover:bg-blue-500 dark:hover:bg-blue-900 text-white font-bold py-2 px-20 rounded-full text-center cursor-pointer transition duration-500 ease-in-out"
                    onClick={()=>setIsRegister(!isRegister)}>Register</button>
                    {isRegister && (
                        <div className="fixed top-0 left-0 w-full h-full opacity-50 z-10">
                        </div>
                        )}
                        {isRegister && (
                            <div 
                            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-lg  p-6 z-20" 
                            ref = {overlayRef}>
                                <RegisterModal onClose={() => setIsRegister(false)}/>
                            </div>
                        )}
                </div>
            </div>
        </div>

    )
}