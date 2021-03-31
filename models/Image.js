// Dependencies
const { Model, Datatypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create class
class Image extends Model { }

// Init and create table
Image.init(
    {
        id: {
            type: Datatypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: DataTypes.STRING,
        },
        name: {
            type: DataTypes.STRING,
        },
        data: {
            type: DataTypes.BLOB("long"),
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
module.exports = Image;