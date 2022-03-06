const router = require('express').Router();
const { Blogs } = require('../../models');

router.get('/', (req, res) => {
    Blogs.findAll()
    .then(dbBlogsData => res.json(dbBlogsData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    if(req.session) {
    Blogs.create({
        content: req.body.content,
        userlogin_id: req.body.userlogin_id,
        text_id: req.body.text_id
    })
    .then(dbBlogsData => res.json(dbBlogsData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
}
});

router.delete('/:id', (req, res) => {
    Blogs.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbBlogsData => {
        if(!dbBlogsData) {
            res.status(404).json({ message: 'No matches found'})
            return;
        }
        res.json(dbBlogsData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
module.exports = router;