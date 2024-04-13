const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now }, //auto-generated
  valve_id: { type: String, ref: 'ValveInstance', required: true },
  data: [{
    _id: false, //no id is required for each element of the array
    pair: { type: Number, required: true },
    angle: { type: Number, required: true },
    delta_time: { type: Number, required: true }
  }]
}, {
  versionKey: false
});


const Test = mongoose.model('Test', testSchema);

module.exports = Test;