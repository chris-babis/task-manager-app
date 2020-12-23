const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
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
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    assignee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    priority: {
        type: String,
        enum: ['None','Low', 'Moderate', 'High'],
        allowNull: true,
    },
    status: {
        type: String,
        enum: ['Completed', 'Uncompleted']
    },
    comments: [{
        type: String,
        default: []
    }]
},
    { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = { Task, taskSchema}