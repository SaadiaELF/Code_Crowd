// Dependencies
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Sequelize = require('sequelize');

// Create class
class Post extends Model { }

// Init and create table
Post.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        screenshot: {
            type: DataTypes.STRING,
        },
        file :{
            type: DataTypes.STRING,
        },
        like: {
            type: DataTypes.INTEGER, // count
            defaultValue: 0,
        },
        dislike: {
            type: DataTypes.INTEGER, // count
            defaultValue: 0,
        },
        user_id: {
            type: DataTypes.UUID,
            references: {
                model: 'user',
                key: 'id'
            }
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