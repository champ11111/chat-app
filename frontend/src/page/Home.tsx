import React, {ReactNode, useState, useRef, useEffect} from "react";
import logo from "../assets/logo.jpg";
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
                <h1 className="text-6xl font-bold">
                    ChapABC
                </h1>
                
                {/* login button */}
                <div className="flex flex-col items-center justify-center">
                    <div className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full text-center cursor-pointer"
                    onClick={()=>setIsLogin(!isLogin)}>Login</div>
                    {isLogin && (
                        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>
                        )}
                        {isLogin && (
                            <div 
                            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 z-20" 
                            ref = {overlayRef}>
                                <LoginModal/>
                            </div>
                        )}
                    <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center cursor-pointer"
                    onClick={()=>setIsRegister(!isRegister)}>Register</div>
                    {isRegister && (
                        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>
                        )}
                        {isRegister && (
                            <div 
                            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 z-20" 
                            ref = {overlayRef}>
                                <RegisterModal/>
                            </div>
                        )}
                </div>
            </div>
        </div>

    )
}