import React from 'react'

// Renamed icon as Icon so we can use this as a react element and taking other props
const Input = ({ icon: Icon, ...props }) => {
    return (
        <div className='relative mb-6'>
            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <Icon className='size-5 text-foregroundColor' />
            </div>
            <input
                {...props}
                className='w-full pl-10 pr-3 py-2 font-[poppins] bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 outline-none focus:border-foregroundColor focus:ring-cyan-600 text-white placeholder-gray-400 transition duration-200'
            />
        </div>
    )
}

export default Input