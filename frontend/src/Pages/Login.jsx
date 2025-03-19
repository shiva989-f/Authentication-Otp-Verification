import React, { useEffect, useState } from 'react'
import Input from '../components/Input';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, Loader } from 'lucide-react';
import { errorMessage } from '../Utils/HandleToast';
import { useAuthStore } from '../store/authStore';

const Login = () => {
    const { login, forgotPassword, isLoading, error, clearError } = useAuthStore()
    
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate()

    useEffect(() => {
        clearError();
    }, []);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formData;
        if (!email || !password) {
            errorMessage("All fields are required");
        }

        try {
            // Calling login api function from authStore
            await login(email, password)
            navigate("/")
        } catch (error) {
            errorMessage(error)
        }

    }
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
            <div className='p-4'>
                <h1 className='font-[poppinsBold] text-center font-black text-2xl bg-gradient-to-br from-cyan-500 to-blue-600 bg-clip-text text-transparent'>Login your Account</h1>
                <form onSubmit={handleSubmit} className='mt-6'>
                    <Input
                        icon={Mail}
                        type="email"
                        placeholder="Email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <Input
                        icon={Lock}
                        type="password"
                        placeholder="Password"
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <div className="flex item-center mb-1">
                        <Link to='/forgot-password' className='text-sm  text-blue-600 hover:underline'>Forgot Password?</Link>
                    </div>

                    {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}

                    <button type="submit" className='w-full text-white font-[poppins] bg-gradient-to-br from-cyan-500 to-blue-600 mt-5 px-3 py-2 rounded-lg font-bold hover:from-cyan-600 hover:to-blue-700 transition duration-200 outline-none' disabled={isLoading}>
                        {isLoading ? <Loader className='animate-spin mx-auto' /> : "Login"}
                    </button>
                </form>
            </div>
            <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
                <p className="text-sm text-gray-400">
                    Don't have an account? {' '} 
                    <Link className='text-blue-600 hover:underline' to={"/signup"}>Signup</Link>
                </p>
            </div>
        </motion.div>
    )
}

export default Login