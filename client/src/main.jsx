
import { createRoot } from "react-dom/client"
import "./index.css";
import AnalyticsPage from './feature/analytics/pages/AnalyticsPage.jsx'
import PointsTable from "./feature/analytics/pages/PointsTable.jsx";

createRoot(document.getElementById('root')).render(
    <PointsTable />
)
