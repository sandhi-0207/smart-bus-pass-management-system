import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
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

            if (response.ok) {
    localStorage.setItem("user", JSON.stringify(data.user));

    alert("Login successful!");
    navigate("/student-dashboard");
} else {
    alert(data.message);
}

        } catch (error) {
            console.error("Login error:", error);
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
                        Smart Bus
                        <span>Pass Management</span>
                    </h1>

                    <p>
                        A simple and smart way to manage your
                        college bus pass, routes and applications.
                    </p>

                    <div className="feature-list">

                        <div className="feature-item">
                            <span>✓</span>
                            <div>
                                <strong>Digital Bus Pass</strong>
                                <small>Access your pass anytime</small>
                            </div>
                        </div>

                        <div className="feature-item">
                            <span>✓</span>
                            <div>
                                <strong>Easy Application</strong>
                                <small>Apply for your pass online</small>
                            </div>
                        </div>

                        <div className="feature-item">
                            <span>✓</span>
                            <div>
                                <strong>Track Application</strong>
                                <small>Check your application status</small>
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

                        <h2>Welcome Back!</h2>

                        <p>
                            Login to your student account
                        </p>

                    </div>

                    <form onSubmit={handleLogin}>

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
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="login-button"
                        >
                            Login
                            <span>→</span>
                        </button>

                    </form>

                    <div className="register-text">
                        Don't have an account?
                        <Link to="/register">
                            Create Account
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

export default Login;