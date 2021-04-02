// Dependencies
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create class
class Image extends Model { }

// Init and create table
Image.init(
    {
        id: {
            type: DataTypes.INTEGER,
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
        // data: {
        //     type: DataTypes.BLOB("long"),
        // },
        post_id: {
            type: DataTypes.INTEGER,
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