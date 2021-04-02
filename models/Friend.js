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
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            },
        },
        programming_languages: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // profile_picture: {
        //     type: DataTypes.BLOB
        // },
        date_of_birth: {
            type: DataTypes.DATE
        },
        friend_id: {
            type: DataTypes.INTEGER,
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