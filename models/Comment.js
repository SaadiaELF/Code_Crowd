// Dependencies
const { Model, Datatypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create class
class Comment extends Model {}

// Init and create table
Comment.init(
    {
        id: {

        },
        content: {

        },
        date: {

        },
        user_id: {

        },
        post_id: {
            
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'image'
    }
);

// Export model
module.exports = Comment;