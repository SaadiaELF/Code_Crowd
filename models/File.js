// Dependencies
const { Model, Datatypes } = require('sequelize');

// Create class
class File extends Model {}

// Init and create table
File.init(
    {

    }
);

// Export model
module.exports = File;