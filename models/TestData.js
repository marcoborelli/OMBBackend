const mongoose = require('mongoose');

const testDataSchema = new mongoose.Schema({
    pair: { type: Number, required: true },
    angle: { type: Number, required: true },
    delta_time: { type: Number, required: true }
}, {
    versionKey: false
});


const TestData = mongoose.model('TestData', testDataSchema);

module.exports = TestData;