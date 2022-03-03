const router = require('express').Router();
const userloginRoutes = require('./userlogin-routes');


router.use('/userlogin', userloginRoutes);

module.exports = router;