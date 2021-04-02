// Dependencies
const router = require('express').Router();
const { File } = require('../../models');
const withAuth = require('../../utils/auth');

// Get files
router.get('/', async (req, res) => {
    try {
        const commentData = await File.findAll();

        if (!commentData) {
            res.status(404).json({ message: 'No file found with this id' });
        }
    }

    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Add a new file in a post --> ?

// Export module
module.exports = router;