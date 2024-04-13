const mongoose = require('mongoose');

const valveInstanceSchema = new mongoose.Schema({
    _id: { type: String, required: true, trim: true }, //serial_number
    job_number: { type: String, required: true, trim: true },
    valve_model: { type: String, ref: 'ValveModel', required: true, trim: true },
    tests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Test' }]
}, {
    versionKey: false
});


const ValveInstance = mongoose.model('ValveInstance', valveInstanceSchema);

module.exports = ValveInstance;