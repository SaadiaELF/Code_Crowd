// Dependencies
const { User } = require('../models');

// Data to be seeded in the db
const userData = [
    {

    }
]

// Function to seed the model
const seedUser = () => User.bulkCreate(userData, {individualHooks:true});

// Export the module
module.exports = seedUser;