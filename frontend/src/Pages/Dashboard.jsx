import { motion } from 'framer-motion'
import { useAuthStore } from '../store/authStore'
import { formatDate } from '../Utils/FormatDate'
import { Loader } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const {user, isLoading, logout} = useAuthStore()
    const navigate = useNavigate()

    const handleLogout = async ()=> {
        await logout()
        setTimeout(() => {
            navigate("/login", { replace: true });
        }, 2000); 
    }
    
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden p-6'
        >

            <h1 className='font-[poppinsBold] text-center font-black text-2xl bg-gradient-to-br from-cyan-500 to-blue-600 bg-clip-text text-transparent mb-6'>Dashboard</h1>

            <div className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700">
                <h2 className="text-xl font-semibold text-blue-400 mb-3">Profile Information</h2>
                <p className="text-gray-300">{user.name}</p>
                <p className="text-gray-300">{user.email}</p>
            </div>

            <div className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 mt-2">
                <h2 className="text-xl font-semibold text-blue-400 mb-3">Account Activity</h2>
                <p className="text-gray-300">
                    <span className="font-bold">Joined: </span>
                    {
                        formatDate(user.createdAt)
                    }
                </p>
                <p className="text-gray-300">
                    <span className="font-bold">Last logged in: </span>
                    { formatDate(user.lastLogin) }
                </p>
            </div>

            <button type="submit" className='w-full text-white font-[poppins] bg-gradient-to-br from-cyan-500 to-blue-600 mt-5 px-3 py-2 rounded-lg font-bold hover:from-cyan-600 hover:to-blue-700 transition duration-200 outline-none' disabled={isLoading} onClick={handleLogout}>
                {isLoading ? <Loader className='animate-spin mx-auto' /> : "Logout"}
            </button>

        </motion.div>
    )
}

export default Dashboard