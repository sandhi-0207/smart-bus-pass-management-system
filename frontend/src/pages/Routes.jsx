import { useEffect, useState } from "react";

function Routes() {

    const [routes, setRoutes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetch("http://localhost:5000/api/routes")
            .then((response) => response.json())
            .then((data) => {
                setRoutes(data.routes || []);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Failed to fetch routes:", error);
                setLoading(false);
            });

    }, []);

    return (
        <div className="routes-page">

            {/* Header */}
            <header className="inner-page-header">

                <div className="inner-nav">

                    <div className="inner-logo">
                        🚌
                        <span>Smart Bus Pass</span>
                    </div>

                    <a
                        href="/student-dashboard"
                        className="back-button"
                    >
                        ← Dashboard
                    </a>

                </div>

                <div className="inner-header-content">

                    <span className="page-label">
                        TRANSPORTATION
                    </span>

                    <h1>Bus Routes</h1>

                    <p>
                        Explore available college bus routes,
                        stops and travel information.
                    </p>

                </div>

            </header>


            {/* Main Content */}
            <main className="routes-content">

                <div className="section-heading">

                    <div>
                        <h2>Available Routes</h2>

                        <p>
                            Select a route to view its complete
                            journey and stops.
                        </p>
                    </div>

                    <div className="route-count">
                        {routes.length} Routes Available
                    </div>

                </div>


                {/* Loading */}
                {loading && (
                    <div className="route-card-modern">
                        <h3>Loading routes...</h3>
                    </div>
                )}


                {/* Routes */}
                {!loading && routes.map((route) => (

                    <div
                        className="route-card-modern"
                        key={route._id}
                    >

                        {/* Route Card Top */}
                        <div className="route-card-top">

                            <div>

                                <div className="route-number">
                                    {route.routeNumber}
                                </div>

                                <h3>
                                    {route.routeName}
                                </h3>

                                <p>
                                    {route.startPoint} → {route.endPoint}
                                </p>

                            </div>

                            <span className="active-badge">
                                ● {route.status}
                            </span>

                        </div>


                        {/* Journey */}
                        <div className="journey">

                            <div className="journey-point">

                                <div className="point-icon">
                                    📍
                                </div>

                                <div>
                                    <small>START POINT</small>

                                    <strong>
                                        {route.startPoint}
                                    </strong>
                                </div>

                            </div>


                            <div className="journey-line">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>


                            <div className="journey-point">

                                <div className="point-icon destination">
                                    🎓
                                </div>

                                <div>
                                    <small>END POINT</small>

                                    <strong>
                                        {route.endPoint}
                                    </strong>
                                </div>

                            </div>

                        </div>


                        {/* Route Information */}
                        <div className="route-info-grid">

                            <div className="route-info-item">

                                <span className="route-info-icon">
                                    📏
                                </span>

                                <div>
                                    <small>Distance</small>

                                    <strong>
                                        {route.distance}
                                    </strong>
                                </div>

                            </div>


                            <div className="route-info-item">

                                <span className="route-info-icon">
                                    🚏
                                </span>

                                <div>
                                    <small>Total Stops</small>

                                    <strong>
                                        {route.stops.length} Stops
                                    </strong>
                                </div>

                            </div>


                            <div className="route-info-item">

                                <span className="route-info-icon">
                                    🎫
                                </span>

                                <div>
                                    <small>Pass Type</small>

                                    <strong>
                                        Student
                                    </strong>
                                </div>

                            </div>

                        </div>


                        {/* Stops */}
                        <div className="stops-section">

                            <h4>
                                Route Stops
                            </h4>

                            <div className="stops-list">

                                {route.stops.map((stop, index) => (

                                    <div
                                        className="stop"
                                        key={index}
                                    >

                                        <span>
                                            {String(index + 1).padStart(2, "0")}
                                        </span>

                                        <strong>
                                            {stop}
                                        </strong>

                                    </div>

                                ))}

                            </div>

                        </div>


                        {/* Footer */}
                        <div className="route-card-footer">

                            <span>
                                🚌 College Transport
                            </span>

                            <span>
                                Available for students
                            </span>

                        </div>

                    </div>

                ))}

            </main>

        </div>
    );
}

export default Routes;