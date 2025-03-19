import { motion } from 'framer-motion';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Loader, Lock } from 'lucide-react';
import Input from '../components/Input';
import { useAuthStore } from '../store/authStore';
import { useEffect, useState } from 'react';
import { errorMessage, successMessage } from '../Utils/HandleToast';

const ResetPassword = () => {
    const { error, isLoading, resetPassword, clearError } = useAuthStore()
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate()

    const {token} = useParams()

    useEffect(() => {
        clearError();
    }, []);

    const handleSubmit = async (e)=> {
        e.preventDefault()
        if (!token) {
            return errorMessage("Invalid link")
        }
        if (password !== confirmPassword) {
            return errorMessage("Password are not same!")
        }
        await resetPassword(token, password)
        successMessage("Password reset successfully, Redirecting to login...")
        setTimeout(() => {
            navigate("/login")
        }, 2000);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
            <div className='p-4'>
                <h1 className='font-[poppinsBold] text-center font-black text-2xl bg-gradient-to-br from-cyan-500 to-blue-600 bg-clip-text text-transparent'>Reset your password</h1>
                <form onSubmit={handleSubmit} className='mt-6'>
                    <Input
                        icon={Lock}
                        type="password"
                        placeholder="New Password"
                        name="password"
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        required
                    />

                    <Input
                        icon={Lock}
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}

                    <button type="submit" className='w-full text-white font-[poppins] bg-gradient-to-br from-cyan-500 to-blue-600 mt-5 px-3 py-2 rounded-lg font-bold hover:from-cyan-600 hover:to-blue-700 transition duration-200 outline-none' disabled={isLoading}>
                        {isLoading ? <Loader className='animate-spin mx-auto' /> : "Reset Password"}
                    </button>
                </form>
            </div>
            <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
                <p className="text-sm text-gray-400">
                    Back to Login? {' '}
                    <Link className='text-blue-600 hover:underline' to={"/login"}>Login</Link>
                </p>
            </div>
        </motion.div>
    )
}

export default ResetPassword