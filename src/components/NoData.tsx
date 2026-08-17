import Lottie from "lottie-react"
import type { NoDataProps } from "@/types"

const NoData = ({ setAddOpen, animationData, message, image = false, src }: NoDataProps) => {

    return (
        <div
            onClick={() => {
                setAddOpen?.(true);
            }}
            className="cursor-pointer flex flex-col items-center justify-center w-60 mx-auto border-2 border-dotted border-primary rounded-4xl">
            <div className="h-25 w-25">
                {
                    image ?
                        <div className="flex items-center justify-center mt-4 animate-up-down">
                            <img src={src} className="w-20 h-20" />
                        </div>
                        :
                        <div className="relative">
                            <Lottie
                                animationData={animationData}
                                loop={true}
                            />
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[calc(100%+50px)] h-2 bg-white dark:bg-card transition-all rounded-full"></div>
                        </div>
                }
            </div>
            <p className="text-primary text-center text-sm mb-5">{message}</p>
        </div>
    )
}

export default NoData