const express = require('express');
const router = new express.Router();
const Project = require('../models/Project');
const { Task } = require('../models/Task');
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
        const project = await Project.findById(req.params.id).populate('ownerId',"username");
        if(!project) return res.status(404).send({message: 'Project not found.'});
        res.status(200).send(project);
    } catch (err) {
        console.log(err); 
    }
});

// Add Task to Project
router.post("/project/:projectId/", auth, async(req,res) => {
    try {
        const project = await Project.findById(req.params.projectId);
        if(req.body.priority !== 'Low' && req.body.priority !== 'Moderate' && req.body.priority !== 'High') req.body.priority = 'None';
        let nTask = new Task(req.body);
        nTask.projectId = req.params.projectId;
        await nTask.save();
        project.tasks.push(nTask);
        await project.save(); 
        res.status(201).send(project);
    } catch (err) {
        console.log(err);
    }
});

// Delete Project
router.delete("/project/:projectId/delete", auth, async(req,res) => {
    try {
        await Project.findOneAndDelete({_id:req.params.projectId});
        res.send();
    } catch (err) {
        console.log(err);
    }
});




module.exports = router;  