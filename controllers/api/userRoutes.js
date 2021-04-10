// Dependencies
const router = require('express').Router();
const { User } = require('../../models');

// When user signs in, credentials are saved into the db
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        })
    }

    catch (err) {
        console.log(err);
        res.status(404).json(err);
    }
});

// update user profile picture
router.put('/profile/:id', async (req, res) => {
    
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
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }

        res.status(200).json('success');
    } catch (err) {
        console.log(err)
        res.status(500).json("Error: Cannot update the user");
    }
});

// When user logs in, credentials are saved and allows user to access page
// only if credentials are correct!
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res.statusMessage = 'Incorrect email or password, please try again';
            res.status(400).end();
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.statusMessage = 'Incorrect email or password, please try again';
            res.status(400).end();
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });
    }

    catch (err) {
        res.status(404).json(err);
    }
});

// Signup
router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        console.log(userData);
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json(userData);
        });
    } catch (err) {
        res.statusMessage = 'unable to sign up';
        res.status(400).json(err);
    }
});

// When user logs out, their session is ended if they were logged in
router.post('/logout', async (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }

    else {
        res.status(404).end();
    }
});



// Export module
module.exports = router;