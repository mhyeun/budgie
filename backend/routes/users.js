const router = require('express').Router();
const bcrypt = require('bcryptjs');

let User = require('../models/user.model');

// GET requests on /users/
router.route('/').get((req, res) => {
    User.find()
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err));
});

// POST requests
router.route('/add').post((req, res) => {
    User.findOne({username: req.body.username})
      .then(user => {
        // check if username is unique
        if (user){
          throw new Error('Username already exists.')
        }
        // if username is unique
        const username = req.body.username;

        bcrypt
        .hash(req.body.password, 12)
        .then(hashedPassword => {
          const newUser = new User({
            username,
            hashedPassword
          });
      
          newUser.save()
            .then(() => res.json('User added!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
});

// GET specific user
router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
      .then(user => {
        let userInfo = user;
        userInfo.password = null;
        
        res.json(userInfo);
      })
      .catch(err => res.status(400).json('Error: ' + err));
});

// DELETE specific user
router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
      .then(() => res.json('User deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
})

// UPDATE user
router.route('/update/:id').post((req, res) => {
    User.findOne({username: req.body.newUsername})
      .then(user => {
        if (user) {
          throw new Error('Username already exists.')
        }
        User.findById(req.params.id)
          .then(user => {
            bcrypt
            .hash(req.body.password, 12)
            .then(hashedPassword => {
              user.username = req.body.username;
              user.password = hashedPassword;
  
              user.save()
                .then(() => res.json('User updated.'))
                .catch(err => res.status(400).json('Error: ' + err));
            })
            .catch(err => console.error(err))
        })
        // findById catch
        .catch(err => res.status(400).json('Error: ' + err));
      })
    .catch(err => console.error(err));
});

module.exports = router;