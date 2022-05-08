const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Like } = require('../models');
const withAuth = require('../utils/auth');

// get all games for dashboard
router.get('/', withAuth, (req, res) => {
    Post.findAll({
        attributes: [
          'id',
          'post_title',
          'post_date'
          [sequelize.literal('(SELECT COUNT(*) FROM like WHERE post.id = like.post_id)'), 'like_count']
        ]
      })
        .then(dbPostData => {

          const post = dbPostData.map(post => post.get({ plain: true }));

          const sortedPosts = post.sort(function(a, b) {
            const nameA = a.post_date;
            const nameB = b.post_date;
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
          
            // names must be equal
            return 0;
          });
          res.render('dashboard', { post, loggedIn: true });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    });

module.exports = router;

