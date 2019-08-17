const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: { 
        type: String, 
        unique: true, 
        required: [true, `Username is required`],
        minlength: [4, 'Username must have 4 characters'],
    },
    hash: { type: String, required: true },
    email: { 
        type: String, 
        unique: true, 
        required: [true, 'Email is required'], 
        validate: {
            validator: function(v) {
                return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }, 
    },
    name: { 
        type: String, 
        required: [true, 'Name is required'],
        minlength: [4, 'Name must have 4 characters'],
    },
    // role: {},
    status: { 
        type: String,
        enum: ['ACTIVE', 'INACTIVE', 'BLOCKED'], 
        default: 'ACTIVE' 
    },
    createddate: { type: Date, default: Date.now },
    udpateddate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);