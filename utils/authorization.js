const withAuth = (req, res, next) => {
    if(!req.session.userlogin_id) {
        res.redirect('/login');

    } else {
        next();
    }
};

module.exports = withAuth;