const router = require('express').Router();
const {Userlogin, Text , Blogs} = require('../models');

router.get('/', (req, res) => {
    console.log(req.session);
    Text.findAll({
        attributes:['id', 'title', 'created_at'],
        include: [
            {
                model: Blogs,
                attributes: ['id','content', 'userlogin_id', 'text_id'],
                include: {
                    model: Userlogin,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(dbTextData => {
        const text = dbTextData.map(text => text.get({ plain: true}));

        res.render('homepage', 
        { text });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
        });
    });

    router.get('/login', (req, res) => {
        if(req.session.loggedIn) {
            res.redirect('/');
            return;
        }
        res.render('login');
    });

module.exports = router;