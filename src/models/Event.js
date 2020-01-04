const { Schema, model} = require('mongoose');

const eventSchema = new Schema ({
    name: String,
    creator: { type: Schema.Types.ObjectId, ref: 'Profile' },
    date: Date,
    description: String
});

module.exports = model('Event', eventSchema);
