// Dependencies
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Use bcrypt for password hashing
const bcrypt = require('bcrypt');

// Create class
class Friend extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

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
        hooks: {
            beforeCreate: async (newFriendData) => {
                newFriendData.password = await bcrypt.hash(newFriendData.password, 10);
                return newFriendData;
            },
            beforeUpdate: async (updatedFriendData) => {
                updatedFriendData.password = await bcrypt.hash(updatedFriendData.password, 10);
                return updatedFriendData;
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

// Export model
module.exports = Friend;