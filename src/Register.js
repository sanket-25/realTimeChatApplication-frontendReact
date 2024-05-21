// src/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register({ setUser }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    //   const handleRegister = (e) => {
    //     e.preventDefault();
    //     if (password !== confirmPassword) {
    //       setError('Passwords do not match');
    //       return;
    //     }

    //     // Registration logic here (e.g., call API to register user)
    //     // For now, just set a dummy user object and redirect
    //     setUser({ email });
    //     navigate('/chat', { state: { email } }); // Pass email as state
    //   };


    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                name,
                email,
                password,
            });
            const { token } = response.data;

            // Save token in local storage
            localStorage.setItem('token', token);

            // Optionally decode the token to get user info, if you need to set user
            setUser({ email });

            navigate('/chat');
        } catch (err) {
            setError('User already exists with this email');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form className="bg-white p-6 rounded shadow-md" onSubmit={handleRegister}>
                <h2 className="mb-4 text-xl">Register</h2>
                {error && <p className="mb-4 text-red-500">{error}</p>}
                <div className="mb-4">
                    <label className="block mb-1" htmlFor="email">Name</label>
                    <input
                        id="name"
                        type="name"
                        className="w-full px-4 py-2 border rounded"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1" htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        className="w-full px-4 py-2 border rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1" htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        className="w-full px-4 py-2 border rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1" htmlFor="confirm-password">Confirm Password</label>
                    <input
                        id="confirm-password"
                        type="password"
                        className="w-full px-4 py-2 border rounded"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
                    Register
                </button>
                <p className="mt-4 text-center">
                    Already have an account? <span className="text-blue-500 cursor-pointer" onClick={() => navigate('/login')}>Login</span>
                </p>
            </form>
        </div>
    );
}

export default Register;
