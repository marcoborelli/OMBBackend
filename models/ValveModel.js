const mongoose = require('mongoose');

const valveModelSchema = new mongoose.Schema({
    _id: { type: String, required: true }, //code
    description: { type: String, required: true },
    gear_model: { type: String, required: true },
    ma_gear: { type: Number, required: true },
}, {
    versionKey: false
});


const ValveModel = mongoose.model('ValveModel', valveModelSchema);

module.exports = ValveModel;