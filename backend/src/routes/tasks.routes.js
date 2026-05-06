const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/tasks.controller');
const { verificarToken } = require('../middleware/auth.middleware');

router.post('/', verificarToken, ctrl.create);
router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.patch('/:id/status', verificarToken, ctrl.updateStatus);

module.exports = router;
