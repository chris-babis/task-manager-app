const express = require('express');
const router = new express.Router();
const Project = require('../models/Project');
const User = require('../models/User');
const auth = require('../auth/auth');

// Create a Project
router.post("/projects", auth, async(req,res) => {
    const newProject = new Project(req.body.project);
    await newProject.save();
    res.send(newProject);
});

// Get User's Project
router.get("/projects", auth, async(req,res) => {
    await req.user.populate('projects').execPopulate();
    res.send(req.user.projects);
});

module.exports = router;  