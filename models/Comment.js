// Dependencies
const { Model, Datatypes } = require('sequelize');

// Create class
class Comment extends Model {}

// Init and create table
Comment.init(
    {

    }
);

// Export model
module.exports = Comment;