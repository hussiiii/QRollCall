import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';
import { useRouter } from 'next/router';

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter();

    const { signUp } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signUp(email, password);
            setEmail('');
            setPassword('');
            setError('');
            router.push('/'); // navigate to homepage or wherever you'd like after successful sign-up
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-orange-100">
            <div className="w-96 bg-white p-8 rounded-lg shadow-xl">
                <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
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
                    <button className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600" type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
