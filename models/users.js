const mongoose = require('mongoose'); //Schema setup in use, mongoose must be installed before use

const Schema = mongoose.Schema;

//Strings made more sense in this context than Char arrays, since strings are Char arrays
//mongoose also doesn't suppoet char arrays (see https://mongoosejs.com/docs/guide.html )
const userSchema = new Schema({
    name: { 
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: { 
        type: String,
        required: true
    },
    groups: {
        players: [
            {
                playerRole: {
                    type: String, //may need clarification on this
                    required: false
                },
                isAdmin: { 
                    type: Boolean, //Out of all the roles, admin apeared to be the most important
                    required: true
                }
            }

            /********************************
             * Group schema and database required for this section 
             * Possiblly would work well to build it in here, will bring it  up at a later time
             */
        ]
    }
});

module.exports = mongoose.model('User', userSchema);