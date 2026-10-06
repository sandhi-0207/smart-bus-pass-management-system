import { useNavigate } from "react-router-dom";

function StudentDashboard() {
    const navigate = useNavigate();

    return (
        <div className="dashboard-page">

            <header className="dashboard-header">

                <div className="dashboard-nav">
                    <div className="dashboard-logo">
                        🚌
                        <span>Smart Bus Pass</span>
                    </div>

                <button
    type="button"
    className="logout-button"
    onClick={() => {
        localStorage.removeItem("user");
        navigate("/login");
    }}
>
    Logout
</button>
                </div>

                <div className="dashboard-hero-content">
                    <p className="welcome-small">
                        STUDENT PORTAL
                    </p>

                    <h1>
                        Welcome back, Student! 👋
                    </h1>

                    <p>
                        Manage your bus pass, routes and applications
                        from one place.
                    </p>
                </div>

            </header>

            <main className="dashboard-content">

                <div className="dashboard-title">
                    <div>
                        <h2>Student Dashboard</h2>
                        <p>
                            Everything you need for your college bus pass.
                        </p>
                    </div>
                </div>

                <div className="dashboard-grid">

                    <div className="dashboard-card">
                        <div className="dashboard-card-icon">
                            🗺️
                        </div>

                        <h3>Bus Routes</h3>

                        <p>
                            Explore available bus routes, stops and
                            route information.
                        </p>

                        <button
                            className="dashboard-button"
                            onClick={() => navigate("/routes")}
                        >
                            View Routes →
                        </button>
                    </div>


                    <div className="dashboard-card">
                        <div className="dashboard-card-icon">
                            🎫
                        </div>

                        <h3>Apply for Bus Pass</h3>

                        <p>
                            Submit a new application for your college
                            bus pass.
                        </p>

                        <button
                            className="dashboard-button"
                            onClick={() => navigate("/apply-pass")}
                        >
                            Apply Now →
                        </button>
                    </div>


                    <div className="dashboard-card">
                        <div className="dashboard-card-icon">
                            🔎
                        </div>

                        <h3>Track Application</h3>

                        <p>
                            Check the current status of your bus pass
                            application.
                        </p>

                        <button
                            className="dashboard-button"
                            onClick={() =>
                                navigate("/track-application")
                            }
                        >
                            Track Now →
                        </button>
                    </div>


                    <div className="dashboard-card">
                        <div className="dashboard-card-icon">
                            🎟️
                        </div>

                        <h3>Digital Bus Pass</h3>

                        <p>
                            View your digital bus pass and pass details.
                        </p>

                        <button
                            className="dashboard-button"
                            onClick={() => navigate("/digital-pass")}
                        >
                            View Pass →
                        </button>
                    </div>

                </div>

                <div className="dashboard-info">

                    <div className="info-icon">
                        💡
                    </div>

                    <div>
                        <h3>Quick Tip</h3>

                        <p>
                            Keep your application number safe. You can
                            use it anytime to track your bus pass status.
                        </p>
                    </div>

                </div>

            </main>

        </div>
    );
}

export default StudentDashboard;