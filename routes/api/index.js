const router = require('express').Router();

// hook to routes
const userRoutes = require('./userRoutes');
const thoughtsRoutes = require('./thoughtRoutes');

router.use('/users', userRoutes);

router.use('/thoughts', thoughtsRoutes);

module.exports = router;