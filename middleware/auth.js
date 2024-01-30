const { validateToken } = require('../lib/auth')

exports.checkForAuthentication = (req, res, next) => {

    const token = req.cookies['token'];

    if (!token) {
        req.user = null;
        return next();
    }

    const userPayload = validateToken(token);

    req.user = userPayload

    return next()

}

exports.ensureAuthenticated = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ error: 'You must be authenticated!' })
    }

    return next()
}