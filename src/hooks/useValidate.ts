import { useState } from "react";

export const useValidate = <T,>() => {
    const [error, setError] = useState<T|null>(null);
    const [shakeKey, setShakeKey] = useState<number>(0);

    const validate = (data: any, schema: any, onSuccess?: () => void) => {
        const validationResult = schema.safeParse(data);
        if (!validationResult.success) {
            const errors = validationResult.error.format();
            setShakeKey(pre => pre + 1);
            setError(errors);
            return false;
        } else {
            setError(null);
            onSuccess?.();
            return true;
        }
    }

    return { error,shakeKey, setError, setShakeKey, validate }

}