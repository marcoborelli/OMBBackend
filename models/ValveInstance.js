const mongoose = require('mongoose');

const valveInstanceSchema = new mongoose.Schema({
    _id: { type: String, required: true }, //serial_number
    job_number: { type: String, required: true },
    valve_model: { type: String, ref: 'ValveModel', required: true },
    tests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Test' }]
}, {
    versionKey: false
});


const ValveInstance = mongoose.model('ValveInstance', valveInstanceSchema);

module.exports = ValveInstance;