import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router'

import { useQueryParam } from '@/hooks/useQueryParam'
import { type DropdownOption } from '@/components/Dropdown'
import type { ReactNode } from 'react';

interface RecentCardsProps<T> {
    recentData: T[];
    dataType: string;
    shape?: string;
    dropdownOptions: DropdownOption[];
    title: string;
    deleteModalKey: string;
    openModalKey: string;
    renderItem: (item: T, options: DropdownOption[], handleAction: (id: string, action: string) => void, shape?: string) => ReactNode;
}

const RecentCards = <T,>({ recentData, title, openModalKey, dataType, shape, dropdownOptions, deleteModalKey, renderItem }: RecentCardsProps<T>) => {

    const { openModal, openItemModal } = useQueryParam();

    const navigate = useNavigate();

    const handleAction = (id: string, key: string) => {
        if (key === "view") {
            navigate(`/${dataType}/${id}`);
        }

        if (key === "delete") {
            openItemModal(id, deleteModalKey);
        }
    }

    return (
        <>
            <h2 className="text-2xl font-bold text-[#111827] dark:text-slate-200">{title}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {
                    recentData.map((item: T) => {
                        return renderItem(item, dropdownOptions, handleAction, shape)
                    })
                }
                {
                    Array.from({ length: 3 - recentData.length }).map((_, idx) => (
                        <div key={idx} className={`relative ${shape}`}>
                            <Button onClick={() => openModal(openModalKey)} className="w-full p-6 shadow-sm bg-primary/30 hover:bg-primary/50 transition-all flex items-center justify-center h-full rounded-3xl">
                                <div className="h-11 w-11 rounded-full bg-white text-primary shadow-sm flex items-center justify-center hover:bg-slate-100">
                                    <Plus className="h-5 w-5" />
                                </div>
                            </Button>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default RecentCards