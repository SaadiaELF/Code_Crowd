// Dependencies
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Sequelize = require('sequelize');

// Create class
class File extends Model {}

// Init and create table
File.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        type: {
            type: DataTypes.STRING,
        },
        name: {
            type: DataTypes.STRING,
        },
        size: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        post_id: {
            type: DataTypes.UUID,
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
        modelName: 'file'
    }
);

// Export model
module.exports = File;