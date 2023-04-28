import React,{ReactNode, useState, useRef, useEffect} from 'react';
import ProfileOverlay from './profile-overlay';
import ProfileCard from './profile-card';
import vitelogo from '../assets/vite.svg';

interface Props {
    children: ReactNode;
}

export default function Sidebar() {
    
    const [isOpen, setIsOpen] = useState(false);
    const [profile, setProfile] = useState({
        name: '',
        id: '',
        status: '',
        setIsOpen: (isOpen: boolean) => void 0,
        pictureUrl: ''
    });

    const overlayRef = useRef<HTMLDivElement>(null);

    const handleClick = (event: MouseEvent) => {
        if (overlayRef.current 
            && !overlayRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
    };

    useEffect(() => {
            document.addEventListener("mousedown", handleClick);
            return () => {
                document.removeEventListener("mousedown", handleClick);
            };
    }, []);

    return (
        <div className="flex h-screen bg-gray-200">
            <div className="w-64 bg-white shadow-md">
                <nav className="mt-10">
                <ul className = "space-y-3">
                    {isOpen && (
                        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>
                    )}
                    {isOpen && (
                        <div 
                        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 z-20" 
                        ref = {overlayRef}>
                            <ProfileOverlay 
                            name="Bozo Tarmarn" 
                            id='12345'
                            pictureUrl='None' 
                            setIsOpen={setIsOpen}
                            status='friend'/>
                        </div>
                    )}
                    <div onClick ={()=>setIsOpen(!isOpen)}>
                        <ProfileCard imageUrl='None' name="Bozo Tarmarn" status='hi'/>
                    </div>
                        <ProfileCard imageUrl='None' name="Bozo Tarmarn" status='hi'/>
                </ul>
                </nav>
            </div>
        </div>
    );
}

