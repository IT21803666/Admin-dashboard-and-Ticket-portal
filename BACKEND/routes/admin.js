const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');

// Create a new Admin
router.post('/add', async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const newAdmin = new Admin({ email, password, name });
        await newAdmin.save();
        res.json('Admin added');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get all Admins
router.get('/', async (req, res) => {
    try {
        const admins = await Admin.find();
        res.json(admins);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Update an Admin by ID
router.put('/update/:id', async (req, res) => {
    try {
        const adminId = req.params.id;
        const { email, password, name } = req.body;
        const updateAdmin = { email, password, name };
        const updatedAdmin = await Admin.findByIdAndUpdate(adminId, updateAdmin, { new: true });
        if (!updatedAdmin) {
            return res.status(404).json({ error: 'Admin not found' });
        }
        res.json({ status: 'Admin Updated', admin: updatedAdmin });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});
router.route("/login").post(async (req, res) => { // Use POST method for sending sensitive data
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        
        if (!admin) {
            return res.status(401).json({ message: "Invalid Email" });
        }
        // Compare the plain text password
        if (password !== admin.password) {
            return res.status(401).json({ message: "Invalid password" });
        }
        res.json({ message: "Login successful", userId: admin._id });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Delete an Admin by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const adminId = req.params.id;
        const deletedAdmin = await Admin.findByIdAndRemove(adminId);
        if (!deletedAdmin) {
            return res.status(404).json({ error: 'Admin not found' });
        }
        res.json({ status: 'Admin Deleted', admin: deletedAdmin });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get an Admin by ID
router.get('/get/:id', async (req, res) => {
    try {
        const adminId = req.params.id;
        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }
        res.json(admin);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
