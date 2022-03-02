const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const bcrypt = require('bcrypt');

class UserLogin extends Model {
    checkPassword(loginPW) {
        return bcrypt.compareSync(loginPassword, this.password);
    }
}

UserLogin.init(
    {
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
        async beforeCreate(newUserLoginData) {
            newUserLoginData.password = await bcrypt.hash(newUserLoginData.password, 10);
            return newUserLoginData;
        },
        async beforeUpdate(updatedUserLoginData) {
            updatedUserLoginData.password = await bcrypt.hash(updatedUserLoginData.password, 10);
            return updatedUserLoginData;
        }
    },

    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'UserLogin'
}
);



module.exports = UserLogin;