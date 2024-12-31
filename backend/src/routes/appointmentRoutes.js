const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

// Create a new appointment
router.post('/', appointmentController.createAppointment);

// Get all appointments
router.get('/', appointmentController.getAppointments);

// Update an existing appointment
router.put('/:id', appointmentController.updateAppointment);

// Cancel an appointment
router.delete('/:id', appointmentController.cancelAppointment);

module.exports = router;