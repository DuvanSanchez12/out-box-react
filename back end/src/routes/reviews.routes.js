const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/reviews.controller');

router.post('/:task_id', ctrl.createReview);

module.exports = router;