import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';

const AppointmentScheduler = () => {
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [formData, setFormData] = useState({
        patientId: '',
        doctorId: '',
        appointmentTime: '',
    });

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        const data = await apiService.fetchAppointments();
        setAppointments(data);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedAppointment) {
            await apiService.updateAppointment(selectedAppointment._id, formData);
        } else {
            await apiService.createAppointment(formData);
        }
        fetchAppointments();
        resetForm();
    };

    const resetForm = () => {
        setFormData({ patientId: '', doctorId: '', appointmentTime: '' });
        setSelectedAppointment(null);
    };

    const handleEdit = (appointment) => {
        setSelectedAppointment(appointment);
        setFormData({
            patientId: appointment.patientId,
            doctorId: appointment.doctorId,
            appointmentTime: appointment.appointmentTime,
        });
    };

    const handleDelete = async (id) => {
        await apiService.cancelAppointment(id);
        fetchAppointments();
    };

    return (
        <div>
            <h2>Appointment Scheduler</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="patientId"
                    value={formData.patientId}
                    onChange={handleInputChange}
                    placeholder="Patient ID"
                    required
                />
                <input
                    type="text"
                    name="doctorId"
                    value={formData.doctorId}
                    onChange={handleInputChange}
                    placeholder="Doctor ID"
                    required
                />
                <input
                    type="datetime-local"
                    name="appointmentTime"
                    value={formData.appointmentTime}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">{selectedAppointment ? 'Update' : 'Schedule'} Appointment</button>
                <button type="button" onClick={resetForm}>Cancel</button>
            </form>
            <h3>Scheduled Appointments</h3>
            <ul>
                {appointments.map((appointment) => (
                    <li key={appointment._id}>
                        {`Patient ID: ${appointment.patientId}, Doctor ID: ${appointment.doctorId}, Time: ${appointment.appointmentTime}`}
                        <button onClick={() => handleEdit(appointment)}>Edit</button>
                        <button onClick={() => handleDelete(appointment._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AppointmentScheduler;