// Dependencies
const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// Create a new post
router.post('/', async (req, res) => {
    // create a new post
    try {
        const newPost = await Post.create({
            content: req.body.content,
            screenshot: req.body.screenshot,
            file: req.body.file,
            user_id: '89c4da20-a560-404d-8441-29287191c5ca',
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json("Error: Cannot add the post");
    }

});

// Delete an existing post, by specific id
router.delete('/delete/:id', withAuth, async (req, res) => {
    try {
        console.log(req.params.id, 'post_id');
        console.log(req.session.user_id);
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        res.status(200).json(postData);
    }

    catch (err) {
        res.status(500).json(err);
    }
});


// Export module
module.exports = router;