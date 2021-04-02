// Dependencies
const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Get comments
router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll();

        if (!commentData) {
            res.status(404).json({ message: 'No post found with this id' });
        }
    }

    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Create comment
router.post('/', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.create({
            // ...req.body,
            content: req.body.content,
            user_id: req.session.user_id,
            post_id: req.body.post_id
        })

        res.status(200).json(commentData);
    }

    catch (err) {
        res.status(400).json(err);
    }
});

// Export module
module.exports = router;