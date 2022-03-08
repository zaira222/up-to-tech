const sequelize = require('../config/connection');
const seedBlogs = require('./blogsData');
const seedText = require('./textData');
const seedUserlogin = require('./userloginData');

const seedAll = async () => {
    await sequelize.sync({ force: true });

    await seedBlogs();
    
    await seedText();

    await seedUserlogin();

    process.exit(0);
};

seedAll();

