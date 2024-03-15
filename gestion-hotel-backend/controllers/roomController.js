const { Room } = require('../models/room.js');

exports.createRoom = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { number, type, price, status } = req.body;
    const room = await Room.create({ number, type, price, status });
    res.status(201).json(room);
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({ message: 'Failed to create room' });
  }
};

exports.updateRoom = async (req, res) => {
  const { id } = req.params;
  const { number, type, price, status } = req.body;
  try {
    let room = await Room.findByPk(id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    room.number = number;
    room.type = type;
    room.price = price;
    room.status = status;
    await room.save();
    res.json(room);
  } catch (error) {
    console.error('Error updating room:', error);
    res.status(500).json({ message: 'Failed to update room' });
  }
};

exports.deleteRoom = async (req, res) => {
  const { id } = req.params;
  try {
    const room = await Room.findByPk(id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    await room.destroy();
    res.json({ message: 'Room deleted successfully' });
  } catch (error) {
    console.error('Error deleting room:', error);
    res.status(500).json({ message: 'Failed to delete room' });
  }
};
