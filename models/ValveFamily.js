const mongoose = require('mongoose');

const ValveValuesSchema = {
    _id: false,
    bto: { type: Number, required: true }, //break to open (0)
    runo: { type: Number, required: true }, //run open (45)
    eto: { type: Number, required: true }, //end to open (90)
    btc: { type: Number, required: true }, //break to close (90)
    runc: { type: Number, required: true }, //run close (45)
    etc: { type: Number, required: true } //end to close (0)
}

const valveFamilySchema = new mongoose.Schema({
    _id: { type: String, required: true, trim: true }, //start of code
    img_url: { type: String },
    theoric_values: { type: ValveValuesSchema, required: true }
}, {
    versionKey: false
});


const ValveFamily = mongoose.model('ValveFamily', valveFamilySchema);

module.exports = ValveFamily;