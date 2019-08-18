const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
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
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Roles',
        required: [true, 'Role is required']
    },
    status: { 
        type: String,
        enum: ['ACTIVE', 'INACTIVE', 'BLOCKED'], 
        default: 'ACTIVE' 
    },
    createddate: { type: Date, default: Date.now },
    updateddate: { type: Date, default: Date.now }
});

// unique validator for username and email
schema.plugin(uniqueValidator, { message: '{PATH} should be unique.' })

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);