// React
import { useEffect, useState } from 'react';

// State Management & Hooks
import { useSelector } from 'react-redux';
import { selectMembers } from '@/features/members/membersSlice';
import { useInput } from '@/hooks/useInput';
import { useQueryParam } from '@/hooks/useQueryParam';

// UI & Icons
import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Components & Features
import MembersList from '@/features/members/components/MembersList';
import RecentMembersCards from '@/features/members/components/RecentMembersCards';
import MembersSearchDropdown from '@/features/members/components/MembersSearchDropdown';

const Members = () => {

    const { openModal } = useQueryParam();

    const members = useSelector(selectMembers);

    const searchQuery = useInput("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

    const [showDropDown, setShowDropDown] = useState<boolean>(false);

    useEffect(() => {

        const id = setTimeout(() => {
            console.log(searchQuery.value);
            setDebouncedSearchQuery(searchQuery.value);
        }, 500);

        return () => clearTimeout(id);

    }, [searchQuery.value])

    const filteredMembers = members.filter((mem) => {
        return mem.personalDetails.name?.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
    })

    return (
        <div className="space-y-12 animate-page">
            {/* Search Header */}
            <div className="relative bg-white dark:bg-card rounded-xl border border-slate-100 dark:border-slate-700 px-4 py-2.5 flex items-center shadow-sm">
                <Search className="h-5 w-5 text-slate-400 dark:text-slate-300 mr-2" />
                <input
                    {...searchQuery.bind}
                    type="text"
                    placeholder="Search Member"
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
                    <MembersSearchDropdown members={filteredMembers} query={debouncedSearchQuery} />
                }
            </div>

            {/* Recent Members */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-[#111827] dark:text-slate-200">Recent Members</h2>
                <RecentMembersCards />
            </section>

            {/* All Members Section */}
            <section className="space-y-6">
                <MembersList />
            </section>

            <Button
                onClick={() => {
                    openModal("add-member");
                }}
                className="sticky bottom-4 left-4 z-40 p-4 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all flex items-center justify-center">
                <Plus className="h-6 w-6 text-white" />
            </Button>

        </div>
    );
};

export default Members;
