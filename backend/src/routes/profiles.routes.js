const express = require('express');
const router = express.Router();
const ctrl = require ('../controllers/profiles.controller')



router.get('/:id', ctrl.getById);
router.put('/:id', ctrl.update)

module.exports = router;