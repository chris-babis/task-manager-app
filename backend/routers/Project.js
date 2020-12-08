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

// Get Single Project
router.get("/project/:id", auth, async(req,res) => {
    try {
        const project = await Project.findById(req.params.id);
        if(!project) return res.status(404).send({message: 'Project not found.'});
        res.status(200).send(project);
    } catch (err) {
        console.log(err); 
    }
});
 
module.exports = router;  