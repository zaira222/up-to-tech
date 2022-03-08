const { Blogs } = require('../models');

const blogsData = [
    {
        content: "Coding is fun",
        Userlogin_id: 1,
        text_id: 1

    },
    {
        content: "working at 5",
        Userlogin_id: 2,
        text_id: 2
    }
];

const seedBlogs = () => Blogs.bulkCreate(blogsData);

module.exports = seedBlogs;



