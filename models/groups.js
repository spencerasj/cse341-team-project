const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const groupSchema = new Schema({
    teamName: {
        type: String,
        required: true
    },
    players: [
        {
            name: { type: String, required: true },
            userId: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'User'
            }
        }
    ]
});

module.exports = mongoose.model('Groups', groupSchema);