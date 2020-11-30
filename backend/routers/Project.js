const express = require('express');
const router = new express.Router();
const Project = require('../models/Project');
const auth = require('../auth/auth');

// Create a Project
router.post("/projects", auth, async(req,res) => {
    
});

// Get User's Project
router.get("/projects", auth, async(req,res) => {
    
});

module.exports = router;  