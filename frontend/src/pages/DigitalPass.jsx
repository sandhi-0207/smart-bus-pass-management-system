import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

function DigitalPass() {
    const navigate = useNavigate();

    const [busPass, setBusPass] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBusPass = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));

if (!user || !user.email) {
    setError("Student login information not found");
    setLoading(false);
    return;
}

const response = await fetch(
    `http://localhost:5000/api/buspasses/student/${encodeURIComponent(user.email)}`
);

                const data = await response.json();

                if (response.ok) {
                    setBusPass(data.busPass);
                } else {
                    setError(data.message);
                }

            } catch (error) {
                console.error("Bus pass error:", error);
                setError("Unable to connect to server");
            } finally {
                setLoading(false);
            }
        };

        fetchBusPass();
    }, []);

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    if (loading) {
        return (
            <div className="digital-page">
                <div className="pass-loading">
                    <div className="loading-icon">🚌</div>
                    <h2>Loading Digital Pass...</h2>
                    <p>Please wait while we fetch your bus pass.</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="digital-page">

                <div className="pass-error">

                    <div className="error-icon">
                        ⚠️
                    </div>

                    <h2>Bus Pass Not Found</h2>

                    <p>{error}</p>

                    <button
                        onClick={() =>
                            navigate("/student-dashboard")
                        }
                    >
                        ← Back to Dashboard
                    </button>

                </div>

            </div>
        );
    }

    const qrData = `
Smart Bus Pass
Pass Number: ${busPass.passNumber}
Student: ${busPass.studentName}
Application: ${busPass.applicationNumber}
Route: ${busPass.routeNumber}
Pass Type: ${busPass.passType}
Status: ${busPass.status}
Expiry: ${formatDate(busPass.expiryDate)}
`;

    return (
        <div className="digital-page">

            {/* Header */}
            <header className="inner-page-header">

                <div className="inner-nav">

                    <div className="inner-logo">
                        🚌
                        <span>Smart Bus Pass</span>
                    </div>

                    <button
                        className="back-button"
                        onClick={() =>
                            navigate("/student-dashboard")
                        }
                    >
                        ← Dashboard
                    </button>

                </div>

                <div className="inner-header-content">

                    <span className="page-label">
                        DIGITAL PASS
                    </span>

                    <h1>My Digital Bus Pass</h1>

                    <p>
                        Your student bus pass is ready to use.
                    </p>

                </div>

            </header>


            {/* Main */}
            <main className="digital-content">

                <div className="pass-container">

                    {/* Digital Pass */}
                    <div className="smart-pass">

                        <div className="pass-top">

                            <div className="pass-brand">

                                <div className="pass-logo">
                                    🚌
                                </div>

                                <div>
                                    <span>
                                        SMART BUS
                                    </span>

                                    <strong>
                                        STUDENT PASS
                                    </strong>
                                </div>

                            </div>

                            <div className="pass-active">
                                ● {busPass.status.toUpperCase()}
                            </div>

                        </div>


                        <div className="pass-divider"></div>


                        <div className="pass-main">

                            <div className="student-section">

                                <span className="pass-label">
                                    STUDENT NAME
                                </span>

                                <h2>
                                    {busPass.studentName}
                                </h2>

                                <div className="pass-details-grid">

                                    <div>
                                        <span className="pass-label">
                                            PASS NUMBER
                                        </span>

                                        <strong>
                                            {busPass.passNumber}
                                        </strong>
                                    </div>

                                    <div>
                                        <span className="pass-label">
                                            PASS TYPE
                                        </span>

                                        <strong>
                                            {busPass.passType}
                                        </strong>
                                    </div>

                                    <div>
                                        <span className="pass-label">
                                            ROUTE
                                        </span>

                                        <strong>
                                            {busPass.routeNumber}
                                        </strong>
                                    </div>

                                    <div>
                                        <span className="pass-label">
                                            APPLICATION
                                        </span>

                                        <strong>
                                            {busPass.applicationNumber}
                                        </strong>
                                    </div>

                                </div>

                            </div>


                            {/* REAL QR CODE */}
                            <div className="qr-section">

                                <div className="qr-box">

                                    <QRCodeCanvas
                                        value={qrData}
                                        size={115}
                                        bgColor="#ffffff"
                                        fgColor="#111827"
                                        level="H"
                                    />

                                </div>

                                <small>
                                    Scan to verify
                                </small>

                            </div>

                        </div>


                        <div className="pass-bottom">

                            <div>
                                <span>
                                    ISSUE DATE
                                </span>

                                <strong>
                                    {formatDate(
                                        busPass.issueDate
                                    )}
                                </strong>
                            </div>

                            <div>
                                <span>
                                    EXPIRY DATE
                                </span>

                                <strong>
                                    {formatDate(
                                        busPass.expiryDate
                                    )}
                                </strong>
                            </div>

                            <div className="pass-route">
                                🚌 {busPass.routeNumber}
                            </div>

                        </div>

                    </div>


                    {/* Information */}
                    <div className="pass-info">

                        <div className="pass-info-item">

                            <div className="pass-info-icon">
                                ✓
                            </div>

                            <div>
                                <strong>
                                    Valid Student Pass
                                </strong>

                                <p>
                                    This pass is currently active
                                    and valid for travel.
                                </p>
                            </div>

                        </div>


                        <div className="pass-info-item">

                            <div className="pass-info-icon">
                                📱
                            </div>

                            <div>
                                <strong>
                                    Keep It Accessible
                                </strong>

                                <p>
                                    Show this digital pass when
                                    boarding the college bus.
                                </p>
                            </div>

                        </div>

                    </div>


                    <button
                        className="pass-dashboard-button"
                        onClick={() =>
                            navigate("/student-dashboard")
                        }
                    >
                        ← Back to Dashboard
                    </button>

                </div>

            </main>

        </div>
    );
}

export default DigitalPass;