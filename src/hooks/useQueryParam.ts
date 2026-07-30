import { useSearchParams } from "react-router";

export interface QueryParam {
    modalKey?: string;
    id?: string;
    openModal?: (key: string) => void;
    closeModal?: () => void;
    openItemModal?: (id: string, key: string) => void;
    closeItemModal?: () => void;
}

export const useQueryParam = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const openModal = (key: string) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("modal", key);
        setSearchParams(newParams);
    };


    const closeModal = () => {
        const newParams = new URLSearchParams(searchParams);
        newParams.delete("modal");
        setSearchParams(newParams);
    };

    const openItemModal = (id: string | null, key: string) => {
        const newParams = new URLSearchParams(searchParams);
        if (id) {
            newParams.set("id", id);
        }
        newParams.set("modal", key);
        setSearchParams(newParams);
    };

    const closeItemModal = () => {
        const newParams = new URLSearchParams(searchParams);
        newParams.delete("modal");
        newParams.delete("id");
        setSearchParams(newParams);
    };

    const modalKey = searchParams.get("modal");
    const id = searchParams.get("id");

    return { modalKey, id, openModal, closeModal, openItemModal, closeItemModal };
};