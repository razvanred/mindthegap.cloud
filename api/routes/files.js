const express = require('express');
const router = express.Router();

const File = require('../models/file');

router.get('/', (req, res, next) => {
    File.find().select('description _id contributors').exec().then(docs => {
        res.status(200).json(docs);
    }).catch(err => res.status(500).json({ error: err }));
});

router.get('/:file', (req, res, next) => {
    File.find({ _id: { file: req.params.file } }).select('description _id contributors').exec().then(result => {
        res.status(200).json(result);
    }).catch(err => res.status(500).json({ error: err }));
});

router.post('/', (req, res, next) => {
    const file = new File(req.body);
    file.save().then(result => {
        res.status(201).json(result);
    }).catch(err => res.status(500).json({ error: err }));
});

module.exports=router;