// Dependencies
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Sequelize = require('sequelize');

// Use bcrypt for password hashing
const bcrypt = require('bcrypt');

// Create class
class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

// Init and create table
User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
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
        profile_picture: {
            type: DataTypes.STRING,
            defaultValue: 'https://res.cloudinary.com/birminghambcs/image/upload/v1617972284/user_bb2xva.png',
        },
        date_of_birth: {
            type: DataTypes.DATE
        }
    },
    {
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            beforeUpdate: async (updatedUserData) => {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
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
module.exports = User;