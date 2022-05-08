const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Like } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            player_id: req.session.player_id
        },
        attributes: [
            'id',
            'post_title',
            'post_date'
            [sequelize.literal('(SELECT COUNT(*) FROM like WHERE post.id = attend.post_id)'), 'like_count']
        ],

    })
        .then(dbPostData => {
            // console.log(dbGameData, 'dbGameData logged');
            const posts = dbPostData.map(post => post.get({ plain: true }));
            // console.log(games);
            res.render('profile', { posts, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;