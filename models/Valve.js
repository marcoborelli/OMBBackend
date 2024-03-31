const mongoose = require('mongoose');

const valveSchema = new mongoose.Schema({
    name: { type: String, required: true },
    model_family: { type: String, required: true },
    tests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Test' }]
}, {
    versionKey: false
});


const Valve = mongoose.model('Valve', valveSchema);

module.exports = Valve;