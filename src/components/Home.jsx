import React, { useEffect } from 'react';
import Navbar from './shared/NavBar';
import HeroSection from './HeroSection';
import CategoryCarousel from './CategoryCarousel';
import LatestJobs from './LatestJobs';
import Footer from './shared/Footer';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import useGetSavedJobs from '@/hooks/useGetSavedJobs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    useGetAllJobs();
    useGetSavedJobs();
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.role === 'recruiter') {
            navigate("/admin/companies");
        }
    }, [user, navigate]);

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 transition-colors duration-300">
            <Navbar />
            <main className="flex-1">
                <HeroSection />
                <CategoryCarousel />
                <LatestJobs />
            </main>
            <Footer />
        </div>
    );
};

export default Home;
