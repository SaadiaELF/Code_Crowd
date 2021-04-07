// Dependencies
const router = require('express').Router();
const { Friend, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
    // create a new friend
    try {
        const newFriend = await Friend.create({
            friend_id: req.body.friend_id,
            user_id: "89c4da20-a560-404d-8441-29287191c5ca"
        });
        res.status(200).json(newFriend);
    } catch (err) {
        res.status(400).json("Error: Cannot add the friend");
    }
});

// Export module
module.exports = router;