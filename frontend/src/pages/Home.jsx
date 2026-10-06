import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <div className="home-page">

            {/* NAVBAR */}
            <header className="home-navbar">

                <div className="home-logo">
                    <div className="home-logo-icon">
                        🚌
                    </div>

                    <div>
                        <strong>Smart Bus Pass</strong>
                        <span>Management System</span>
                    </div>
                </div>

                <nav className="home-nav">

                    <a href="#home">
                        Home
                    </a>

                    <a href="#about">
                        About
                    </a>

                    <button
                        className="nav-login"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>

                    <button
                        className="nav-register"
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </button>

                </nav>

            </header>


            {/* HERO */}
            <section
                className="home-hero"
                id="home"
            >

                <div className="hero-left">

                    <span className="home-badge">
                        🚌 SMART COLLEGE TRANSPORT
                    </span>

                    <h1>
                        Your Bus Pass,
                        <span> Made Simple.</span>
                    </h1>

                    <p>
                        Apply, track and manage your college bus
                        pass online with our smart and convenient
                        bus pass management system.
                    </p>

                    <div className="hero-buttons">

                        <button
                            className="hero-primary-button"
                            onClick={() => navigate("/register")}
                        >
                            Get Started
                            <span>→</span>
                        </button>

                        <button
                            className="hero-secondary-button"
                            onClick={() => navigate("/login")}
                        >
                            Login to Account
                        </button>

                    </div>

                    <div className="hero-trust">

                        <div>
                            <strong>Easy</strong>
                            <span>Application</span>
                        </div>

                        <div>
                            <strong>Fast</strong>
                            <span>Tracking</span>
                        </div>

                        <div>
                            <strong>Digital</strong>
                            <span>Bus Pass</span>
                        </div>

                    </div>

                </div>


                <div className="hero-right">

                    <div className="hero-circle"></div>

                    <div className="hero-bus-card">

                        <div className="floating-card top-card">
                            🎫
                            <div>
                                <strong>Digital Pass</strong>
                                <small>Always accessible</small>
                            </div>
                        </div>

                        <div className="bus-illustration">
                            🚌
                        </div>

                        <div className="floating-card bottom-card">
                            ✓
                            <div>
                                <strong>Application Approved</strong>
                                <small>Your pass is ready</small>
                            </div>
                        </div>

                    </div>

                </div>

            </section>


            {/* FEATURES */}
            <section className="home-features">

                <div className="home-section-heading">

                    <span>WHY SMART BUS PASS?</span>

                    <h2>
                        Everything you need in one place
                    </h2>

                    <p>
                        Manage your complete bus pass journey
                        quickly and easily.
                    </p>

                </div>


                <div className="feature-cards">

                    <div className="home-feature-card">

                        <div className="feature-icon">
                            🎫
                        </div>

                        <h3>
                            Easy Application
                        </h3>

                        <p>
                            Apply for your college bus pass
                            online without paperwork.
                        </p>

                    </div>


                    <div className="home-feature-card">

                        <div className="feature-icon">
                            🔎
                        </div>

                        <h3>
                            Track Application
                        </h3>

                        <p>
                            Check your application status
                            anytime using your application number.
                        </p>

                    </div>


                    <div className="home-feature-card">

                        <div className="feature-icon">
                            📱
                        </div>

                        <h3>
                            Digital Pass
                        </h3>

                        <p>
                            Access your digital bus pass and
                            QR code directly from your account.
                        </p>

                    </div>

                </div>

            </section>


            {/* ABOUT */}
            <section
                className="home-about"
                id="about"
            >

                <div className="about-visual">

                    <div className="about-circle">
                        🚌
                    </div>

                    <div className="about-small-card">
                        <strong>Smart</strong>
                        <span>College Transport</span>
                    </div>

                </div>


                <div className="about-content">

                    <span>ABOUT THE SYSTEM</span>

                    <h2>
                        A smarter way to manage
                        college bus passes.
                    </h2>

                    <p>
                        Smart Bus Pass Management System is a
                        digital platform designed to simplify the
                        process of applying for, tracking and
                        managing student bus passes.
                    </p>

                    <p>
                        Students can register, select their route,
                        submit applications, track approval status
                        and access their digital bus pass from one
                        convenient platform.
                    </p>

                    <div className="about-points">

                        <div>
                            ✓ Online application
                        </div>

                        <div>
                            ✓ Application tracking
                        </div>

                        <div>
                            ✓ Digital QR bus pass
                        </div>

                        <div>
                            ✓ Easy route access
                        </div>

                    </div>

                </div>

            </section>


            {/* HOW IT WORKS */}
            <section className="how-section">

                <div className="home-section-heading">

                    <span>HOW IT WORKS</span>

                    <h2>
                        Get your bus pass in 3 simple steps
                    </h2>

                </div>


                <div className="steps-container">

                    <div className="home-step">

                        <div className="step-number">
                            01
                        </div>

                        <h3>
                            Create Account
                        </h3>

                        <p>
                            Register your student account
                            using your basic details.
                        </p>

                    </div>


                    <div className="step-line"></div>


                    <div className="home-step">

                        <div className="step-number">
                            02
                        </div>

                        <h3>
                            Apply for Pass
                        </h3>

                        <p>
                            Select your bus route and submit
                            your bus pass application.
                        </p>

                    </div>


                    <div className="step-line"></div>


                    <div className="home-step">

                        <div className="step-number">
                            03
                        </div>

                        <h3>
                            Get Digital Pass
                        </h3>

                        <p>
                            Once approved, access your digital
                            pass and QR code.
                        </p>

                    </div>

                </div>

            </section>


            {/* CTA */}
            <section className="home-cta">

                <div>

                    <span>
                        READY TO GET STARTED?
                    </span>

                    <h2>
                        Manage your bus pass smarter.
                    </h2>

                    <p>
                        Create your student account today.
                    </p>

                </div>

                <button
                    onClick={() => navigate("/register")}
                >
                    Create Account →
                </button>

            </section>


            {/* FOOTER */}
            <footer className="home-footer">

                <div className="footer-brand">

                    <div className="home-logo-icon">
                        🚌
                    </div>

                    <div>
                        <strong>
                            Smart Bus Pass
                        </strong>

                        <span>
                            Management System
                        </span>
                    </div>

                </div>

                <p>
                    © 2026 Smart Bus Pass Management System
                </p>

            </footer>

        </div>
    );
}

export default Home;