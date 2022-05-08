const router = require('express').Router();
const userRoutes = require('./user-routes');
const gameRoutes = require('./post-routes');
const attendRoutes = require('./like-routes')

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/likes', likeRoutes);

module.exports = router;
