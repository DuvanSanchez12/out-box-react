const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/evidence.controller');
const { verificarToken } = require('../middleware/auth.middleware');

router.post('/:id/evidence', verificarToken, ctrl.uploadEvidence);
router.post('/:id/validate', verificarToken, ctrl.validateTask);

module.exports = router;