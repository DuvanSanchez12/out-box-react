const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/evidence.controller');

router.post('/:id/evidence', ctrl.uploadEvidence);
router.post('/:id/validate', ctrl.validateTask);

module.exports =router;