const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blogs extends Model {}

Blogs.init(
    {
        id: {
            type: DataTypes.INTEGER, 
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        }, 
        content: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len:[1]
            }
        },
        Userlogin_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Userlogin',
                key: 'id'
            }
        },
        text_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'text', 
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName:'blogs'
    }
);

module.exports = Blogs;