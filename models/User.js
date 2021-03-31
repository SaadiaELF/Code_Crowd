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

        },
        password: {

        },
        programming_languages: {

        },
        city: {
            type: Datatypes.STRING,
            allowNull: false
        },
        country: {
            type: Datatypes.STRING,
            allowNull: false
        },
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