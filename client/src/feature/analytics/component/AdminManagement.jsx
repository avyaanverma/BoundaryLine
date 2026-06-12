import { Search, UserPlus } from "lucide-react";
import AdminTable from "../component/AdminTable";

function AdminManagement() {
    return (
        <div className="bg-[#18191d] border border-gray-700 rounded-xl overflow-hidden mt-6">
            <div className="p-6 flex justify-between items-start">
                <div>
                    <h2 className="text-3xl font-semibold text-white">
                        Admin Management
                    </h2>

                    <p className="text-gray-400 text-sm mt-1">
                        Manage system administrators and their specific access rights.
                    </p>
                </div>

                <div className="flex gap-4">
                    <div className="relative">
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            placeholder="Search admins..."
                            className="bg-[#1f2125] border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white outline-none"
                        />
                    </div>

                    <button className="flex items-center gap-2 bg-lime-500 hover:bg-lime-600 px-5 py-3 rounded-lg font-medium text-black">
                        <UserPlus size={18} />
                        Add Admin
                    </button>
                </div>
            </div>

            <AdminTable />
        </div>
    );
}

export default AdminManagement;