const { Model , DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Text extends Model {}

Text.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },

        Userlogin_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Userlogin',
                key: 'id',
            },
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'text'
    }
);

module.exports = Text;

