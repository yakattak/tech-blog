const router = require('express').Router();
const { Post, Like, User } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');

router.get('/', (req, res) => {

  console.log('hi')
  Post.findAll()
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // expects =>   { "game_type": "Baseball", "game_date": "5/25/2022", "game_time": "19:00", "game_venue": "East Side Park", "player_id": 2 },
  console.log(req.body);
  Game.create({
    post_title: req.body.title,
    user_id: req.session.user_id
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.put('/like', withAuth, (req, res) => {

    // custom static method created in models/Game.js
    Post.like({...req.body, user_id: req.session.user_id}, { Post, Like, User })

      .then(updatedLikeData => res.json(updatedLikeData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
