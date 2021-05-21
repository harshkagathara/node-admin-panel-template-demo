
module.exports = (req, res, next) => {
    if (!req.session.UserId) {
        res.redirect('/auth-login')
    } else {
        next();
    }
}
