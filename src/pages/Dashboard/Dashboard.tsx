// Dashboard Charts
import TasksActivityChart from "@/components/Dashboard/TasksActivityChart";
import TodoProgressChart from "@/components/Dashboard/TodoProgressChart";
import StatusCalendar from "@/components/Dashboard/StatusCalendar";
import TopMembersChart from "@/components/Dashboard/TopMembersChart";

// Components
import TasksList from "@/components/Tasks/TasksList";
const Dashboard = () => {

    return (
        <div className="animate-page">

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-6 gap-6 items-stretch mb-12">
                {/* Activity Graphic - Full width on LG, 2/3 on XL */}
                <div className="col-span-1 lg:col-span-2 xl:col-span-4">
                    <TasksActivityChart />
                </div>

                {/* Todo Progress - Half width on LG, 1/3 on XL */}
                <div className="col-span-1 lg:col-span-1 xl:col-span-2">
                    <TodoProgressChart />
                </div>

                {/* Status Calendar - Half width on LG, 1/2 on XL */}
                <div className="col-span-1 lg:col-span-1 xl:col-span-3">
                    <StatusCalendar />
                </div>

                {/* Top Members - Full width on LG, 1/2 on XL */}
                <div className="col-span-1 lg:col-span-2 xl:col-span-3">
                    <TopMembersChart />
                </div>
            </div>

            {/* Bottom Row: Recent Projects */}
            <TasksList />
        </div>                                                                                                 
    );
}
export default Dashboard;
