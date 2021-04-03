// Dependencies
const router = require('express').Router();
const { User, Post, File, Image, Comment } = require('../models');

// DEFINE ALL ROUTES BELOW
// Render the main content on the homepage
router.get('/', async (req, res) => {
    try {
        // Get all posts and JOIN with user data
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
                {
                    model: Comment,
                    attributes: ['id']
                },
                {
                    model: File,
                    attributes: ['id'] // What other attributes?
                },
                {
                    model: Image,
                    attributes: ['id'] // What other attributes?
                }
            ]
        });

        // Serialize data so the template can read it
        const posts = postData.map((post) => post.get({ plain: true }));
        console.log(postData);

        // Pass serialized data and session flag into template
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
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
});

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
        res.redirect('/dashboard');
        return;
    }
    res.render('signup');
});


// Export the module
module.exports = router;