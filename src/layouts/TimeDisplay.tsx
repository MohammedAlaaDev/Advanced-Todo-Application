import { useTimeContext } from "@/contexts/time/TimeProvider";
import { format } from "date-fns";
import { useEffect, useState } from "react";

const TimeDisplay = () => {

    const { timeFormat } = useTimeContext();

    const [currentTime, setCurrentTime] = useState(new Date());

    const timeIn12 = format(currentTime, "hh:mm:ss a");
    const timeIn24 = format(currentTime, "HH:mm:ss");

    

    useEffect(() => {
        const idx = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000)

        return () => clearInterval(idx);
    }, [])

    return (
        <div className="text-muted-foreground text-sm mt-1">
            {timeFormat === "12" ? timeIn12 : timeIn24}
        </div>
    )
}

export default TimeDisplay