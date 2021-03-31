// Dependencies
const { Model, Datatypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create class
class Image extends Model {}

// Init and create table
Image.init(
    {
        id: {

        },
        type: {

        },
        name: {

        },
        data: {

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
module.exports = Image;