const router = require('express').Router();
const { Text,  Userlogin, Blogs } = require('../../models');
const withAuth = require('../../utils/authorization');

router.get('/', (req, res) => {
    Text.findAll({
        attributes: ['title', 'created_at'],
        include: [
            {
                model: Blogs,
                attributes: ['id', 'content', 'userlogin_id', 'text_id'],
                include: {
                    model: Userlogin, 
                    attributes: ['username']
            },
        },
        {
                model: Userlogin,
                attributes: ['username']
            
            }
        
        ]
    })
    .then(dbTextData => res.json(dbTextData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


router.get('/:id', (req, res) => {
    Text.findOne({
        where: {
            id: req.params.id
        }, 
        attributes: ['id', 'title', 'created_at'],
        include: [ 
            {
                model: Blogs,
                attributes: ['id', 'content', 'userlogin_id', 'text_id'],
                include: {
                    model: Userlogin, 
                    attributes: ['username']
            },
        },
        {
                model: Userlogin,
                attributes: ['username']
                
                
            }
        ]
    }).then(dbTextData =>  {
        if(!dbTextData) {
            res.status(404).json({message: 'No matches with this id'});
            return;
        }
        res.json(dbTextData);

    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/',  (req, res) => {
    Text.create({
        title: req.body.title,
        content: req.body.content,
        userlogin_id: req.session.userlogin_id,
        Userlogin_id: req.body.Userlogin_id

    })
    .then(dbTextData => res.json(dbTextData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', withAuth, (req, res) => {
    Text.update(
        {
            title: req.body.title
        },
        {
            where: {
                id: req.params.id
            }
        }
    ).then(dbTextData => {
        if(!dbTextData) {
            res.status(404).json({message: 'No text found with this id'});
            return;
        }
        res.json(dbTextData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});




router.delete('/:id', withAuth, (req, res) => {
    Text.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbTextData => {
        if(!dbTextData) {
            res.status(404).json({message: 'No text matches this id'});
            return;
        }
        res.json(dbTextData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;