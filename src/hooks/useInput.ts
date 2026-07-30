import { useState } from "react";

// custom hook for input
export const useInput = (initialState: string, callback?: () => void) => {

    const [value, setValue] = useState(initialState);

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(e.target.value);
        if (callback) {
            callback();
        }
    }

    const reset = () => {
        setValue("");
    }

    const fillInitialState = () => {
        setValue(initialState);
    }

    return {
        bind: {
            value,
            onChange,
        },
        value,
        setValue,
        reset,
        fillInitialState
    };
}