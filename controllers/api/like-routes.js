const router = require('express').Router();
const { User, Post, Like } = require('../../models');

// router.post('/login', (req, res) => {
//     console.log(req.body);
//     res.json('login info');
// });

// router.post('/', (req, res) => {
//     console.log(req.body);
//     res.json('signup info');
// });

// get all Attend
router.get('/', (req, res) => {
  Attend.findAll()
    .then(dbLikeData => res.json(dbLikeData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;