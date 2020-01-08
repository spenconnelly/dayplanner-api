const { Schema, model} = require('mongoose');

const eventSchema = new Schema ({
    creator: { type: Schema.Types.ObjectId, ref: 'Profile' },
    participants: [
        { type: Schema.Types.ObjectId, ref: 'Profile' }
    ],
    name: String,
    date: Date,
    description: String
});

module.exports = model('Event', eventSchema);
