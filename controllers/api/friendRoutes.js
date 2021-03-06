// Dependencies
const router = require('express').Router();
const { Friend } = require('../../models');

// create a new friend
router.post('/', async (req, res) => {

    try {
        const newFriend = await Friend.create({
            friend_id: req.body.friend_id,
            user_id: req.session.user_id
        });
        res.status(200).json(newFriend);
    } catch (err) {
        res.status(400).json("Error: Cannot add the friend");
    }
});

// Export module
module.exports = router;