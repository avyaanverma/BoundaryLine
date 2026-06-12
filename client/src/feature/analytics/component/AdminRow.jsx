function AdminRow({ admin }) {
    return (
        <tr className="border-t border-gray-800">
            <td className="px-6 py-5">
                <div className="flex items-center gap-3">
                    <img
                        src="https://i.pravatar.cc/40?img=1"
                        alt={admin.name}
                        className="w-10 h-10 rounded-full"
                    />

                    <div>
                        <h4 className="text-white font-medium">
                            {admin.name}
                        </h4>

                        <p className="text-gray-400 text-sm">
                            {admin.email}
                        </p>
                    </div>
                </div>
            </td>

            <td className="px-6 py-5">
                <span
                    className={`px-3 py-1 rounded-full text-sm ${admin.roleColor}`}
                >
                    {admin.role}
                </span>
            </td>

            <td className="px-6 py-5 text-gray-300">
                {admin.lastActive}
            </td>

            <td className="px-6 py-5">
                <div className="flex items-center gap-2">
                    <div
                        className={`w-2 h-2 rounded-full ${admin.status === "Active"
                            ? "bg-lime-400"
                            : "bg-gray-400"
                            }`}
                    />

                    <span className="text-gray-300">
                        {admin.status}
                    </span>
                </div>
            </td>

            <td className="px-6 py-5 text-right">
                <button className="border border-red-400 text-red-300 px-4 py-2 rounded-lg hover:bg-red-500/10">
                    Revoke Access
                </button>
            </td>
        </tr>
    );
}

export default AdminRow;