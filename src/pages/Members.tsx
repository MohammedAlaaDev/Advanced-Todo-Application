// React

// State Management & Hooks
import { useSelector } from 'react-redux';
import { selectMembers } from '@/features/members/membersSlice';
import { useQueryParam } from '@/hooks/useQueryParam';

// UI & Icons
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Components & Features
import MembersList from '@/features/members/components/MembersList';
import RecentCards from '@/components/RecentCards';
import Searchbar from '@/components/Searchbar';
import type { DropdownOption } from '@/components/Dropdown';
import SearchMemberItem from '@/features/members/components/SearchMemberItem';
import RecentMemberItem from '@/features/members/components/RecentMemberItem';

// types
import type { MemberObject } from '@/features/members/types';

const dropdownOptions: DropdownOption[] = [
    {
        key: "view",
        text: "View Profile",
    },
    {
        key: "delete",
        text: "Delete Member",
        color: "text-red-500",
    }
]

const Members = () => {

    const { openModal } = useQueryParam();

    const members = useSelector(selectMembers);

    const recentMembers = members.length > 0 ? members.slice(-3) : [];

    const getId = (m: MemberObject) => m.id;

    const filterFunction = (data: MemberObject[], debouncedQuery: string) => {
        return data.filter((item) => {
            return item.personalDetails.name?.toLowerCase().includes(debouncedQuery.toLowerCase());
        })
    }

    return (
        <div className="space-y-12 animate-page">
            {/* Search Header */}
            <Searchbar
                filterFunction={filterFunction}
                data={members}
                renderItem={SearchMemberItem}
                getId={getId}
                dataType="members"
            />

            {/* Recent Members */}
            <section className="space-y-6">
                <RecentCards
                    recentData={recentMembers}
                    title="Recent Members"
                    dataType="members"
                    openModalKey="add-member"
                    deleteModalKey="delete-member"
                    dropdownOptions={dropdownOptions}
                    renderItem={RecentMemberItem}
                />
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
