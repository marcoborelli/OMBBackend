const mongoose = require('mongoose');
const ValveValuesSchema = require('./ValveValuesSchema');

const valveModelSchema = new mongoose.Schema({
    _id: { type: String, required: true, trim: true, uppercase: true }, //complete code
    valve_family: { type: String, ref: 'ValveFamily', required: true, trim: true },
    description: { type: String, required: true, trim: true },
    gear_model: { type: String, required: true, trim: true },
    ma_gear: { type: Number, required: true },
    img_url: { type: String },
    average_values: { type: ValveValuesSchema }
}, {
    versionKey: false
});


const ValveModel = mongoose.model('ValveModel', valveModelSchema);

module.exports = ValveModel;