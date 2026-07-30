import type { InputErrorProps } from "@/types";

const InputError = ({ message, className }: InputErrorProps) => {
    if (!message) return null;

    return (
        <p className={`${className || ""} animate-shake text-red-500 text-[13px] font-medium selection:bg-red-100 input-error`
        }>
            {message}
        </p >
    );
}
export default InputError;
