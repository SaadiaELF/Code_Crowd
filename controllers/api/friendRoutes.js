// Dependencies
const router = require('express').Router();
const { Friend, User } = require('../../models');
const withAuth = require('../../utils/auth');

// Get users in the search results to make friends with
router.get('/search', withAuth, async (req, res) => {
    try {
        const userData = await User.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
                {
                    model: Image,
                    attributes: ['id'] // What other attributes?
                }
            ]
        });

        res.status(200).json(userData);
    }
    
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

// Export module
module.exports = router;