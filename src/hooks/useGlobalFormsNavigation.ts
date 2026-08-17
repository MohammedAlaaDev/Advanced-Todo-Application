import { useEffect } from "react"

export const useGlobalFormsNavigation = () => {
    useEffect(() => {

        const handleNavigation = (e: KeyboardEvent) => {
            const targetIsField = e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement;
            if (e.key !== "Enter" || !targetIsField || e.shiftKey) return;

            const element = e.target as (HTMLInputElement | HTMLTextAreaElement);
            const form = element.closest("form") as HTMLFormElement;

            if (!form) return;

            const fields = Array.from(form.querySelectorAll<HTMLElement>("input, textarea"));

            const elementIdx = fields.indexOf(element);

            const isLastElement = elementIdx + 1 === fields.length;

            e.preventDefault();

            if (isLastElement) {
                fields[0].focus();
                form.requestSubmit();
            } else {
                fields[elementIdx + 1].focus();
            }

        }

        window.addEventListener("keydown", handleNavigation)

        return () => window.removeEventListener("keydown", handleNavigation);
    }, [])
}