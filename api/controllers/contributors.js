const Contributor = require('../models/contributor');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

module.exports = {
    createOne: (req, res, next) => {
        Contributor.find({ email: req.body.email }).exec().then(result => {
            if (result.length >= 1)
                res.status(409).json({ message: 'Email already exists!' });
            else {
                Contributor.find({ username: req.body.username }).exec().then(result => {
                    if (result.length >= 1)
                        res.status(409).json({ message: 'Username already exists!' });
                    else {
                        console.log('connected');
                        bcrypt.hash(req.body.password, 10, (err, hash) => {
                            if (err) {
                                return res.status(500).json({
                                    error: err
                                });
                            } else {
                                const contributor = new Contributor({
                                    _id: new mongoose.Types.ObjectId(),
                                    details: req.body.details,
                                    email: req.body.email,
                                    username: req.body.username,
                                    password: hash
                                });
                                console.log(contributor);
                                contributor.save().then(result => {
                                    res.status(201).json({ message: "ok" });
                                }).catch(err => {
                                    console.error(err);
                                    res.status(500).json({ error: err })
                                });

                            }
                        });
                    }
                }).catch(err => res.status(409));
            }

        }).catch(err => res.status(500).json({ error: err }));
    },
    login: (req, res, next) => {
        Contributor.find({ email: req.body.email }).exec().then(contributor => {
            if (contributor.length < 1)
                res.status(401).json({ message: 'Auth failed!' });
            else {
                bcrypt.compare(req.body.password, contributor[0].password, (err, result) => {
                    if (err || !result) {
                        console.error(err);
                        return res.status(401).json({ message: 'Auth failed!' });
                    } else {
                        return res.status(200).json({
                            message: 'Auth successful!',
                            token: jwt.sign({
                                contributorId: contributor[0]._id
                            }, process.env.JWT, { expiresIn: "1h" })
                        })
                    }
                });
            }
        }).catch(err => genericError(err, res));
    },
    getById: (req, res, next) => {
        Contributor.findById(req.params.id).select('_id details joinDate username email').exec().then(docs => {
            res.status(200).json(docs);
        }).catch(err => res.status(500).json({ error: err }));
    },
    getAll: (req, res, next) => {
        Contributor.find().select('_id details joinDate email username').exec().then(docs => {
            res.status(200).json(docs);
        }).catch(err => res.status(500).json({ error: err }));
    },
    deleteMe: (req, res, next) => {
        //Contributor.remove({ username: req.params.username }).exec().then(result => {
        /*Contributor.find({ username: req.body.username }).exec().then(contributor => {
            if (contributor.length < 1)
                return res.status(404).json({ message: 'Not found' });
            else {
                if(user[0]._id===req.contributor.contributorId){*/
                    Contributor.findByIdAndRemove(req.contributor.contributorId).exec().then(result=>{
                        res.status(200).json({message:'Removed'});
                    }).catch(err=>genericError(err,res));
      /*          }else{
                    return res.status(403).json({message:'Forbidden'});
                }
            }
        })*/
        //}).catch(err => genericError(err, res));
    },
    clearAll: (req, res, next) => {
        Contributor.remove().exec().then(res.status(200).json({ message: "ok" }))
            .catch(err => genericError(err, res));
    }
}

function genericError(err, res) {
    console.error(err);
    res.status(500).json({ error: err });
}