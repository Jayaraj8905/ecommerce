const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;

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
    return await User.find().select('-hash');
}

async function getById(id) {
    // TODO: RESTRICT TO ALLOW FOR VALID USERS
    return await User.findById(id).select('-hash');
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

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    // TODO: RESTRICT TO ALLOW FOR VALID USERS
    // SUPER ADMIN OR SHOP ADMIN (FOR SELLER) OR USER ITSELF CAN UPDATE
    await User.findByIdAndRemove(id);
}