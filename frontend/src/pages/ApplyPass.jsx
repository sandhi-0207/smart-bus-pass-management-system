import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ApplyPass() {
    const navigate = useNavigate();

    const [studentName, setStudentName] = useState("");
    const [email, setEmail] = useState("");
    const [routeNumber, setRouteNumber] = useState("");
    const [passType, setPassType] = useState("Student");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:5000/api/applications",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        studentName,
                        email,
                        routeNumber,
                        passType
                    })
                }
            );

            const data = await response.json();

            console.log(data);

            if (response.ok) {
                alert(
                    `Application submitted successfully!\nApplication Number: ${data.application.applicationNumber}`
                );

                setStudentName("");
                setEmail("");
                setRouteNumber("");
                setPassType("Student");
            } else {
                alert(data.message);
            }

        } catch (error) {
            console.error("Application error:", error);
            alert("Unable to connect to server");
        }
    };

    return (
        <div className="apply-page">

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
                        BUS PASS SERVICE
                    </span>

                    <h1>Apply for Bus Pass</h1>

                    <p>
                        Submit your application online and get your
                        college bus pass easily.
                    </p>

                </div>

            </header>


            {/* Main */}
            <main className="apply-content">

                <div className="apply-layout">

                    {/* Information Card */}
                    <div className="apply-info-card">

                        <div className="apply-info-icon">
                            🎫
                        </div>

                        <h2>
                            Student Bus Pass
                        </h2>

                        <p>
                            Complete the application form with your
                            details and selected route.
                        </p>

                        <div className="apply-steps">

                            <div className="apply-step">
                                <span>01</span>
                                <div>
                                    <strong>
                                        Submit Application
                                    </strong>
                                    <small>
                                        Enter your student details
                                    </small>
                                </div>
                            </div>

                            <div className="apply-step">
                                <span>02</span>
                                <div>
                                    <strong>
                                        Application Review
                                    </strong>
                                    <small>
                                        Admin verifies your application
                                    </small>
                                </div>
                            </div>

                            <div className="apply-step">
                                <span>03</span>
                                <div>
                                    <strong>
                                        Get Your Pass
                                    </strong>
                                    <small>
                                        Access your digital bus pass
                                    </small>
                                </div>
                            </div>

                        </div>

                        <div className="apply-note">
                            💡 Make sure your email address is correct.
                        </div>

                    </div>


                    {/* Form Card */}
                    <div className="apply-form-card">

                        <div className="apply-form-header">

                            <div>
                                <h2>
                                    Application Details
                                </h2>

                                <p>
                                    Please provide the required
                                    information.
                                </p>
                            </div>

                            <span className="required-badge">
                                Required
                            </span>

                        </div>


                        <form onSubmit={handleSubmit}>

                            <div className="form-row">

                                <div className="modern-input-group">

                                    <label>
                                        Student Name
                                    </label>

                                    <div className="modern-input">

                                        <span>👤</span>

                                        <input
                                            type="text"
                                            value={studentName}
                                            onChange={(e) =>
                                                setStudentName(
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter your full name"
                                            required
                                        />

                                    </div>

                                </div>


                                <div className="modern-input-group">

                                    <label>
                                        Email Address
                                    </label>

                                    <div className="modern-input">

                                        <span>✉</span>

                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter your email"
                                            required
                                        />

                                    </div>

                                </div>

                            </div>


                            <div className="modern-input-group">

                                <label>
                                    Select Bus Route
                                </label>

                                <div className="modern-input">

                                    <span>🚌</span>

                                    <select
                                        value={routeNumber}
                                        onChange={(e) =>
                                            setRouteNumber(
                                                e.target.value
                                            )
                                        }
                                        required
                                    >
                                        <option value="">
    Select your route
</option>

<option value="R001">
    R001 - Chennai Central to S.A. Engineering College
</option>

<option value="R002">
    R002 - Tambaram to S.A. Engineering College
</option>

<option value="R003">
    R003 - Avadi to S.A. Engineering College
</option>

<option value="R004">
    R004 - Red Hills to S.A. Engineering College
</option>

<option value="R005">
    R005 - Guindy to S.A. Engineering College
</option>
                                    </select>

                                </div>

                            </div>


                            <div className="modern-input-group">

                                <label>
                                    Pass Type
                                </label>

                                <div className="modern-input">

                                    <span>🎫</span>

                                    <select
                                        value={passType}
                                        onChange={(e) =>
                                            setPassType(
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="Student">
                                            Student
                                        </option>
                                    </select>

                                </div>

                            </div>


                            <div className="application-summary">

                                <div>
                                    <span>Application Type</span>
                                    <strong>New Bus Pass</strong>
                                </div>

                                <div>
                                    <span>Applicant</span>
                                    <strong>
                                        {studentName || "Not entered"}
                                    </strong>
                                </div>

                            </div>


                            <button
                                type="submit"
                                className="submit-application-button"
                            >
                                Submit Application
                                <span>→</span>
                            </button>

                        </form>

                    </div>

                </div>

            </main>

        </div>
    );
}

export default ApplyPass;