// Dependencies
const { Model, Datatypes } = require('sequelize');

// Create class
class User extends Model {}

// Init and create table
User.init(
    {

    }
);

// Export model
module.exports = User;