const { validationResult } = require('express-validator');
const { Supplier } = require('../models');

exports.createSupplier = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, contactPerson, email, phone } = req.body;
    const supplier = await Supplier.create({ name, contactPerson, email, phone });
    res.status(201).json(supplier);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateSupplier = async (req, res) => {
  const { id } = req.params;
  const { name, contactPerson, email, phone } = req.body;
  try {
    let supplier = await Supplier.findByPk(id);
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    supplier.name = name;
    supplier.contactPerson = contactPerson;
    supplier.email = email;
    supplier.phone = phone;
    await supplier.save();
    res.json(supplier);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteSupplier = async (req, res) => {
  const { id } = req.params;
  try {
    const supplier = await Supplier.findByPk(id);
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    await supplier.destroy();
    res.json({ message: 'Supplier deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

