// Dependencies
const { Model, Datatypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create class
class Post extends Model { }

// Init and create table
Post.init(
    {
        id: {
            type: Datatypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        content: {
            type: Datatypes.STRING,
            allowNull: false
        },
        date: {
            type: Datatypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        // like: {

        // },
        // dislike: {

        // },
        // user_id: {

        // },
        // comment_id: {

        // },
        // file_id: {

        // },
        // image_id: {

        // }
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