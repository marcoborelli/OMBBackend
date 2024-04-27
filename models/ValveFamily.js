const mongoose = require('mongoose');
const ValveValuesSchema = require('./ValveValuesSchema');

const valveFamilySchema = new mongoose.Schema({
    _id: { type: String, required: true, trim: true }, //start of code
    img_url: { type: String },
    theoric_values: { type: ValveValuesSchema, required: true },
    average_values: { type: ValveValuesSchema }
}, {
    versionKey: false
});


const ValveFamily = mongoose.model('ValveFamily', valveFamilySchema);

module.exports = ValveFamily;