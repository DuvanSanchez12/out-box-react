const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/payments.controller');


router.post('/:task_id/realease', ctrl.releasePayment);

module.exports = router;