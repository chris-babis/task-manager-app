const express = require('express');
const router = new express.Router();
const User = require('../models/User');


// Create User
router.post('/users', async(req,res) => {

    try {
        const user = new User({email: req.body.email,password:req.body.password});
        await user.save();
        res.status(201).send(user);
    } catch (err) {
        if(err.code === 11000) return res.status(409).send({err: "Email already registered."});
        if(err.errors.email) return res.status(400).send({err: "Email is invalid."});
        if(err.errors.password.kind === "minlength") return res.status(400).send({err: "Password too short.(Min length: 7)"});
        res.status(500).send({err: "Unknown error"});
    }
    

});

module.exports = router; 