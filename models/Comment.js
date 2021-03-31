// Dependencies
const { Model, Datatypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create class
class Comment extends Model {}

// Init and create table
Comment.init(
    {
        id: {
            type: Datatypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        content: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        date: {
            type: Datatypes.DATE,
            allowNull: false
        },
        user_id: {
            type: Datatypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        post_id: {
            type: Datatypes.INTEGER,
            references: {
                model: 'post',
                key: 'id'
            }
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