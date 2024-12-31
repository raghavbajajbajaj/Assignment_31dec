const findAvailableSlots = (doctorSchedule, appointmentDuration) => {
    const availableSlots = [];
    const appointmentDurationInMinutes = appointmentDuration; // Assuming duration is in minutes

    for (let i = 0; i < doctorSchedule.length; i++) {
        const currentSlot = doctorSchedule[i];
        const startTime = new Date(currentSlot.start);
        const endTime = new Date(currentSlot.end);

        // Check if the slot is long enough for the appointment
        const slotDuration = (endTime - startTime) / (1000 * 60); // Convert milliseconds to minutes
        if (slotDuration >= appointmentDurationInMinutes) {
            availableSlots.push({
                start: currentSlot.start,
                end: new Date(startTime.getTime() + appointmentDurationInMinutes * 60000).toISOString() // Add duration in milliseconds
            });
        }
    }

    return availableSlots;
};

module.exports = findAvailableSlots;