const { validationResult } = require('express-validator');
const { Reservation } = require('../models');

exports.createReservation = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { clientId, roomId, arrivalDate, departureDate } = req.body;
    const reservation = await Reservation.create({ clientId, roomId, arrivalDate, departureDate });
    res.status(201).json(reservation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateReservation = async (req, res) => {
  const { id } = req.params;
  const { clientId, roomId, arrivalDate, departureDate } = req.body;
  try {
    let reservation = await Reservation.findByPk(id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    reservation.clientId = clientId;
    reservation.roomId = roomId;
    reservation.arrivalDate = arrivalDate;
    reservation.departureDate = departureDate;
    await reservation.save();
    res.json(reservation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteReservation = async (req, res) => {
  const { id } = req.params;
  try {
    const reservation = await Reservation.findByPk(id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    await reservation.destroy();
    res.json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

