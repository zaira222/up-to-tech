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

        res.render('homepage', {
        text,
        loggedIn: req.session.loggedIn
        });
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

    router.get('/signup', (req, res) => {
        if(req.session.loggedIn) {
            res.redirect('/');
            return;
        }
        res.render('signup');
    });
    

    router.get('/text/:id', (req, res) => {
        Text.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'title',
                'created_at'
            ],
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
            if(!dbTextData) {
                res.status(404).json({message: 'No matches found'});
                return;
            }
            const text = dbTextData.get({ plain: true });
            res.render('text', {
                text,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    });

    
router.get('/logout', (req, res) => {
    res.redirect('/login')
})





module.exports = router;