const express = require('express');
const router = express.Router();
const rolesService = require('./roles.service');

// routes
router.post('/', create);
router.get('/', get);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function create(req, res, next) {
    rolesService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function get(req, res, next) {
    rolesService.get()
        .then(roles => res.json(roles))
        .catch(err => next(err));
}

function update(req, res, next) {
    rolesService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    rolesService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}