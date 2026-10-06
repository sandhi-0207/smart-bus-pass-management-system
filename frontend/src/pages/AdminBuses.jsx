import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminBuses() {
    const navigate = useNavigate();

    const [buses, setBuses] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const [form, setForm] = useState({
        busNumber: "",
        busName: "",
        registrationNumber: "",
        capacity: "",
        status: "active"
    });

    const fetchBuses = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/api/buses"
            );

            const data = await response.json();

            if (response.ok) {
                setBuses(data.buses || []);
            }
        } catch (error) {
            console.error("Failed to fetch buses:", error);
        }
    };

    useEffect(() => {
        const adminUser = localStorage.getItem("adminUser");

        if (!adminUser) {
            navigate("/admin-login");
            return;
        }

        fetchBuses();
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
                "http://localhost:5000/api/buses",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        ...form,
                        capacity: Number(form.capacity)
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {
                alert("Bus added successfully");

                setForm({
                    busNumber: "",
                    busName: "",
                    registrationNumber: "",
                    capacity: "",
                    status: "active"
                });

                setShowForm(false);
                fetchBuses();
            } else {
                alert(data.message || "Failed to add bus");
            }
        } catch (error) {
            console.error("Add bus error:", error);
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
        type="button"
        onClick={() => navigate("/admin-dashboard")}
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
        className="admin-nav-item active"
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


            <main className="admin-main">

                <header className="admin-topbar">

                    <div>
                        <h1>Bus Management</h1>
                        <p>Manage buses used in the bus pass system</p>
                    </div>

                    <button
                        className="admin-view-btn"
                        type="button"
                        onClick={() => setShowForm(!showForm)}
                    >
                        {showForm ? "Close" : "+ Add Bus"}
                    </button>

                </header>


                {showForm && (
                    <section className="admin-section">

                        <div className="admin-section-header">
                            <div>
                                <h2>Add New Bus</h2>
                                <p>Enter the bus details</p>
                            </div>
                        </div>

                        <form
                            className="admin-bus-form"
                            onSubmit={handleSubmit}
                        >

                            <input
                                type="text"
                                name="busNumber"
                                placeholder="Bus Number"
                                value={form.busNumber}
                                onChange={handleChange}
                                required
                            />

                            <input
                                type="text"
                                name="busName"
                                placeholder="Bus Name"
                                value={form.busName}
                                onChange={handleChange}
                                required
                            />

                            <input
                                type="text"
                                name="registrationNumber"
                                placeholder="Registration Number"
                                value={form.registrationNumber}
                                onChange={handleChange}
                                required
                            />

                            <input
                                type="number"
                                name="capacity"
                                placeholder="Capacity"
                                value={form.capacity}
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
                                Add Bus
                            </button>

                        </form>

                    </section>
                )}


                <section className="admin-section">

                    <div className="admin-section-header">

                        <div>
                            <h2>Bus List</h2>
                            <p>{buses.length} buses found</p>
                        </div>

                        <button
                            className="admin-view-btn"
                            type="button"
                            onClick={fetchBuses}
                        >
                            ↻ Refresh
                        </button>

                    </div>


                    <div className="admin-table-container">

                        {buses.length === 0 ? (

                            <div className="admin-empty">
                                No buses found.
                            </div>

                        ) : (

                            <table className="admin-table">

                                <thead>
                                    <tr>
                                        <th>Bus Number</th>
                                        <th>Bus Name</th>
                                        <th>Registration No.</th>
                                        <th>Capacity</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {buses.map((bus) => (

                                        <tr key={bus._id}>

                                            <td>
                                                <strong>
                                                    {bus.busNumber}
                                                </strong>
                                            </td>

                                            <td>{bus.busName}</td>

                                            <td>
                                                {bus.registrationNumber}
                                            </td>

                                            <td>{bus.capacity}</td>

                                            <td>
                                                <span
                                                    className={`status-badge ${
                                                        bus.status === "active"
                                                            ? "approved"
                                                            : "rejected"
                                                    }`}
                                                >
                                                    {bus.status}
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

export default AdminBuses;