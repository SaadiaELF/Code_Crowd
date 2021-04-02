// Dependencies
const router = require('express').Router();
const { Image } = require('../../models');
const withAuth = require('../../utils/auth');

// Get images
router.get('/', async (req, res) => {
    try {
        const commentData = await Image.findAll();

        if (!commentData) {
            res.status(404).json({ message: 'No image found with this id' });
        }
    }

    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Add a new image in a post --> ?

// Export module
module.exports = router;