import { useEffect, useState } from 'react';
import Input from '../components/Input';
import { Lock, Mail, User, Loader } from 'lucide-react'
import { motion } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';
import { useAuthStore } from '../store/authStore';
import { errorMessage } from '../Utils/HandleToast';

const Signup = () => {
  const { signup, error, user, isLoading, clearError } = useAuthStore()

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  useEffect(() => {
    clearError();
  }, []);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name, email, password} = formData;
    try {
      if (!name || !email || !password) {
        return errorMessage("All fields are required");
      }
      // Created function for signup in authStore
      const response = await signup(name, email, password)
      navigate('/verify-email')
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
        <h1 className='font-[poppinsBold] text-center font-black text-2xl bg-gradient-to-br from-cyan-500 to-blue-600 bg-clip-text text-transparent'>Create Account</h1>
        <form onSubmit={handleSubmit} className='mt-6'>
          <Input
            icon={User}
            type="text"
            placeholder="Full Name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            icon={Mail}
            type="email"
            placeholder="Email Address"
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
            {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
            {/* Password Strength Meter */}
            <PasswordStrengthMeter password={formData.password} />

          <button type="submit" className='w-full text-white font-[poppins] bg-gradient-to-br from-cyan-500 to-blue-600 mt-5 px-3 py-2 rounded-lg font-bold hover:from-cyan-600 hover:to-blue-700 transition duration-200 outline-none' disabled={isLoading}>
            {isLoading ? <Loader className='animate-spin mx-auto' /> : "Signup"}
          </button>
        </form>
      </div>
      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
        <p className="text-sm text-gray-400">
          Already have an account? {''} 
          <Link className='text-blue-600 hover:underline' to={"/login"}>Login</Link>
        </p>
      </div>
    </motion.div>
  )
}

export default Signup