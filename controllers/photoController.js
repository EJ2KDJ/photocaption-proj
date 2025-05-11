const { Caption, User } = require('../models');
const fs = require('fs');
const path = require('path');
const { Model } = require('sequelize');
const user = require('../models/user');
const {cacheMiddleware} = require('../middleware/cache');
const cache = require('../middleware/cache').cache;

exports.cache = cacheMiddleware

// Get all images
exports.getAllImages = (req, res) => {
    const imageDir = path.join(__dirname, '../public/assets/images');
    
    fs.readdir(imageDir, (err, files) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Server Error' });
        }
        
        const images = files.filter(file => file.endsWith('.jpg'));
        res.json(images.map(img => `/assets/images/${img}`));
    });
};

// Get image by ID with captions
exports.getImageById = async (req, res) => {
  try {
    const { id } = req.params;
    const imagePath = `/assets/images/imageCaption${id}.jpg`;
    const fullPath = path.join(__dirname, '../public', imagePath);

    if (!fs.existsSync(fullPath)) {
      return res.status(404).json({ error: 'Image not found' });
    }

    // Query by imageId instead of imageUrl
    const captions = await Caption.findAll({
      where: { imageId: id }, // Use imageId here
      include: { model: User, as: 'user' }
    });

    res.json({ 
      imageUrl: imagePath,
      captions: captions.map(c => ({
        id: c.id,
        text: c.captionText,
        author: c.user?.username,
        createdAt: c.createdAt
      }))
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Add caption to image
exports.addCaption = async (req, res) => {
  try {
    const { id } = req.params;
    const newCaption = await Caption.create({
      userId: req.user.userId,
      imageId: id,
      captionText: req.body.captionText
    });

    // Clear cached data for this image
    cache.del(`image_${id}`);
    console.log(`Cleared cache for image ${id}`);

    res.status(201).json({
      message: 'Caption added successfully',
      caption: {
        id: newCaption.id,
        text: newCaption.captionText,
        createdAt: newCaption.createdAt
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
};