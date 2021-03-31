//Dependencies
const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

// Paths
router.use('./api', apiRoutes);
router.use('/', homeRoutes);

// Route for non-existent page
router.use((req, res) => {
    res.status(404).end();
})

// Export the module
module.exports = router;