import Image from 'next/image';
import { AuthContext } from '../../contexts/authContext';
import React, { useContext } from 'react';
import Link from 'next/link';



function Layout({ children }) {
    const { currentUser, logout } = useContext(AuthContext); // Destructure currentUser and logout from the context

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <header className="bg-black text-white p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex-shrink-0 max-h-400">
                        <Link href="/"><Image src="/logo.png" alt="Logo" width={200} height={350} /></Link>
                    </div>
                    <nav>
                        <ul className="flex space-x-4">
                            {
                                // If currentUser exists, show Sign Out button. Otherwise, show Sign In and Sign Up buttons.
                                currentUser ? (
                                    <>
                                        <li><button onClick={logout} className="hover:underline">Sign Out</button></li>
                                    </>
                                ) : (
                                    <>
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
                                    </>
                                )
                            }
                        </ul>
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