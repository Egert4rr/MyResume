const express = require('express');
const mainController = require('../controllers/mainController');
const router = express.Router();

router.get('/', mainController.getMainPage);

router.get('/admin', mainController.getAdmin);

module.exports = router;