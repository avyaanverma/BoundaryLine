import { Bell } from "lucide-react";

function NotifyButton({ className = "" }) {
    return (
        <button
            className={`p-2 rounded-full bg-[#282a2d] text-[#e2e2e6] hover:bg-[#94d5a5] hover:text-[#00391c] transition-all group-hover:scale-110 ${className}`}
        >
            <Bell className="w-5 h-5" />
        </button>
    );
};

export default NotifyButton

