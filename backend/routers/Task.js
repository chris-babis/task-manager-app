const express = require('express');
const router = new express.Router();
const Project = require('../models/Project');
const User = require('../models/User');
const auth = require('../auth/auth');
const {Task} = require('../models/Task');

router.get('/project/:projectId/tasks', auth, async(req,res) => {
    const tasks = await Task.find({projectId: req.params.projectId}).populate('assignee','username');
    res.status(200).send(tasks);
});



module.exports = router;   