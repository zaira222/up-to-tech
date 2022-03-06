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

        userlogin_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
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