const mongoose = require('mongoose');

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
    tasks: [{
        task: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task',
            required: false
        }
    }]
},
{ timestamps: true });


const Project = mongoose.model("Project", projectSchema);

module.exports = Project; 