import Image from 'next/image';
import React, { useRef } from 'react';
import Dashboard from '../components/Dashboard';


export default function Home() {
    const aboutRef = useRef(null); //for scrolling to about section 
    return (
        <main className="flex flex-col">
            {/* Hero Section */}
            <div className="text-center mb-8 flex flex-col items-center w-full bg-red-950 h-screen justify-center">
                <Image src="/logo2.svg" alt="Logo" width={800} height={800} className="mb-[-5] animate__animated animate__fadeInDown" />
                <div 
                    className="text-5xl text-orange-200 cursor-pointer transform hover:scale-110 transition-transform duration-300"
                    onClick={() => aboutRef.current.scrollIntoView({ behavior: 'smooth' })}
                >
                    ▼
                </div>
            </div>
            {/* About Section */}
            <div ref={aboutRef} className="bg-orange-200 p-10 rounded-lg shadow-2xl mb-8 flex flex-col md:flex-row items-center m-8">
                <div className="md:w-1/2 mb-6 md:mb-0">
                <h2 className="text-4xl font-semibold mb-6 text-black">
                    <span className="text-red-700 font-bold">QRollCall </span> 
                        makes taking attendance as easy as 
                    <span className="text-red-700 font-bold"> pressing a button</span>
                </h2>
                    <p className="text-xl text-gray-800">
                        QRollCall is your ultimate solution for effortless attendance tracking. With our platform, teachers and institutions can efficiently monitor and manage class attendance using QR codes.
                    </p>
                    <p className="text-xl text-gray-800">
                        Sign In to begin adding classes to the dashboard below.
                    </p>
                </div>
                <div className="md:w-1/2">
                    <Image src="/candidates-cropped.svg" alt="Description of Image" className="w-full rounded-md" />
                </div>
            </div>

            {/* Dashboard Section */}
            <Dashboard />


        </main>
    )
}
