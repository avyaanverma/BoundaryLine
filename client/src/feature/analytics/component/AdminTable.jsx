import AdminRow from "../component/AdminRow";

function AdminTable() {
    const admins = [
        {
            name: "Sarah Chen",
            email: "sarah@cricpulse.com",
            role: "System Architect",
            roleColor: "bg-green-900 text-green-300",
            lastActive: "2 mins ago",
            status: "Active",
        },
        {
            name: "Marcus Thorne",
            email: "m.thorne@cricpulse.com",
            role: "Moderator Lead",
            roleColor: "bg-red-900 text-red-300",
            lastActive: "14 hours ago",
            status: "Idle",
        },
        {
            name: "Elena Rodriguez",
            email: "e.rod@cricpulse.com",
            role: "Analyst",
            roleColor: "bg-lime-900 text-lime-300",
            lastActive: "3 days ago",
            status: "Active",
        },
    ];

    return (
        <>
            <table className="w-full">
                <thead>
                    <tr className="bg-[#202125] text-gray-400">
                        <th className="text-left px-6 py-4">Admin Name</th>
                        <th className="text-left px-6 py-4">Role</th>
                        <th className="text-left px-6 py-4">Last Active</th>
                        <th className="text-left px-6 py-4">Status</th>
                        <th className="text-right px-6 py-4">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {admins.map((admin) => (
                        <AdminRow
                            key={admin.email}
                            admin={admin}
                        />
                    ))}
                </tbody>
            </table>

            <div className="text-center py-5">
                <button className="text-green-300 hover:text-green-200">
                    View All 42 Administrators
                </button>
            </div>
        </>
    );
}

export default AdminTable;