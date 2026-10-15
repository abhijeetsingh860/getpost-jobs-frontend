import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { LogIn, UserPlus, X, Lock } from 'lucide-react';

const LoginPromptModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className='fixed inset-0 bg-slate-950/70 z-50 flex items-center justify-center px-4 backdrop-blur-sm'
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, y: 30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className='relative bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl border border-slate-200/80 dark:border-slate-800'
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className='absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors'
                        >
                            <X size={18} />
                        </button>

                        <div className='w-14 h-14 mx-auto mb-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-sm'>
                            <Lock className="w-7 h-7" />
                        </div>

                        <h2 className='text-2xl font-black text-slate-900 dark:text-white mb-2'>
                            Sign In Required
                        </h2>

                        <p className='text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed'>
                            Sign in or create a free account to apply for positions, save bookmarks, and connect with recruiters on <span className='font-bold text-indigo-600 dark:text-indigo-400'>GetPost Jobs</span>.
                        </p>

                        {/* Buttons */}
                        <div className='flex gap-3'>
                            <Button
                                onClick={() => navigate('/login')}
                                className='flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl py-5 text-xs font-bold'
                            >
                                <LogIn className='h-4 w-4 mr-1.5' />
                                Sign In
                            </Button>
                            <Button
                                onClick={() => navigate('/signup')}
                                variant="outline"
                                className='flex-1 rounded-xl py-5 text-xs font-bold border-slate-200 dark:border-slate-700'
                            >
                                <UserPlus className='h-4 w-4 mr-1.5' />
                                Sign Up
                            </Button>
                        </div>

                        <p className='text-[11px] text-slate-400 mt-4'>
                            Takes less than 30 seconds to get started 🚀
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoginPromptModal;