const express = require('express');
const router = express.Router();
const Support = require('../models/Support');

// Create a new support
router.post('/add', async (req, res) => {
  try {
    const { ticketId, reply } = req.body;
    const newSupport = new Support({ ticketId, reply });
    await newSupport.save();
    res.json('Support added');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all supports
router.get('/', async (req, res) => {
  try {
    const supports = await Support.find();
    res.json(supports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a support by ID
router.put('/update/:id', async (req, res) => {
  try {
    const supportId = req.params.id;
    const { reply } = req.body;
    const updateSupport = { reply };
    const updatedSupport = await Support.findByIdAndUpdate(
      supportId,
      updateSupport,
      { new: true }
    );
    if (!updatedSupport) {
      return res.status(404).json({ error: 'Support not found' });
    }
    res.json({ status: 'Support Updated', support: updatedSupport });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a support by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const supportId = req.params.id;
    const deletedSupport = await Support.findByIdAndRemove(supportId);
    if (!deletedSupport) {
      return res.status(404).json({ error: 'Support not found' });
    }
    res.json({ status: 'Support Deleted', support: deletedSupport });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
