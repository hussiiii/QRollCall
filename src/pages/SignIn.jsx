import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';
import firebase from '../../firebase';
import { useRouter } from 'next/router';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const { signIn } = useContext(AuthContext);
    const router = useRouter(); // Initialize the useRouter hook

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signIn(email, password);
            setEmail(''); // Clear email field
            setPassword(''); // Clear password field
            setError(null); // Clear any errors
            router.push('/'); // Redirect to the home page
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-orange-100">
            <div className="w-96 bg-white p-8 rounded-lg shadow-xl">
                <h1 className="text-2xl font-bold mb-4">Sign In</h1>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 border rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-2 border rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600" type="submit">Sign In</button>
                </form>
            </div>
        </div>
    );
}

export default SignIn;
