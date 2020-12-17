const mongoose = require('mongoose');
const { taskSchema, Task } = require('./Task');

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

//Remove tasks when user deletes project
projectSchema.post('findOneAndDelete', async function(doc) {
    await Task.deleteMany({projectId: doc._id});
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;  