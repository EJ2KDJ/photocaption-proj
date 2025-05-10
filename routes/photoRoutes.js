const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photoController');

// Public endpoints
router.get('/', photoController.getAllImages);
router.get('/:id', photoController.getImageById);

// Protected endpoint
router.post('/:id/captions', photoController.addCaption);

module.exports = router;