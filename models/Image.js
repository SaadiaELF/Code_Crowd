// Dependencies
const { Model, Datatypes } = require('sequelize');

// Create class
class Image extends Model {}

// Init and create table
Image.init(
    {

    }
);

// Export model
module.exports = Image;