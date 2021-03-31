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
        like: {
            type: Datatypes.INTEGER // count
        },
        dislike: {
            type: Datatypes.INTEGER // count
        },
        user_id: {
            type: Datatypes.INTEGER,
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