const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const updateSchema = new Schema({
    projectid: {type: String,},
    update: {type: String, required: true},
}, {
    timestamps: true,
});

const Update = mongoose.model('Update', updateSchema);

module.exports = Update;