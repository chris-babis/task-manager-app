const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    collaborators: [{
        collaboratorId:{
            type: mongoose.Schema.Types.ObjectId,
            required: false
        }
    }],
    tasks: [{
        task: {
            type: String,
            required: false
        }
    }]
});


const Project = mongoose.model("Project", projectSchema);

module.exports = Project; 