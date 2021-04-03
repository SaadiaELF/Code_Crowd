// Dependencies
const router = require('express').Router();
const { User, Post, File, Image, Comment } = require('../models');

// DEFINE ALL ROUTES BELOW

// router.get('/', async (req, res) => {
//     try {
//         // Get all posts and JOIN with user data
//         const postData = await Post.findAll({
//             include: [

//             ]
//         });

//         // Serialize data so the template can read it


//         // Pass serialized data and session flag into template

//     }

//     catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// })

router.get('/profile', async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: 1
            },
            include: [
                {
                    model: User,
                    attributes: ['id', 'first_name', 'last_name', 'profile_picture'],
                }],
        });

        const posts = postData.map((post) => post.get({ plain: true }));
        console.log(posts)
         res.render('profile', {posts});
    }
    catch (err) {
        res.status(500).json("Error: Cannot render the page");
    }
})

router.put('/profile/:id', async (req, res) => {
    // update post by id
    try {
        console.log(req.body.imageUrl);
        const userData = await User.update({
            profile_picture: req.body.imageUrl
        },
            {
                where: {
                    id: "1"
                },
            });

        if (!userData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        res.status(200).render('profile');
    } catch (err) {
        res.status(500).json("Error: Cannot update the post");
    }
});

// Export the module
module.exports = router;