const jwt = require('jsonwebtoken')

const Authorized = (req, res) => {
    const token = req.header('x-auth-token')
    if(!token) {
        res.status(403).json('unauthorized')
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        next()
    } catch (error) {
        res.status(405).json({msg: 'Invalid token'})
    }
}

module.exports = Authorized