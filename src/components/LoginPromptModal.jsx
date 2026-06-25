import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './ui/button'
import { LogIn, UserPlus, X } from 'lucide-react'

const LoginPromptModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4'
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className='bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl'
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className='absolute top-4 right-4 text-gray-400 hover:text-gray-600'
                        >
                            <X size={20} />
                        </button>

                        {/* Icon */}
                        <div className='text-6xl mb-4'>🔐</div>

                        <h2 className='text-2xl font-bold text-gray-800 mb-2'>
                            Login Required!
                        </h2>

                        <p className='text-gray-500 mb-6'>
                            Please login or signup to browse and apply for jobs on <span className='font-semibold text-[#6A38C2]'>GetPost Jobs</span>
                        </p>

                        {/* Buttons */}
                        <div className='flex gap-3'>
                            <Button
                                onClick={() => navigate('/login')}
                                className='flex-1 bg-gradient-to-r from-[#6A38C2] to-[#8B5CF6] hover:from-[#5b30a6] hover:to-[#7C3AED] text-white rounded-xl py-5'
                            >
                                <LogIn className='h-4 w-4 mr-2' />
                                Login
                            </Button>
                            <Button
                                onClick={() => navigate('/signup')}
                                variant="outline"
                                className='flex-1 rounded-xl py-5 border-[#6A38C2] text-[#6A38C2]'
                            >
                                <UserPlus className='h-4 w-4 mr-2' />
                                Signup
                            </Button>
                        </div>

                        <p className='text-xs text-gray-400 mt-4'>
                            Join thousands of students finding their dream jobs! 🚀
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default LoginPromptModal