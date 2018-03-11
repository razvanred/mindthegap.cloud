const jwt = require('jsonwebtoken');

const Contributor = require('../models/contributor');

module.exports = (req, res, next) => {
    try {

        const token = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT);

        Contributor.findById(token.contributorId).exec().then(result => {
            if (result) {
                req.contributor = token;
                next();
            } else {
                res.status(401).json({ message: 'Auth failed' });
            }
        });

    } catch (err) {
        res.status(401).json({ message: 'Auth failed' });
        console.error(err);
    }

};