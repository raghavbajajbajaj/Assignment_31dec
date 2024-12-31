import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div>
            <h1>Welcome to the Appointment Management System</h1>
            <p>Efficiently manage your appointments with our seamless scheduling and rescheduling features.</p>
            <h2>Features:</h2>
            <ul>
                <li>Automatic Detection of Missed Appointments</li>
                <li>Dynamic Slot Finder for Rescheduling</li>
                <li>Notification System for Patients</li>
                <li>Quick Rebooking Management</li>
                <li>Conflict Resolution to Avoid Double-Booking</li>
            </ul>
            <Link to="/appointments">Manage Appointments</Link>
        </div>
    );
};

export default HomePage;