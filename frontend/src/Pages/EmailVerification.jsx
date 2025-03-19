import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { Loader } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { errorMessage } from "../Utils/HandleToast";

const EmailVerification = () => {
    const { verifyEmail, error, isLoading, clearError } = useAuthStore()
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);
    const navigate = useNavigate();

    useEffect(() => {
        clearError();
    }, []);


    const handleChange = (index, value) => {
        const newCode = [...code]
        // Handle pasted code
        if (value.length > 1) {
            // Split 6 digit pasted code
            const pastedCode = value.slice(0, 6).split("");
            for (let i = 0; i < 6; i++) {
                newCode[i] = pastedCode[i] || "";
            }
            setCode(newCode)
            // Focus on last non-empty input or the first empty one
            const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "")
            const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
            inputRefs.current[focusIndex].focus()
        }
        // Handling code entered by user one by one
        else {
            newCode[index] = value;
            setCode(newCode)
            // Move focus to next input filed if value is entered
            if (value && index < 5) {
                inputRefs.current[index + 1].focus()
            }
        }
    }

    const handleKeyDown = (index, e) => {
        // If pressed key is backspace and code of given index is empty and index is greater than 0
        if (e.key === "Backspace" && !code[index] && index > 0) {
            // Then focus on previous input box
            inputRefs.current[index - 1].focus();
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Join all code array values and create string.
        const verificationCode = code.join('')
        // Calling verifyEmail api function from authStore
        try {
            await verifyEmail(verificationCode)
            navigate("/")
        } catch (error) {
            errorMessage(error)
        }

    }

    // Auto submit if all input boxes are filled
    useEffect(() => {
        // if every value of code array is filled call handleSubmit
        if (code.every(digit => digit != '')) {
            handleSubmit(new Event('submit'))
        }

    }, [code]);

    return (
        <div className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl p-4'>

                <h1 className='font-[poppinsBold] text-center font-black text-2xl bg-gradient-to-br from-cyan-500 to-blue-600 bg-clip-text text-transparent'>Verify Your Email</h1>

                <p className="text-center text-gray-300 my-6">Enter 6 digit code sent to your email address.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex justify-between">
                        {
                            code.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="text"
                                    maxLength='6' // Max length is 6 so user can paste 6 digit code and we will then split that into all input boxes
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className="w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-700 rounded-lg outline-none focus:border-foregroundColor"
                                />
                            ))
                        }
                    </div>
                    {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
                    <button type="submit" className='w-full text-white font-[poppins] bg-gradient-to-br from-cyan-500 to-blue-600 mt-5 px-3 py-2 rounded-lg font-bold hover:from-cyan-600 hover:to-blue-700 transition duration-200 outline-none' disabled={isLoading}>
                        {isLoading ? <Loader className='animate-spin mx-auto' /> : "Verify Email"}
                    </button>
                </form>
            </motion.div>
        </div>
    )
}

export default EmailVerification