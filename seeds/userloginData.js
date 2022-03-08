const { Userlogin } = require('../models');

const userloginData = [
    {
        username: 'art2',
        password: 123456
    },
    {
        username: 'art2',
        password: 123456
    }
];

const seedUserlogin = () => Userlogin.bulkCreate(userloginData);

module.exports = seedUserlogin;
