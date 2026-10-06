import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:5000/api/users/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            console.log(data);

            if (!response.ok) {
                alert(data.message);
                return;
            }

            if (data.user.role !== "admin") {
                alert("Access denied. Admin account required.");
                return;
            }

            localStorage.setItem(
                "adminUser",
                JSON.stringify(data.user)
            );

            alert("Admin login successful!");

            navigate("/admin-dashboard");

        } catch (error) {
            console.error("Admin login error:", error);
            alert("Unable to connect to server");
        }
    };

    return (
        <div className="admin-login-page">

            <div className="admin-login-left">

                <div className="admin-brand">
                    <div className="admin-brand-icon">
                        🚌
                    </div>

                    <div>
                        <strong>Smart Bus Pass</strong>
                        <span>Management System</span>
                    </div>
                </div>

                <div className="admin-login-hero">

                    <span className="admin-label">
                        ADMINISTRATOR PORTAL
                    </span>

                    <h1>
                        Manage your
                        <span>transport system.</span>
                    </h1>

                    <p>
                        Manage students, applications, routes,
                        buses and digital bus passes from one
                        centralized administration portal.
                    </p>

                    <div className="admin-features">

                        <div>
                            <span>✓</span>
                            <div>
                                <strong>Application Management</strong>
                                <small>
                                    Review and process student applications
                                </small>
                            </div>
                        </div>

                        <div>
                            <span>✓</span>
                            <div>
                                <strong>Bus & Route Management</strong>
                                <small>
                                    Manage college transportation details
                                </small>
                            </div>
                        </div>

                        <div>
                            <span>✓</span>
                            <div>
                                <strong>Digital Pass Management</strong>
                                <small>
                                    Approve and manage student bus passes
                                </small>
                            </div>
                        </div>

                    </div>

                </div>

            </div>


            <div className="admin-login-right">

                <div className="admin-login-card">

                    <div className="admin-card-icon">
                        🔐
                    </div>

                    <div className="admin-card-heading">

                        <span>ADMIN PORTAL</span>

                        <h2>
                            Welcome Back
                        </h2>

                        <p>
                            Login to access the administration dashboard.
                        </p>

                    </div>


                    <form onSubmit={handleLogin}>

                        <div className="admin-input-group">

                            <label>
                                Admin Email
                            </label>

                            <div className="admin-input">

                                <span>✉</span>

                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    placeholder="Enter admin email"
                                    required
                                />

                            </div>

                        </div>


                        <div className="admin-input-group">

                            <label>
                                Password
                            </label>

                            <div className="admin-input">

                                <span>🔒</span>

                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="Enter password"
                                    required
                                />

                            </div>

                        </div>


                        <button
                            type="submit"
                            className="admin-login-button"
                        >
                            Login to Admin Portal
                            <span>→</span>
                        </button>

                    </form>


                    <button
                        type="button"
                        className="back-to-student"
                        onClick={() => navigate("/login")}
                    >
                        ← Back to Student Login
                    </button>

                </div>


                <p className="admin-copyright">
                    © 2026 Smart Bus Pass Management System
                </p>

            </div>

        </div>
    );
}

export default AdminLogin;