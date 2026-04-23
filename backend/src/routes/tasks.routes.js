const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/tasks.controller')

router.post('/', ctrl.create);
router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.patch('/:id/status', ctrl.updateStatus);

module.exports = router;
