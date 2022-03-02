const router = require('express').Router();
const userLoginRoutes = require('./userlogin-routes');


router.use('/userlogin', userLoginRoutes);

module.exports = router;