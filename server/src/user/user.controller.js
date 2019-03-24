const express = require('express');
const router = express.Router();

router.get('/', get);

module.exports = router;

function get(req, res) {
    res.send('Test user');
}