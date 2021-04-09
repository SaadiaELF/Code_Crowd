// Dependencies
const router = require('express').Router();
const { User, Post, Comment, Friend } = require('../models');
const { Op } = require('sequelize');

// DEFINE ALL ROUTES BELOW

// Render the main content on the homepage
router.get('/', async (req, res) => {
    try {

        res.render('homepage', {

        });
    }

    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Gets post by id
router.get('/post/:id', async (req, res) => {
    try {
        // Render a single post on the page by its id
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
                {
                    model: Comment,
                    attributes: ['id', 'text', 'post_id', 'user_id'],
                    include: [
                        {
                            model: User,
                            attributes: ['name'],
                        },
                        {
                            model: Post,
                            attributes: ['date_created']
                        }
                    ]
                }
            ]
        })

        // if no post by that id exists, return an error
        if (!postData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }

        // serialize the post data, removing extra sequelize meta data
        const post = postData.get({ plain: true });

        // pass the posts and a session variable into the single post template
        res.render('single-post', {
            post,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json("Error: Cannot render the page");
    }

});
router.get('/profile', async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            order: [
                ['date', 'DESC'],
            ],
            include: [
                {
                    model: User,
                },
                {
                    model: Comment,
                    include: {
                        model: User,
                        attributes: ['id', 'first_name', 'last_name']
                    },
                },
            ],
        });

        const userData = await User.findByPk(req.session.user_id);
        const user = userData.get({ plain: true });
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('profile', { posts, user });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


router.put('/profile/:id', async (req, res) => {
    // update post by id
    try {

        const userData = await User.update({
            profile_picture: req.body.imageUrl
        },
            {
                where: {
                    id: req.body.id
                },
            });

        if (!userData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        res.status(200).json('success');
    } catch (err) {
        console.log(err)
        res.status(500).json("Error: Cannot update the post");
    }
});

// Get users in the search results to make friends with
router.get('/search/:search', async (req, res) => {
    try {
        const usersData = await User.findAll({
            where: {
                programming_languages: {
                    [Op.substring]: req.params.search,
                },
                id: { [Op.notLike]: req.session.user_id }
            },
        });
        const userData = await User.findByPk(req.session.user_id);
        const user = userData.get({ plain: true });
        const users = usersData.map((user) => user.get({ plain: true }));
        res.render('search', { users, user });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


// Render the feeds page
router.get('/feeds', async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            include: [
                {
                    model: User,
                    through: Friend,
                    as: 'user_friend',
                    include: {
                        model: Post,
                        order: [
                            ['date', 'DESC'],
                        ],
                        include: [
                            {
                                model: User,
                            },
                            {
                                model: Comment,
                                include: {
                                    model: User,
                                    attributes: ['id', 'first_name', 'last_name']
                                },
                            },
                        ]
                    },

                }
            ]
        });

        const user = userData.get({ plain: true });
        res.render('feeds', { user });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/friends', async (req, res) => {
    try {
        const friendData = await User.findAll({

            where: {
                id: req.session.user_id
            },
            include: [
                {
                    model: User,
                    through: Friend,
                    as: 'user_friend',
                }
            ]
        });
        const userData = await User.findByPk(req.session.user_id);
        const user = userData.get({ plain: true });
        const friends = friendData.map((friend) => friend.get({ plain: true }));
        res.render('friends', { friends, user });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Export the module
module.exports = router;