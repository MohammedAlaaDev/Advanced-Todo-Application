import { useNavigate } from 'react-router'

import { useThemeContext } from '@/contexts/theme/ThemeProvider';

import notFoundFirst from "@/assets/404/notFoundFirst.png";
import notFoundSecond from "@/assets/404/notFoundSecond.png";
import notFoundThird from "@/assets/404/notFoundThird.png";
import notFoundFourth from "@/assets/404/notFoundFourth.png";
import notFoundFifth from "@/assets/404/notFoundFifth.png";
import notFoundSixth from "@/assets/404/notFoundSixth.png";

const NotFound = () => {
    const navigate = useNavigate();
    
    const { theme } = useThemeContext();

    const images = {
        first: notFoundFirst,
        second: notFoundSecond,
        third: notFoundThird,
        fourth: notFoundFourth,
        fifth: notFoundFifth,
        sixth: notFoundSixth
    };

    return (
        <div className="min-h-screen bg-primary/10 dark:bg-primary/10 flex items-center justify-center font-sans">
            <div className="w-full text-center space-y-10 p-2 animate-page">

                <img src={images[theme]} alt="404 Not Found" className="size-80 mx-auto" />

                <div className="space-y-4">
                    <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                        Lost in the digital void?
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-base max-w-sm mx-auto leading-relaxed">
                        The page you're looking for doesn't exist or has been moved to another galaxy.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                        onClick={() => navigate('/')}
                        className="group border-gray-200 dark:border-slate-700 border relative px-10 py-4 bg-gray-900 text-white rounded-2xl font-medium overflow-hidden transition-all hover:scale-105 active:scale-95"
                    >
                        <span className="relative z-10 ">Back to Earth</span>
                        <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>
                </div>

            </div>
        </div>
    );
};

export default NotFound;