const router = require('express').Router();
const userloginRoutes = require('./userlogin-routes');
const textRoutes = require('./text-routes')
const blogsRoutes = require('./blogs.routes');

router.use('/userlogin', userloginRoutes);
router.use('/text', textRoutes)
router.use('/blogs', blogsRoutes)
module.exports = router;