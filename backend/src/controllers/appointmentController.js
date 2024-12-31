class AppointmentController {
    constructor(AppointmentModel, NotificationService) {
        this.AppointmentModel = AppointmentModel;
        this.NotificationService = NotificationService;
    }

    async createAppointment(req, res) {
        try {
            const appointment = new this.AppointmentModel(req.body);
            await appointment.save();
            res.status(201).json(appointment);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAppointments(req, res) {
        try {
            const appointments = await this.AppointmentModel.find();
            res.status(200).json(appointments);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateAppointment(req, res) {
        try {
            const { id } = req.params;
            const updatedAppointment = await this.AppointmentModel.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedAppointment) {
                return res.status(404).json({ message: 'Appointment not found' });
            }
            res.status(200).json(updatedAppointment);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async cancelAppointment(req, res) {
        try {
            const { id } = req.params;
            const canceledAppointment = await this.AppointmentModel.findByIdAndDelete(id);
            if (!canceledAppointment) {
                return res.status(404).json({ message: 'Appointment not found' });
            }
            await this.NotificationService.sendCancellationNotification(canceledAppointment);
            res.status(200).json({ message: 'Appointment canceled successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default AppointmentController; 