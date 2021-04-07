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

// Add a like to a post
router.put('/like/:id', async (req, res) => {
    // update post by id
      try {
        // console.log(req.body.imageUrl);
        const postData = await Post.update({
            like: req.body.like
        },
            {
                where: {
                    id: req.params.id,
                },
            });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json("Error: Cannot update the post");
    }
});

// Add a dislike to a post
router.put('/dislike/:id', async (req, res) => {
    // update post by id
      try {
        // console.log(req.body.imageUrl);
        const postData = await Post.update({
            dislike: req.body.dislike
        },
            {
                where: {
                    id: req.params.id,
                },
            });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json("Error: Cannot update the post");
    }
});

// Delete an existing post, by specific id
router.delete('/:id', async (req, res) => {
    // delete post by id
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: '89c4da20-a560-404d-8441-29287191c5ca',
            },
        });
        console.log(postData)
        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json("Error: Cannot delete the post");
    }
});

// Export module
module.exports = router;