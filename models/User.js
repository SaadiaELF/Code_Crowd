// Dependencies
const { Model, Datatypes } = require('sequelize');

// Create class
class User extends Model {}

// Init and create table
User.init(
    {
        id: {
            type: Datatypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: Datatypes.STRING,
            allowNull: false
        },
        last_name: {
            type: Datatypes.STRING,
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
            type: Datatypes.STRING,
            allowNull: false
        },
        city: {
            type: Datatypes.STRING,
            allowNull: false
        },
        country: {
            type: Datatypes.STRING,
            allowNull: false
        },
        // profile_picture: {

        // },
        // date_of_birth: {

        // },
        // friend_id: {

        // },
        // post_id: {

        // },
        // comment_id: {

        // }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

// Export model
module.exports = User;