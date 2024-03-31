const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now }, //auto-generated
  // TODO valve_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Valve', required: true },
  data: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TestData' }]
}, {
  versionKey: false
});


const Test = mongoose.model('Test', testSchema);

module.exports = Test;