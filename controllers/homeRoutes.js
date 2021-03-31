// Dependencies
const router = require('express').Router();
const { User, Post, File, Image, Comment } = require('../models');

// DEFINE ALL ROUTES BELOW

router.get('/', async (req, res) => {
    try {
        // Get all posts and JOIN with user data
        const postData = await Post.findAll({
            include: [

            ]
        });

        // Serialize data so the template can read it


        // Pass serialized data and session flag into template

    }

    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

// Export the module
module.exports = router;