const express = require ('express');
const router = express.Router();
const ctrl = require('../controllers/workers.controller')

router.get('/', ctrl.getAll);

module.exports = router;