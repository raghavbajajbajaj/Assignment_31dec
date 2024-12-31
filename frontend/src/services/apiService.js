import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

export const fetchAppointments = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/appointments`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching appointments: ' + error.message);
    }
};

export const createAppointment = async (appointmentData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/appointments`, appointmentData);
        return response.data;
    } catch (error) {
        throw new Error('Error creating appointment: ' + error.message);
    }
};

export const updateAppointment = async (appointmentId, appointmentData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/appointments/${appointmentId}`, appointmentData);
        return response.data;
    } catch (error) {
        throw new Error('Error updating appointment: ' + error.message);
    }
};

export const cancelAppointment = async (appointmentId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/appointments/${appointmentId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error canceling appointment: ' + error.message);
    }
};