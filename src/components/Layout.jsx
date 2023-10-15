import Image from 'next/image';
import { AuthContext } from '../../contexts/authContext';
import React, { useContext, useState, useRef, useEffect } from 'react';
import Link from 'next/link';

function Layout({ children }) {
    const { currentUser, logout } = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleOutsideClick(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <header className="bg-black text-white p-2">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <img src="/logo.png" alt="Logo" className="h-20 w-auto" />
                        </Link>
                    </div>
                    <nav>
                        {
                            currentUser ? (
                                <div className="relative" ref={dropdownRef}>
                                    <button 
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                        className="hover:underline"
                                    >
                                        Welcome, {currentUser.email}
                                    </button>
                                    {dropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-auto bg-white border border-gray-200 rounded shadow-md">
                                            <ul>
                                                <li>
                                                    <button 
                                                        onClick={logout}
                                                        className="block px-4 py-2 text-black hover:bg-gray-200"
                                                    >
                                                        Sign Out
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <ul className="flex space-x-4">
                                    <li>
                                        <Link passHref href="/SignIn">
                                            <span className="cursor-pointer hover:underline">Sign In</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link passHref href="/SignUp">
                                            <span className="cursor-pointer hover:underline">Sign Up</span>
                                        </Link>
                                    </li>
                                </ul>
                            )
                        }
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow bg-orange-100">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-black text-white p-4">
                <div className="container mx-auto text-center">
                    <p>&copy; {new Date().getFullYear()} QRollCall. All rights reserved.</p>
                    <div className="mt-2">
                        {/* You can put some footer links here */}
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Layout;
