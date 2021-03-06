// Dependencies
const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Get comments
router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll(
            {
                order: [
                    ['date', 'DESC'],
                ],
            }
        );

        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id' });
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

            content: req.body.content,
            user_id: req.session.user_id,
            post_id: req.body.post_id,
        })
        console.log(commentData)
        res.status(200).json(commentData);
    }

    catch (err) {
        res.status(400).json(err);
    }
});

// delete comment by id
router.delete('/:id', async (req, res) => {

    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json("Error: Cannot delete the comment");
    }
});
// Export module
module.exports = router;