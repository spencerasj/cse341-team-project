const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const groupsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    games: [ 
        {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Game'
        }
    ],
    players: [
        {
            userId: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'User'
            }
        }
    ]
});

module.exports = mongoose.model('Groups', groupsSchema);