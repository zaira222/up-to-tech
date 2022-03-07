const Text = require('./Text');
const Blogs = require('./Blogs');

const Userlogin = require('../models/Userlogin');
Userlogin.hasMany(Text, {
    foreignKey: 'Userlogin_id',
  
});

Text.belongsTo(Userlogin, {
    foreignKey: 'Userlogin_id',

});


Blogs.belongsTo(Userlogin, {
    foreignKey: 'Userlogin_id',
});

Blogs.belongsTo(Text, {
    foreignKey: 'text_id',
});

Userlogin.hasMany(Blogs, {
    foreignKey: 'Userlogin_id'
});

Text.hasMany(Blogs, {
    foreignKey: 'text_id'
});



module.exports = { Userlogin , Text , Blogs};