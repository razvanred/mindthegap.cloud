const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const FileRoutes = require('../controllers/files');

router.get('/', FileRoutes.getAll);

router.get('/:file', FileRoutes.getByFile);

router.post('/', checkAuth, FileRoutes.createOne);

module.exports = router;