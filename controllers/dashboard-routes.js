const router = require('express').Router();
const sequelize = require('../config/connection');
const {Blogs, Text, Userlogin} = require('../models');
const withAuth = require('../utils/authorization');

router.get('/', withAuth, (req, res) => {
    Text.findAll({
        where: {
        userlogin_id: req.session.userlogin_id
    },
    attributes: ['id', 'title','created_at'],
    include: [
    {
        model: Blogs,
        attributes: ['id', 'content', 'userlogin_id', 'text_id'],
        include: {
            model: Userlogin,
            attributes: ['username']
        }
    },
    {
        model: Userlogin,
        attributes: ['username']
    }
]
    }).then(dbTextData => {
        const text = dbTextData.map(text => text.get({ plain: true}));
        res.render('dashboard', { text, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/edit/:id', withAuth, (req,res) => {
    Text.findByPk(req.params.id, {
        attributes: ['id', 'title', 'created_at'],
        include: [
            {
            model: Blogs,
            attributes: ['id', 'content', 'userlogin_id', 'text_id'],
            include: {
                model: Userlogin,
                attributes: ['username']
            }
        },
        {
            model: Userlogin,
            attributes: ['username']
        }
        ]
    }).then(dbTextData => {
        if(dbTextData) {
            const text = dbTextData.get({plain: true});

            res.render('update', {
                text,
                loggedIn: true
            });

        } else {
            res.status(404).end();
        }
    }).catch(err => {
        res.status(500).json(err);
    });
});

module.exports = router;