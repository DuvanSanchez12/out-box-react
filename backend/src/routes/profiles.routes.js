const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/profiles.controller');
const { verificarToken } = require('../middleware/auth.middleware');

router.get('/:id', ctrl.getById);
router.put('/:id', verificarToken, ctrl.update);

module.exports = router;