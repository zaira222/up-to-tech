const { Text } = require('../models');

const textData = [
    {
        title: 'coding',
        Userlogin_id: 1
    },
    {
        title: 'job',
        Userlogin_id: 2
    }
];

const seedText = () => Text.bulkCreate(textData);

module.exports = seedText;