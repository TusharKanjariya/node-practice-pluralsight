const express = require('express');
const debug = require('debug')('app:authRoutes');
const { MongoClient } = require('mongodb');
const passport = require('passport');

const authRouter = express.Router();
function router(nav) {
  authRouter.route('/signUp').post((req, res) => {
    const { username, password } = req.body;
    const url = 'mongodb://localhost:27017';
    const dbName = 'demo';

    // eslint-disable-next-line wrap-iife
    (async function addUser() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connceted to Database');
        const db = client.db(dbName);

        const col = db.collection('users');
        const user = { username, password };
        const result = await col.insertOne(user);
        debug(req.body);
        req.login(result.ops[0], () => {
          res.redirect('/auth/profile');
        });
        debug(req.body);
      } catch (err) {
        debug(err);
      }
    })();
  });

  authRouter
    .route('/signIn')
    .get((req, res) => {
      const { user } = req;
      debug(req.body);
      res.render('signin', {
        nav,
        title: 'Sign In',
        user
      });
    })
    .post(
      passport.authenticate('local', {
        successRedirect: '/books/',
        failureRedirect: '/auth/signIn'
      })
    );

  authRouter
    .route('/profile')
    .all((req, res, next) => {
      if (req.user) {
        next();
      } else {
        res.redirect('/');
      }
    })
    .get((req, res) => {
      const { user } = req;
      res.render('profile', {
        nav,
        user,
        title: 'Profile'
      });
    });

  authRouter.route('/logout').get((req, res) => {
    req.logOut();
    res.redirect('/auth/signIn');
  });
  return authRouter;
}

module.exports = router;
