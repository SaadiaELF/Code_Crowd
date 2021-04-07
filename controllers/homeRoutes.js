// Dependencies
const router = require('express').Router();
const { User, Post, Comment } = require('../models');
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
                user_id: "req.session.user_id"
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
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('profile', { posts });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


router.put('/profile/:id', async (req, res) => {
    // update post by id
    try {
        // console.log(req.body.imageUrl);
        const userData = await User.update({
            profile_picture: req.body.imageUrl
        },
            {
                where: {
                    id: "f4286e04-8fdb-4ce4-ba5f-ad4406686bee"
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

// Get users in the search results to make friends with
router.get('/search/:search', async (req, res) => {
    try {
        const userData = await User.findAll({
            where: {
                programming_languages: {
                    [Op.substring]: req.params.search,
                }
            },
        });
        const users = userData.map((user) => user.get({ plain: true }));
        res.render('search', { users });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Render the login
// If the user is logged in, redirect to the home page
router.get('/login', async (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

// Render the sign up
// If the user is logged in, redirect to the home page.
router.get('/signup', (req, res) => {
    // Route to signup page
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }
    res.render('signup');
});

router.put('/profile', async (req, res) => {
    // update post by id
    try {
        const postData = await Post.update({
            like: req.body.like,
        },
            {
                where: {
                    id: "0f10edf6-92cc-47e3-9460-c23f5bb3aa12"
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


// Render the feeds page
router.get('/feeds', async (req, res) => {
    try {
        const postData = await Post.findAll({
            order: [
                ['date', 'DESC'],
            ],
            include: [
                {
                    model: User,
                    // add where : friend_id = req.session.user_id
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
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('feeds', { posts });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Export the module
module.exports = router;