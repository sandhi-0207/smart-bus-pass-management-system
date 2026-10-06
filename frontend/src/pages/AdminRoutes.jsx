import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminRoutes() {
    const navigate = useNavigate();

    const [routes, setRoutes] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const [form, setForm] = useState({
        routeName: "",
        routeNumber: "",
        startPoint: "",
        endPoint: "",
        stops: "",
        distance: "",
        status: "active"
    });

    const fetchRoutes = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/api/routes"
            );

            const data = await response.json();

            if (response.ok) {
                setRoutes(data.routes || []);
            }
        } catch (error) {
            console.error("Failed to fetch routes:", error);
        }
    };

    useEffect(() => {
        const adminUser = localStorage.getItem("adminUser");

        if (!adminUser) {
            navigate("/admin-login");
            return;
        }

        fetchRoutes();
    }, [navigate]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:5000/api/routes",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        ...form,
                        stops: form.stops
                            .split(",")
                            .map((stop) => stop.trim())
                            .filter(Boolean)
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {
                alert("Route added successfully");

                setForm({
                    routeName: "",
                    routeNumber: "",
                    startPoint: "",
                    endPoint: "",
                    stops: "",
                    distance: "",
                    status: "active"
                });

                setShowForm(false);
                fetchRoutes();
            } else {
                alert(data.message || "Failed to add route");
            }
        } catch (error) {
            console.error("Add route error:", error);
            alert("Something went wrong");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("adminUser");
        navigate("/admin-login");
    };

    return (
        <div className="admin-dashboard">

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
                        onClick={() => navigate("/admin-dashboard")}
                    >
                        <span>📊</span>
                        Dashboard
                    </button>

                    <button
                        className="admin-nav-item"
                        onClick={() => navigate("/admin-applications")}
                    >
                        <span>📋</span>
                        Applications
                    </button>

                    <button
                        className="admin-nav-item"
                        onClick={() => navigate("/admin-buses")}
                    >
                        <span>🚌</span>
                        Buses
                    </button>

                    <button className="admin-nav-item active">
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

            <main className="admin-main">

                <header className="admin-topbar">

                    <div>
                        <h1>Route Management</h1>
                        <p>Manage routes used in the bus pass system</p>
                    </div>

                    <button
                        className="admin-view-btn"
                        type="button"
                        onClick={() => setShowForm(!showForm)}
                    >
                        {showForm ? "Close" : "+ Add Route"}
                    </button>

                </header>

                {showForm && (
                    <section className="admin-section">

                        <div className="admin-section-header">
                            <div>
                                <h2>Add New Route</h2>
                                <p>Enter the route details</p>
                            </div>
                        </div>

                        <form
                            className="admin-bus-form"
                            onSubmit={handleSubmit}
                        >

                            <input
                                type="text"
                                name="routeName"
                                placeholder="Route Name"
                                value={form.routeName}
                                onChange={handleChange}
                                required
                            />

                            <input
                                type="text"
                                name="routeNumber"
                                placeholder="Route Number"
                                value={form.routeNumber}
                                onChange={handleChange}
                                required
                            />

                            <input
                                type="text"
                                name="startPoint"
                                placeholder="Start Point"
                                value={form.startPoint}
                                onChange={handleChange}
                                required
                            />

                            <input
                                type="text"
                                name="endPoint"
                                placeholder="End Point"
                                value={form.endPoint}
                                onChange={handleChange}
                                required
                            />

                            <input
                                type="text"
                                name="stops"
                                placeholder="Stops (comma separated)"
                                value={form.stops}
                                onChange={handleChange}
                            />

                            <input
                                type="text"
                                name="distance"
                                placeholder="Distance (e.g. 12 km)"
                                value={form.distance}
                                onChange={handleChange}
                                required
                            />

                            <select
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>

                            <button
                                className="approve-btn"
                                type="submit"
                            >
                                Add Route
                            </button>

                        </form>

                    </section>
                )}

                <section className="admin-section">

                    <div className="admin-section-header">

                        <div>
                            <h2>Route List</h2>
                            <p>{routes.length} routes found</p>
                        </div>

                        <button
                            className="admin-view-btn"
                            type="button"
                            onClick={fetchRoutes}
                        >
                            ↻ Refresh
                        </button>

                    </div>

                    <div className="admin-table-container">

                        {routes.length === 0 ? (

                            <div className="admin-empty">
                                No routes found.
                            </div>

                        ) : (

                            <table className="admin-table">

                                <thead>
                                    <tr>
                                        <th>Route No.</th>
                                        <th>Route Name</th>
                                        <th>Start</th>
                                        <th>End</th>
                                        <th>Stops</th>
                                        <th>Distance</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {routes.map((route) => (

                                        <tr key={route._id}>

                                            <td>
                                                <strong>
                                                    {route.routeNumber}
                                                </strong>
                                            </td>

                                            <td>{route.routeName}</td>

                                            <td>{route.startPoint}</td>

                                            <td>{route.endPoint}</td>

                                            <td>
                                                {route.stops?.join(", ")}
                                            </td>

                                            <td>{route.distance}</td>

                                            <td>
                                                <span
                                                    className={`status-badge ${
                                                        route.status === "active"
                                                            ? "approved"
                                                            : "rejected"
                                                    }`}
                                                >
                                                    {route.status}
                                                </span>
                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        )}

                    </div>

                </section>

            </main>

        </div>
    );
}

export default AdminRoutes;