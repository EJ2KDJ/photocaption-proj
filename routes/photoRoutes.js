const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photoController');
const { authenticate, authorize} = require('../middleware/auth');

// Public endpoints
router.get('/', photoController.getAllImages);
router.get('/:id', photoController.getImageById);

// Protected endpoint
router.post('/:id/captions',
    authenticate,
    authorize,
    photoController.addCaption
);

module.exports = router;