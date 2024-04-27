const ValveValuesSchema = {
    _id: false,
    bto: { type: Number, required: true }, //break to open (0)
    runo: { type: Number, required: true }, //run open (45)
    eto: { type: Number, required: true }, //end to open (90)
    btc: { type: Number, required: true }, //break to close (90)
    runc: { type: Number, required: true }, //run close (45)
    etc: { type: Number, required: true } //end to close (0)
};

module.exports = ValveValuesSchema;
