
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Roles = db.Roles;

module.exports = {
    get,
    getByName,
    getById,
    create,
    update,
    delete: _delete
};

async function get() {
    // TODO: RESTRICT TO ALLOW FOR VALID SUPER ADMIN
    return await Roles.find().select();
}

async function getByName(roleParam) {
    // TODO: RESTRICT TO ALLOW FOR VALID SUPER ADMIN
    return await Roles.findOne({name: roleParam.name}).select();
}

async function getById(id) {
    // TODO: RESTRICT TO ALLOW FOR VALID SUPER ADMIN
    return await Roles.findById(id);
}

async function create(roleParam) {
    // TODO: RESTRICT TO ALLOW ONLY FOR SUPER ADMIN
    // rolename should be unique
    if (await Roles.findOne({ name: roleParam.name })) {
        throw `Role ${roleParam.name} is already exists`;
    }

    const role = new Roles(roleParam);
    // save role
    await role.save();
}

async function update(id, roleParam) {
    // TODO: RESTRICT TO ALLOW FOR SUPER ADMIN
    const role = await Roles.findById(id);

    // validate
    if (!role) throw 'Role not found';
    if (role.name !== roleParam.name && await Roles.findOne({ name: roleParam.name })) {
        throw `Role ${roleParam.name} is already taken`;
    }

    // copy roleParam properties to role
    // add the update date 
    roleParam.updatedate =  Date.now;
    Object.assign(role, roleParam);

    await role.save();
}

async function _delete(id) {
    // TODO: RESTRICT TO ALLOW FOR SUPER ADMIN
    await Roles.findByIdAndRemove(id);
}