import { useNavigate } from 'react-router'
import Lottie from 'lottie-react'
import animationData from '@/assets/lottie/Robot404.json'

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center font-sans selection:bg-gray-200">
            <div className="max-w-[50dvw] w-full text-center space-y-10 p-12 rounded-[2.5rem]">

                <div className="relative m-0 w-full h-72 flex items-center justify-center rounded-3xl overflow-hidden">
                    <Lottie
                    animationData={animationData}
                    loop={true}
                    autoplay={true}
                    className='w-full h-full'
                    />
                </div>

                <div className="space-y-4">
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Lost in the digital void?
                    </h1>
                    <p className="text-gray-500 text-base max-w-sm mx-auto leading-relaxed">
                        The page you're looking for doesn't exist or has been moved to another galaxy.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                        onClick={() => navigate('/')}
                        className="group relative px-10 py-4 bg-gray-900 text-white rounded-2xl font-medium overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-lg shadow-gray-200"
                    >
                        <span className="relative z-10">Back to Earth</span>
                        <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-sky-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>

                    <button
                        onClick={() => navigate(-1)}
                        className="px-10 py-4 bg-transparent text-gray-600 border border-gray-200 rounded-2xl font-medium transition-all hover:bg-gray-50 hover:border-gray-300 active:scale-95"
                    >
                        Go Back
                    </button>
                </div>

            </div>
        </div>
    );
};

export default NotFound;