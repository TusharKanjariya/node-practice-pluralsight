const express = require('express');
const debug = require('debug')('app:adminRoutes');
const { MongoClient } = require('mongodb');

const adminRouter = express.Router();

function router() {
  adminRouter.route('/').get((req, res) => {
    const url = 'mongodb://localhost:27017';
    const dbName = 'demo';

    // eslint-disable-next-line wrap-iife
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('connected to DB');
        const db = client.db(dbName);
        const response = await db.collection('books').insertMany(books);
        res.json(response);
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    })();
  });
  return adminRouter;
}

module.exports = router;
