
import TopNav from '../features/fixtures/components/NavBar/TopBar';
import Sidebar from '../features/fixtures/components/NavBar/SideBar'
import { Outlet } from 'react-router';
import { Footer } from '../features/fixtures/components/Footer';


const MainLayout = () => {
    return (
        <div className="min-h-screen bg-[#111316] text-[#e2e2e6] w-full">
            <TopNav />

            <div className="pt-20 flex w-full">
                <div className="w-[285px]">
                    <Sidebar />
                </div>

                <div className="min-h-screen w-[81%] flex flex-col items-start">
                    <Outlet />
                    <Footer />
                </div>
            </div>
        </div>

    )
}

export default MainLayout
