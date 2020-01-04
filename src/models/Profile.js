const { Schema, model} = require('mongoose');

const profileSchema = new Schema ({
    email: { type: String, unique: true },
    events: [
        { type: Schema.Types.ObjectId, ref: 'Event' }
    ],
    createdDate: Date
});

module.exports =  model('Profile', profileSchema);
