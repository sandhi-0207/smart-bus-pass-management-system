import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
    const navigate = useNavigate();

    const [statistics, setStatistics] = useState({
        totalStudents: 0,
        pendingApplications: 0,
        activePasses: 0,
        activeBuses: 0
    });

    const [recentApplications, setRecentApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const adminUser = localStorage.getItem("adminUser");

        if (!adminUser) {
            navigate("/admin-login");
            return;
        }

        fetch("http://localhost:5000/api/admin/dashboard")
            .then((response) => response.json())
            .then((data) => {
                if (data.statistics) {
                    setStatistics(data.statistics);
                }

                if (data.recentApplications) {
                    setRecentApplications(data.recentApplications);
                }

                setLoading(false);
            })
            .catch((error) => {
                console.error("Dashboard fetch error:", error);
                setLoading(false);
            });
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("adminUser");
        navigate("/admin-login");
    };

    return (
        <div className="admin-dashboard">

            {/* Sidebar */}
            <aside className="admin-sidebar">

                <div className="admin-logo">
                    <div className="admin-logo-icon">🚌</div>
                    <div>
                        <h2>Smart Bus</h2>
                        <span>Admin Panel</span>
                    </div>
                </div>

                <nav className="admin-nav">

    <button
        className="admin-nav-item active"
        type="button"
    >
        <span>📊</span>
        Dashboard
    </button>

    <button
        className="admin-nav-item"
        type="button"
        onClick={() => navigate("/admin-applications")}
    >
        <span>📋</span>
        Applications
    </button>

    <button
        className="admin-nav-item"
        type="button"
        onClick={() => navigate("/admin-buses")}
    >
        <span>🚌</span>
        Buses
    </button>

    <button
        className="admin-nav-item"
        type="button"
        onClick={() => navigate("/admin-routes")}
    >
        <span>🛣️</span>
        Routes
    </button>

</nav>

                <button
                    className="admin-logout"
                    type="button"
                    onClick={handleLogout}
                >
                    <span>🚪</span>
                    Logout
                </button>

            </aside>


            {/* Main Content */}
            <main className="admin-main">

                <header className="admin-topbar">

                    <div>
                        <h1>Dashboard</h1>
                        <p>Welcome back, Administrator 👋</p>
                    </div>

                    <div className="admin-profile">
                        <div className="admin-avatar">
                            A
                        </div>

                        <div>
                            <strong>Administrator</strong>
                            <span>System Admin</span>
                        </div>
                    </div>

                </header>


                {loading ? (

                    <div className="admin-loading">
                        Loading dashboard data...
                    </div>

                ) : (

                    <>

                        {/* Statistics */}
                        <section className="admin-stats">

                            <div className="admin-stat-card">
                                <div className="stat-icon">👨‍🎓</div>

                                <div>
                                    <span>Total Students</span>
                                    <h2>{statistics.totalStudents}</h2>
                                </div>
                            </div>


                            <div className="admin-stat-card">
                                <div className="stat-icon">⏳</div>

                                <div>
                                    <span>Pending Applications</span>
                                    <h2>{statistics.pendingApplications}</h2>
                                </div>
                            </div>


                            <div className="admin-stat-card">
                                <div className="stat-icon">🎫</div>

                                <div>
                                    <span>Active Passes</span>
                                    <h2>{statistics.activePasses}</h2>
                                </div>
                            </div>


                            <div className="admin-stat-card">
                                <div className="stat-icon">🚌</div>

                                <div>
                                    <span>Active Buses</span>
                                    <h2>{statistics.activeBuses}</h2>
                                </div>
                            </div>

                        </section>


                        {/* Recent Applications */}
                        <section className="admin-section">

                            <div className="admin-section-header">
                                <div>
                                    <h2>Recent Applications</h2>
                                    <p>Latest bus pass applications</p>
                                </div>

                                <button
                                    className="admin-view-btn"
                                    type="button"
                                >
                                    View All
                                </button>
                            </div>


                            <div className="admin-table-container">

                                {recentApplications.length === 0 ? (

                                    <div className="admin-empty">
                                        No applications found.
                                    </div>

                                ) : (

                                    <table className="admin-table">

                                        <thead>
                                            <tr>
                                                <th>Application No.</th>
                                                <th>Student</th>
                                                <th>Email</th>
                                                <th>Route</th>
                                                <th>Pass Type</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>

                                        <tbody>

                                            {recentApplications.map((application) => (

                                                <tr key={application._id}>

                                                    <td>
                                                        <strong>
                                                            {application.applicationNumber}
                                                        </strong>
                                                    </td>

                                                    <td>
                                                        {application.studentName}
                                                    </td>

                                                    <td>
                                                        {application.email}
                                                    </td>

                                                    <td>
                                                        {application.routeNumber}
                                                    </td>

                                                    <td>
                                                        {application.passType}
                                                    </td>

                                                    <td>
                                                        <span
                                                            className={`status-badge ${application.status}`}
                                                        >
                                                            {application.status}
                                                        </span>
                                                    </td>

                                                </tr>

                                            ))}

                                        </tbody>

                                    </table>

                                )}

                            </div>

                        </section>


                        {/* Quick Actions */}
                        <section className="admin-section">

                            <div className="admin-section-header">

                                <div>
                                    <h2>Quick Actions</h2>
                                    <p>Manage your bus pass system</p>
                                </div>

                            </div>

                            <div className="quick-actions">

    <button
        type="button"
        onClick={() => navigate("/admin-applications")}
    >
        📋
        <span>Manage Applications</span>
    </button>

    <button
        type="button"
        onClick={() => navigate("/admin-buses")}
    >
        🚌
        <span>Manage Buses</span>
    </button>

    <button
        type="button"
        onClick={() => navigate("/admin-routes")}
    >
        🛣️
        <span>Manage Routes</span>
    </button>

</div>


                            

                        </section>

                    </>

                )}

            </main>

        </div>
    );
}

export default AdminDashboard;