import { useAuthStore } from '../store/authStore'
import { ArrowLeft, Loader, Mail } from 'lucide-react'
import { motion } from 'framer-motion';
import Input from '../components/Input';
import { useEffect, useState } from 'react';
import { errorMessage } from '../Utils/HandleToast';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const { forgotPassword, isLoading, error, clearError } = useAuthStore()
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        clearError();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!email) {
            return errorMessage("Please enter your email")
        }
        try {
            await forgotPassword(email)
            setIsSubmitted(true)
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
                <h1 className='font-[poppinsBold] text-center font-black text-2xl bg-gradient-to-br from-cyan-500 to-blue-600 bg-clip-text text-transparent'>Forgot Password</h1>

                {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className='mt-6'>
                        <p className="text-gray-400 text-center my-3">
                            Enter your email address and to get reset password link on your email.
                        </p>
                        <Input
                            icon={Mail}
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}

                        <button type="submit" className='w-full text-white font-[poppins] bg-gradient-to-br from-cyan-500 to-blue-600 mt-2 px-3 py-2 rounded-lg font-bold hover:from-cyan-600 hover:to-blue-700 transition duration-200 outline-none' disabled={isLoading}>
                            {isLoading ? <Loader className='animate-spin mx-auto' /> : "Send Reset Link"}
                        </button>
                    </form>


                ) : (
                    <div className="text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            className='w-16 h-16 mt-6 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4'
                        >
                            <Mail className='w-8 h-8 text-white' />
                        </motion.div>
                        <p className="text-gray-300 mb-6">
                            If account already exist for {email}, you will receive a password reset link shortly.
                        </p>
                    </div>
                )}
            </div>
            <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">

                <Link to={'/login'} className="text-sm text-blue-600 flex items-center gap-2 hover:underline">
                    <ArrowLeft className='text-white w-5' />
                    Back to Login
                </Link>
            </div>
        </motion.div>
    );
};

export default ForgotPassword