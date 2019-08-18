const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const ROLES = {
    SUPER_ADMIN: "superadmin", // IT IS MYSELF
    ADMIN: "admin", // ADMIN FOR THE APPLICATION
    SHOP_ADMIN: "shopadmin", // ADMIN FOR THE SHOP
    SELLER: "seller", // SHOP SELLER
    CUSTOMER: "customer", // CUSTOMER OR GENERAL USER
    CARRIER: "carrier" // CARRIER BOY
}
const schema = new Schema({
    name: { 
        type: String, 
        unique: true, 
        enum: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SHOP_ADMIN, ROLES.SELLER, ROLES.CUSTOMER, ROLES.CARRIER]
    },
    createddate: { type: Date, default: Date.now },
    updateddate: { type: Date, default: Date.now }
});

// unique validator for role name
schema.plugin(uniqueValidator, { message: 'Role {PATH} should be unique.' })

schema.set('toJSON', { virtuals: true });

module.exports = {
    Roles: mongoose.model('Roles', schema),
    ROLES
};