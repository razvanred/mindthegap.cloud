const File = require('../models/file');

module.exports = {
    getAll: function (req, res, next) {
        File.find().select('description _id contributor').populate('contributor','username').exec().then(docs => {
            res.status(200).json(docs);
        }).catch(err => res.status(500).json({ error: err }));
    },
    getByFile: function (req, res, next) {
        File.find({ _id: { file: req.params.file } }).select('description _id contributor').exec().then(result => {
            res.status(200).json(result);
        }).catch(err => res.status(500).json({ error: err }));
    },
    createOne: function (req, res, next) {

        console.log(req.contributor);
        const file = new File({
            _id: req.body._id,
            description: req.body.description,
            contributor: req.contributor.contributorId
        });

        file.save().then(result => {
            res.status(201).json({ message: "ok" });
        }).catch(err => {
            console.error(err);
            res.status(500).json({ error: err });
        });

        /*const file = new File(req.body);
        file.save().then(result => {
            res.status(201).json(result);
        }).catch(err => res.status(500).json({ error: err }));*/
    }
}