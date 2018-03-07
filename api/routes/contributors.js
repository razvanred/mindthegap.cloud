const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Contributor = require('../models/contributor');

router.get('/', (req, res, next) => {
    Contributor.find().select('_id details joinDate email username').exec().then(docs => {
        res.status(200).json(docs);
    }).catch(err=>res.status(500).json({error:err}));
});

router.get('/:id',(req,res,next)=>{
    Contributor.findById(req.body.id).select('_id details joinDate username email').exec().then(docs=>{
        res.status(200).json(docs);
    }).catch(err=>res.status(500).json({error:err}));
});

router.post('/', (req, res, next) => {
    const contributor = new Contributor({
        _id: new mongoose.Types.ObjectId(),
        details: req.body.details,
        email: req.body.email,
        username: req.body.username
    });
    console.log(contributor);
    contributor.save().then(result => {
        res.status(201).response(result);
    }).catch(err=>res.status(500).json({error:err}));
});

module.exports=router;