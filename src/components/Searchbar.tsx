import { useInput } from '@/hooks/useInput';
import { Search } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react'
import { Card } from "@/components/ui/card";
import { useNavigate } from 'react-router';

type Props<T> = {
    data: T[];
    dataType: string;
    filterFunction: (items: T[], query: string) => T[];
    getId: (item: T) => string;
    renderItem: (item: T) => ReactNode;
}

const Searchbar = <T,>({ data, dataType, filterFunction, getId, renderItem }: Props<T>) => {

    const [showDropDown, setShowDropDown] = useState<boolean>(false);
    const searchQuery = useInput("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

    const filteredData = filterFunction(data, debouncedSearchQuery);

    const navigate = useNavigate();

    useEffect(() => {

        const id = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery.value);
        }, 500);

        return () => clearTimeout(id);

    }, [searchQuery.value])

    return (
        <div className="relative bg-white dark:bg-card rounded-xl border border-slate-100 dark:border-slate-700 px-4 py-2.5 flex items-center shadow-sm">
            <Search className="h-5 w-5 text-slate-400 dark:text-slate-300 mr-2" />
            <input
                {...searchQuery.bind}
                type="text"
                placeholder={`Search ${dataType}`}
                className="bg-transparent outline-none w-full text-sm text-slate-600 dark:text-slate-300"
                onFocus={() => {
                    setTimeout(() => {
                        setShowDropDown(true);
                    }, 100);
                }}
                onBlur={() => {
                    setTimeout(() => {
                        setShowDropDown(false);
                    }, 100);
                }}
            />
            {
                showDropDown &&
                <div className="absolute left-0 right-0 top-full mt-2 z-50">
                    <Card className="overflow-hidden p-2 bg-white dark:bg-card border border-slate-100 dark:border-slate-700 shadow-lg">
                        {filteredData.length === 0 ? (
                            <div className="py-4 px-3 text-center text-sm text-slate-500 dark:text-slate-400">{debouncedSearchQuery.trim() ? `No ${dataType} found for "${debouncedSearchQuery}"` : "Start Searching..."}</div>
                        ) : (
                            <div className="max-h-64 overflow-auto">
                                {filteredData.map((item) => {
                                    const itemId = getId(item);
                                    return (
                                        <div
                                            key={itemId}
                                            role="button"
                                            tabIndex={0}
                                            className="flex items-center gap-3 px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded cursor-pointer"
                                            onClick={() => navigate(`/${dataType}/${itemId}`)}
                                            onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/${dataType}/${itemId}`); }}
                                        >
                                            {renderItem(item)}
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </Card>
                </div>
            }
        </div>
    )
}

export default Searchbar