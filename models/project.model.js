const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    username: {type: String, required: true},
    name: {type: String, required: true },
    description: {type: String, required: true},
    category: {type: String, required: true},
    progresspercent: {type: Number}
}, {
    timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;