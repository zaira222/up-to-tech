const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const bcrypt = require('bcrypt');

class Userlogin extends Model {
    checkPassword(loginPassword) {
        return bcrypt.compareSync(loginPassword, this.password);
    }
}

Userlogin.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },

       email:{
           type: DataTypes.STRING,
           allowNull: false,
           unique: true,
           validate: {
               isEmail: true
           }

        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6]
            }
        }
    },
    { hooks: {
        async beforeCreate(newUserloginData) {
            newUserloginData.password = await bcrypt.hash(newUserloginData.password, 10);
            return newUserloginData;
        },
        async beforeUpdate(updatedUserloginData) {
            updatedUserloginData.password = await bcrypt.hash(updatedUserloginData.password, 10);
            return updatedUserloginData;
        }
    },

    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'userlogin'
}
);



module.exports = Userlogin;