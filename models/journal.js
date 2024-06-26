const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
    date: { type: String, required: true },
    time: { type: String, required: true },
    mood: { type: String },
    song: { type: String },
    subject: { type: String },
    entry: { type: String }
});

module.exports = mongoose.model('Journal', journalSchema);
