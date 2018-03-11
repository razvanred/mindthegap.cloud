const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const ContributorRoutes = require('../controllers/contributors');

router.get('/', ContributorRoutes.getAll);
router.get('/:id', ContributorRoutes.getById);

router.post('/signup', ContributorRoutes.createOne);
router.post('/login', ContributorRoutes.login);

router.delete('/all', ContributorRoutes.clearAll);
router.delete('/', checkAuth, ContributorRoutes.deleteMe);

module.exports = router;