const router = require('express').Router();

// hook to routes
const usersRoutes = require('./userRoutes');
const thoughtsRoutes = require('./thoughtRoutes');

router.use('/users', usersRoutes);

router.use('/thoughts', thoughtsRoutes);

module.exports = router;