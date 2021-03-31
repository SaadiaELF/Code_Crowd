// Dependencies
const { Model, Datatypes } = require('sequelize');

// Create class
class Post extends Model {}

// Init and create table
Post.init(
    {
        id: {

        },
        content: {

        },
        date: {

        },
        like: {

        },
        dislike: {

        },
        user_id: {

        },
        comment_id: {

        },
        file_id: {

        },
        image_id: {

        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);

// Export model
module.exports = Post;