import { Routes, Route, Navigate } from "react-router-dom";
import RoutesPage from "./pages/Routes";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import ApplyPass from "./pages/ApplyPass";
import TrackApplication from "./pages/TrackApplication";
import DigitalPass from "./pages/DigitalPass";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminApplications from "./pages/AdminApplications";
import AdminBuses from "./pages/AdminBuses";
import AdminRoutes from "./pages/AdminRoutes";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/student-dashboard"
                element={<StudentDashboard />}
            />
            <Route
                path="/routes"
                element={<RoutesPage />}
            />

            <Route
                path="/apply-pass"
                element={<ApplyPass />}
            />

            <Route
                path="/track-application"
                element={<TrackApplication />}
            />

            <Route
                path="/digital-pass"
                element={<DigitalPass />}
            />

            <Route
                 path="/admin-login"
                 element={<AdminLogin />}
            />
            <Route
                 path="/admin-dashboard"
                 element={<AdminDashboard />}
            />

            <Route
                 path="/admin-applications"
                 element={<AdminApplications />}
            />

            <Route 
            path="/admin-buses" 
            element={<AdminBuses />}
            />

            <Route path="/admin-routes" 
            element={<AdminRoutes />}
            />

        </Routes>
    );
}

export default App;