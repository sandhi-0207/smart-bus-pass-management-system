import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminApplications() {
    const navigate = useNavigate();

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState("");

    const fetchApplications = async () => {
        try {
            setLoading(true);

            const response = await fetch(
                "http://localhost:5000/api/applications/admin/all"
            );

            const data = await response.json();

            if (response.ok) {
                setApplications(data.applications || []);
            }

        } catch (error) {
            console.error("Failed to fetch applications:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const adminUser = localStorage.getItem("adminUser");

        if (!adminUser) {
            navigate("/admin-login");
            return;
        }

        fetchApplications();
    }, [navigate]);

    const updateStatus = async (applicationNumber, status) => {
        try {
            setUpdating(applicationNumber);

            const response = await fetch(
                `http://localhost:5000/api/applications/admin/${applicationNumber}/status`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ status })
                }
            );

            const data = await response.json();

            if (response.ok) {
                setApplications((currentApplications) =>
                    currentApplications.map((application) =>
                        application.applicationNumber === applicationNumber
                            ? data.application
                            : application
                    )
                );
            } else {
                alert(data.message || "Failed to update application");
            }

        } catch (error) {
            console.error("Status update error:", error);
            alert("Something went wrong");
        } finally {
            setUpdating("");
        }
    };

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
        className="admin-nav-item"
        type="button"
        onClick={() => navigate("/admin-dashboard")}
    >
        <span>📊</span>
        Dashboard
    </button>

    <button
        className="admin-nav-item active"
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


            {/* Main */}
            <main className="admin-main">

                <header className="admin-topbar">

                    <div>
                        <h1>Applications</h1>
                        <p>Review and manage student bus pass applications</p>
                    </div>

                    <button
                        className="admin-view-btn"
                        type="button"
                        onClick={fetchApplications}
                    >
                        ↻ Refresh
                    </button>

                </header>


                <section className="admin-section">

                    <div className="admin-section-header">

                        <div>
                            <h2>All Applications</h2>

                            <p>
                                {applications.length} application
                                {applications.length !== 1 ? "s" : ""} found
                            </p>
                        </div>

                    </div>


                    {loading ? (

                        <div className="admin-loading">
                            Loading applications...
                        </div>

                    ) : applications.length === 0 ? (

                        <div className="admin-empty">
                            No applications found.
                        </div>

                    ) : (

                        <div className="admin-table-container">

                            <table className="admin-table">

                                <thead>
                                    <tr>
                                        <th>Application No.</th>
                                        <th>Student</th>
                                        <th>Email</th>
                                        <th>Route</th>
                                        <th>Pass Type</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {applications.map((application) => (

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
                                                {new Date(
                                                    application.applicationDate
                                                ).toLocaleDateString()}
                                            </td>

                                            <td>
                                                <span
                                                    className={`status-badge ${application.status}`}
                                                >
                                                    {application.status}
                                                </span>
                                            </td>

                                            <td>

                                                {application.status === "pending" ? (

                                                    <div className="application-actions">

                                                        <button
                                                            className="approve-btn"
                                                            type="button"
                                                            disabled={
                                                                updating ===
                                                                application.applicationNumber
                                                            }
                                                            onClick={() =>
                                                                updateStatus(
                                                                    application.applicationNumber,
                                                                    "approved"
                                                                )
                                                            }
                                                        >
                                                            ✓ Approve
                                                        </button>

                                                        <button
                                                            className="reject-btn"
                                                            type="button"
                                                            disabled={
                                                                updating ===
                                                                application.applicationNumber
                                                            }
                                                            onClick={() =>
                                                                updateStatus(
                                                                    application.applicationNumber,
                                                                    "rejected"
                                                                )
                                                            }
                                                        >
                                                            ✕ Reject
                                                        </button>

                                                    </div>

                                                ) : (

                                                    <span className="action-completed">
                                                        Completed
                                                    </span>

                                                )}

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    )}

                </section>

            </main>

        </div>
    );
}

export default AdminApplications;