const express = require('express');
const router = express.Router();
const Manager = require('../models/Manager');

// Create a new Manager
router.post('/add', async (req, res) => {
    try {
        const { name, email, contact, department, country } = req.body;

        //check if contact is a number
        if (isNaN(contact)) {
            return res.status(400).json({ error: 'Contact must be a number' });
        }

        const newManager = new Manager({ name, email, contact, department, country });
        await newManager.save();
        res.json('Manager added');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get all Managers
router.get('/', async (req, res) => {
    try {
        const managers = await Manager.find();
        res.json(managers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Update a Manager by ID
router.put('/update/:id', async (req, res) => {
    try {
        const managerId = req.params.id;
        const { name, email, contact, department } = req.body;

        // Check if contact is a number
        if (isNaN(contact)) {
            return res.status(400).json({ error: 'Contact must be a number' });
        }

        const updateManager = { name, email, contact, department };
        const updatedManager = await Manager.findByIdAndUpdate(managerId, updateManager, { new: true });
        if (!updatedManager) {
            return res.status(404).json({ error: 'Manager not found' });
        }
        res.json({ status: 'Manager Updated', manager: updatedManager });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete a Manager by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const managerId = req.params.id;
        const deletedManager = await Manager.findByIdAndRemove(managerId);
        if (!deletedManager) {
            return res.status(404).json({ error: 'Manager not found' });
        }
        res.json({ status: 'Manager Deleted', manager: deletedManager });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get a Manager by ID
router.get('/get/:id', async (req, res) => {
    try {
        const managerId = req.params.id;
        const manager = await Manager.findById(managerId);
        if (!manager) {
            return res.status(404).json({ error: 'Manager not found' });
        }
        res.json(manager);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
