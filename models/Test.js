const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now }, //auto-generated if not passed
  instance_id: { type: String, ref: 'ValveInstance', required: true },
  data: [{
    _id: false, //no id is required for each element of the array
    isOpening: { type: Boolean, required: true },
    pair: { type: Number, required: true },
    angle: { type: Number, required: true },
  }]
}, {
  versionKey: false
});


const Test = mongoose.model('Test', testSchema);

module.exports = Test;