const mongoose = require('mongoose');

const PointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        index: { type: '2dsphere', sparse: false },
        required: true
    }
});


module.exports = PointSchema;