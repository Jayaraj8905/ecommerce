const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;
const rolesService = require('../roles/roles.service');
const ROLES = require('../roles/roles.model').ROLES;

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}

async function getAll() {
    // TODO: RESTRICT TO ALLOW FOR VALID USERS
    return await User.find().populate('role').select('-hash');
}

async function getById(id) {
    // TODO: RESTRICT TO ALLOW FOR VALID USERS
    return await User.findById(id).populate('role').select('-hash');
}

async function create(userParam) {
    // username should be unique
    if (await User.findOne({ username: userParam.username })) {
        throw `Username ${userParam.username} is already taken`;
    }
    // email shoudl be unique
    if (await User.findOne({ email: userParam.email })) {
        throw `Email ${userParam.email} is already taken`;
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // update the role always default to customer if not provided
    let role;
    if (userParam.role && userParam.role.id) {
        role = await rolesService.getById(userParam.role.id)
    } else {
        role = await rolesService.getByName({name: ROLES.CUSTOMER})
    }

    if (!role) {
        throw `Role not exists`;
    }
    user.role = role.id;

    // save user
    await user.save();
}

async function update(id, userParam) {
    // TODO: RESTRICT TO ALLOW FOR VALID USERS
    // SUPER ADMIN OR SHOP ADMIN (FOR SELLER) OR USER ITSELF CAN UPDATE
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // update the role if there is request for role update
    if (userParam.role && userParam.role.id) {
        const role = await rolesService.getById(userParam.role.id)
        if (!role) {
            throw `Role not exists`;
        }
        userParam.role = role.id;
    }

    // copy userParam properties to user
    // add the update date 
    userParam.updatedate =  Date.now;
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    // TODO: RESTRICT TO ALLOW FOR VALID USERS
    // SUPER ADMIN OR SHOP ADMIN (FOR SELLER) OR USER ITSELF CAN UPDATE
    await User.findByIdAndRemove(id);
}