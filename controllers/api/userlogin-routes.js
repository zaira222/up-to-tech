const router = require('express').Router();
const { Userlogin } = require('../../models');
const {  Text} = require('../../models');
const { Blogs } = require('../../models');


router.get('/', (req, res) => {
    Userlogin.findAll({
        attributes: { exclude: ['password']}
    })
    .then(dbUserloginData => res.json(dbUserloginData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    Userlogin.findOne({
        attributes: { exclude: ['password']},
        where: {
            id: req.params.id
        }, 
        include: [
            {
            model: Text,
            attributes: ['id', 'title', 'Userlogin_id', 'created_at'],
            },
            {
                model: Blogs,
                attributes: ['id', 'content', 'Userlogin_id', 'text_id'],
                include: {
                    model: Text, 
                    attributes: ['title']
                }
            },
            
        ]
    })
    .then(dbUserloginData => {
        if(!dbUserloginData) {
            res.status(404).json({message: 'No matches were found'});
            return;
        }
        res.json(dbUserloginData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    Userlogin.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserloginData => res.json(dbUserloginData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post ('/login', (req, res) => {
    Userlogin.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUserloginData => {
        if(!dbUserloginData) {
            res.status(400).json({ message: 'No matches found with that email'})
            return;
        }

        const validPassword = dbUserloginData.checkPassword(req.body.password);
        if(!validPassword) {
            res.status(400).json({message: 'Password doesnt match!'});
            return;
        }
        res.json({ user: dbUserloginData, message: 'Password matched our records'});
    });
})

router.put('/:id', (req, res) => {
    Userlogin.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbUserloginData => {
        if(!dbUserloginData[0]) {
            res.status(404).json({message: 'No matches found'})
            return;
        }
        res.json(dbUserloginData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
    Userlogin.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserloginData => {
        if(!dbUserloginData) {
            res.status(404).json({ message: 'No matches found'})
            return;
        }
        res.json(dbUserloginData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;