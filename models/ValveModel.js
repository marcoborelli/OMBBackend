const mongoose = require('mongoose');

const valveModelSchema = new mongoose.Schema({
    _id: { type: String, required: true, trim: true }, //code
    description: { type: String, required: true, trim: true },
    gear_model: { type: String, required: true, trim: true },
    ma_gear: { type: Number, required: true },
    img_url: { type: String }
}, {
    versionKey: false
});


const ValveModel = mongoose.model('ValveModel', valveModelSchema);

module.exports = ValveModel;