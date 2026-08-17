import type { MemberObject } from '@/features/members/types';
import type { DropdownOption } from '@/components/Dropdown';
import { formatDate } from 'date-fns';
import Dropdown from '@/components/Dropdown';

const RecentMemberItem = (
    member: MemberObject,
    options: DropdownOption[],
    handleAction: (id: string, action: string) => void,
    shape?: string
) => {
    const createdDate = formatDate(member.createdAt, "dd/MM/yyyy")
    return (
        <div key={member.id} className={`relative group ${shape} overflow-hidden`}>
            <div
                className="bg-white dark:bg-card p-6 shadow-sm border-none hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <img className='size-12 rounded-full' src={member.avatar} />
                        <span className="font-semibold text-slate-700 dark:text-slate-200">{member.personalDetails.name || 'Member'}</span>
                    </div>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 font-semibold tracking-wider">
                    <span>Joined {createdDate}</span>
                    <Dropdown
                        options={options}
                        handleChoose={(key) => {
                            handleAction(member.id, key);
                        }}
                    />
                </div>
            </div>
            <div className="glow transition-all group-hover:shadow-[0_0_320px_50px] group-hover:shadow-primary bg-transparent absolute right-0 bottom-0"></div>
        </div>
    )
}

export default RecentMemberItem;