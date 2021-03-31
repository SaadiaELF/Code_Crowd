// Dependencies
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const fileRoutes = require('./fileRoutes');
const imageRoutes = require('./imageRoutes');
const commentRoutes = require('./commentRoutes');

// Paths
router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/file', fileRoutes);
router.use('/image', imageRoutes);
router.use('/comment', commentRoutes);

// Export the module
module.exports = router;