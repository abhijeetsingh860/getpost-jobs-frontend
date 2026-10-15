import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import { 
    Code, 
    Server, 
    Database, 
    Palette, 
    Layers, 
    Cpu, 
    Smartphone, 
    ShieldCheck 
} from 'lucide-react';

const categories = [
    { title: "Frontend Developer", icon: <Code className="w-4 h-4 text-indigo-500" /> },
    { title: "Backend Developer", icon: <Server className="w-4 h-4 text-purple-500" /> },
    { title: "FullStack Developer", icon: <Layers className="w-4 h-4 text-fuchsia-500" /> },
    { title: "Data Science & AI", icon: <Cpu className="w-4 h-4 text-emerald-500" /> },
    { title: "UI/UX & Product Design", icon: <Palette className="w-4 h-4 text-pink-500" /> },
    { title: "DevOps & Cloud", icon: <Database className="w-4 h-4 text-amber-500" /> },
    { title: "Mobile App Engineer", icon: <Smartphone className="w-4 h-4 text-blue-500" /> },
    { title: "Cybersecurity", icon: <ShieldCheck className="w-4 h-4 text-rose-500" /> },
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/jobs");
    };

    return (
        <div className="max-w-4xl mx-auto px-4 my-14">
            <div className="text-center mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Explore By Domain
                </span>
            </div>

            <Carousel className="w-full">
                <CarouselContent className="-ml-3">
                    {categories.map((cat, index) => (
                        <CarouselItem key={index} className="pl-3 basis-1/2 sm:basis-1/3 md:basis-1/4">
                            <button
                                onClick={() => searchJobHandler(cat.title)}
                                className="w-full p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-500/60 shadow-xs hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-200 flex flex-col items-center justify-center gap-2.5 text-center group"
                            >
                                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 group-hover:scale-110 transition-transform">
                                    {cat.icon}
                                </div>
                                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                                    {cat.title}
                                </span>
                            </button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="hidden sm:block">
                    <CarouselPrevious className="-left-5 rounded-full shadow-md border-slate-200 dark:border-slate-700 dark:bg-slate-800" />
                    <CarouselNext className="-right-5 rounded-full shadow-md border-slate-200 dark:border-slate-700 dark:bg-slate-800" />
                </div>
            </Carousel>
        </div>
    );
};

export default CategoryCarousel;
