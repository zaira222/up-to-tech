const Text = require('./Text');
const Blogs = require('./Blogs');

const Userlogin = require('../models/Userlogin');
Userlogin.hasMany(Text, {
    foreignKey: 'userlogin_id',
  
});

Text.belongsTo(Userlogin, {
    foreignKey: 'userlogin_id',

});


Blogs.belongsTo(Userlogin, {
    foreignKey: 'userlogin_id',
});

Blogs.belongsTo(Text, {
    foreignKey: 'text_id',
});

Userlogin.hasMany(Blogs, {
    foreignKey: 'userlogin_id'
});

Text.hasMany(Blogs, {
    foreignKey: 'text_id'
});



module.exports = { Userlogin , Text , Blogs};