// Dependencies
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


// Create class
class Friend extends Model { }

// Init and create table
Friend.init(
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.UUID,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        friend_id: {
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
        modelName: 'friend'
    }
);

// Export model
module.exports = Friend;