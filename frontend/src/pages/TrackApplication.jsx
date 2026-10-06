import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TrackApplication() {
    const navigate = useNavigate();

    const [applicationNumber, setApplicationNumber] = useState("");
    const [application, setApplication] = useState(null);
    const [error, setError] = useState("");

    const handleTrack = async (e) => {
        e.preventDefault();

        setApplication(null);
        setError("");

        try {
            const response = await fetch(
                `http://localhost:5000/api/applications/${applicationNumber}`
            );

            const data = await response.json();

            console.log(data);

            if (response.ok) {
                setApplication(data.application);
            } else {
                setError(data.message);
            }

        } catch (error) {
            console.error("Tracking error:", error);
            setError("Unable to connect to server");
        }
    };

    return (
        <div className="track-page">

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
                        APPLICATION SERVICE
                    </span>

                    <h1>Track Application</h1>

                    <p>
                        Check the current status of your bus pass
                        application.
                    </p>

                </div>

            </header>


            {/* Main */}
            <main className="track-content">

                {/* Search Card */}
                <div className="track-search-card">

                    <div className="track-search-icon">
                        🔎
                    </div>

                    <div className="track-search-heading">
                        <h2>Find Your Application</h2>

                        <p>
                            Enter your application number to view
                            your application details.
                        </p>
                    </div>

                    <form onSubmit={handleTrack}>

                        <div className="track-input-wrapper">

                            <span>🎫</span>

                            <input
                                type="text"
                                value={applicationNumber}
                                onChange={(e) =>
                                    setApplicationNumber(
                                        e.target.value
                                    )
                                }
                                placeholder="Enter application number"
                                required
                            />

                        </div>

                        <button
                            type="submit"
                            className="track-button"
                        >
                            Track Application
                            <span>→</span>
                        </button>

                    </form>

                    <div className="track-example">
                        Example: APP1790834659399
                    </div>

                </div>


                {/* Error */}
                {error && (
                    <div className="track-error">

                        <span>⚠️</span>

                        <div>
                            <strong>
                                Application Not Found
                            </strong>

                            <p>
                                {error}
                            </p>
                        </div>

                    </div>
                )}


                {/* Application Result */}
                {application && (

                    <div className="application-result">

                        <div className="result-header">

                            <div>
                                <span>
                                    APPLICATION FOUND
                                </span>

                                <h2>
                                    {application.applicationNumber}
                                </h2>
                            </div>

                            <div
                                className={`application-status ${application.status}`}
                            >
                                <span>●</span>

                                {application.status
                                    .charAt(0)
                                    .toUpperCase() +
                                    application.status.slice(1)}
                            </div>

                        </div>


                        <div className="result-divider"></div>


                        <div className="application-details-grid">

                            <div className="application-detail">

                                <span>Student Name</span>

                                <strong>
                                    {application.studentName}
                                </strong>

                            </div>

                            <div className="application-detail">

                                <span>Email</span>

                                <strong>
                                    {application.email}
                                </strong>

                            </div>

                            <div className="application-detail">

                                <span>Route Number</span>

                                <strong>
                                    {application.routeNumber}
                                </strong>

                            </div>

                            <div className="application-detail">

                                <span>Pass Type</span>

                                <strong>
                                    {application.passType}
                                </strong>

                            </div>

                            <div className="application-detail">

                                <span>Application Date</span>

                                <strong>
                                    {new Date(
                                        application.applicationDate
                                    ).toLocaleDateString()}
                                </strong>

                            </div>

                            <div className="application-detail">

                                <span>Status</span>

                                <strong className="status-text">
                                    {application.status
                                        .charAt(0)
                                        .toUpperCase() +
                                        application.status.slice(1)}
                                </strong>

                            </div>

                        </div>


                        {/* Status Message */}
                        <div
                            className={`status-message ${application.status}`}
                        >

                            <div className="status-message-icon">
                                {application.status === "approved"
                                    ? "✓"
                                    : application.status === "rejected"
                                        ? "!"
                                        : "⏳"}
                            </div>

                            <div>

                                <strong>
                                    {application.status === "approved"
                                        ? "Application Approved"
                                        : application.status === "rejected"
                                            ? "Application Rejected"
                                            : "Application Under Review"}
                                </strong>

                                <p>
                                    {application.status === "approved"
                                        ? "Your bus pass application has been approved."
                                        : application.status === "rejected"
                                            ? "Your bus pass application has been rejected."
                                            : "Your application has been submitted successfully and is currently waiting for review."}
                                </p>

                            </div>

                        </div>


                        {application.status === "approved" && (

                            <button
                                className="digital-pass-button"
                                onClick={() =>
                                    navigate("/digital-pass")
                                }
                            >
                                View Digital Pass →
                            </button>

                        )}

                    </div>

                )}

            </main>

        </div>
    );
}

export default TrackApplication;