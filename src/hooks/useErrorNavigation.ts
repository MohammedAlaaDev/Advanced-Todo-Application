import { useCallback, useEffect, useState } from "react";

export const useErrorNavigation = (errorKey: number) => {

    const [formElement, setFormElement] = useState<HTMLFormElement | null>(null);

    const formRef = useCallback((form: HTMLFormElement | null) => {
        if (form) {
            setFormElement(form);
        }
    }, [])

    useEffect(() => {
        const container = formElement;
        const errorElement = container?.querySelector(".input-error");
        errorElement?.scrollIntoView({
            behavior: "smooth",
            block: "center",
        })
    }, [formElement, errorKey])
    return formRef;
}