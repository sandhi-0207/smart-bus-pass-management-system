import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:5000/api/users/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password,
                        role: "student"
                    })
                }
            );

            const data = await response.json();

            console.log(data);

            if (response.ok) {
                alert("Registration successful!");
                navigate("/login");
            } else {
                alert(data.message);
            }

        } catch (error) {
            console.error("Registration error:", error);
            alert("Unable to connect to server");
        }
    };

    return (
        <div className="login-page">

            {/* Left Side */}
            <div className="login-hero">

                <div className="hero-content">

                    <div className="bus-logo">
                        🚌
                    </div>

                    <h1>
                        Join Smart Bus
                        <span>Pass Management</span>
                    </h1>

                    <p>
                        Create your student account and manage
                        your college bus pass easily online.
                    </p>

                    <div className="feature-list">

                        <div className="feature-item">
                            <span>✓</span>
                            <div>
                                <strong>Quick Registration</strong>
                                <small>
                                    Create your account in seconds
                                </small>
                            </div>
                        </div>

                        <div className="feature-item">
                            <span>✓</span>
                            <div>
                                <strong>Apply Online</strong>
                                <small>
                                    Submit your bus pass application
                                </small>
                            </div>
                        </div>

                        <div className="feature-item">
                            <span>✓</span>
                            <div>
                                <strong>Digital Pass</strong>
                                <small>
                                    Access your bus pass digitally
                                </small>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

            {/* Right Side */}
            <div className="login-section">

                <div className="login-card">

                    <div className="login-card-header">

                        <div className="small-bus-icon">
                            🚌
                        </div>

                        <h2>Create Account</h2>

                        <p>
                            Register as a student
                        </p>

                    </div>

                    <form onSubmit={handleRegister}>

                        <div className="input-group">

                            <label>Full Name</label>

                            <div className="input-wrapper">

                                <span>👤</span>

                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) =>
                                        setName(e.target.value)
                                    }
                                    placeholder="Enter your full name"
                                    required
                                />

                            </div>

                        </div>

                        <div className="input-group">

                            <label>Email Address</label>

                            <div className="input-wrapper">

                                <span>✉</span>

                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    placeholder="Enter your email"
                                    required
                                />

                            </div>

                        </div>

                        <div className="input-group">

                            <label>Password</label>

                            <div className="input-wrapper">

                                <span>🔒</span>

                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="Create a password"
                                    required
                                />

                            </div>

                        </div>

                        <button
                            type="submit"
                            className="login-button"
                        >
                            Create Account
                            <span>→</span>
                        </button>

                    </form>

                    <div className="register-text">

                        Already have an account?

                        <Link to="/login">
                            Login
                        </Link>

                    </div>

                </div>

                <p className="copyright">
                    © 2026 Smart Bus Pass Management System
                </p>

            </div>

        </div>
    );
}

export default Register;