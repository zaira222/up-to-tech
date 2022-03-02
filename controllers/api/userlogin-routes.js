const router = require('express').Router();
const { UserLogin } = require('../../models');


router.get('/', (req, res) => {
    UserLogin.findAll()
    .then(dbUserLoginData => res.json(dbUserLoginData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    UserLogin.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserLoginData => {
        if(!dbUserLoginData) {
            res.status(404).json({message: 'No matches were found'});
            return;
        }
        res.json(dbUserLoginData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    UserLogin.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserLoginData => res.json(dbUserLoginData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
    UserLogin.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(dbUserLoginData => {
        if(!dbUserLoginData[0]) {
            res.status(404).json({message: 'No matches found'})
            return;
        }
        res.json(dbUserLoginData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
    UserLogin.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserLoginData => {
        if(!dbUserLoginData) {
            res.status(404).json({ message: 'No matches found'})
            return;
        }
        res.json(dbUserLoginData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;