const mongoose = require('mongoose');
const { taskSchema } = require('./Task');

const projectSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    collaborators: [{
        collaboratorId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false
        }
    }],
    tasks: [taskSchema],
    categories: [{
        title: {
            type: String,
            required: true
        }, 
        tasks: [taskSchema]
    }]
},
{ timestamps: true });


const Project = mongoose.model("Project", projectSchema);

module.exports = Project;  