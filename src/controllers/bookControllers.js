const debug = require('debug')('app:bookController');
const { MongoClient, ObjectID } = require('mongodb');

function bookController(nav) {
  function getIndex(req, res) {
    const { user } = req;
    debug(req.body);
    const url = 'mongodb://localhost:27017';
    const dbName = 'demo';

    // eslint-disable-next-line wrap-iife
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('connected to DB');
        const db = client.db(dbName);
        const col = await db.collection('books');
        const books = await col.find().toArray();
        res.render('books', {
          nav,
          title: 'Library',
          books,
          user
        });
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    })();
  }

  function getById(req, res) {
    const { user } = req;
    const url = 'mongodb://localhost:27017';
    const dbName = 'demo';
    const { id } = req.params;

    // eslint-disable-next-line wrap-iife
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('connected to DB');
        const db = client.db(dbName);
        const col = await db.collection('books');
        const books = await col.findOne({ _id: new ObjectID(id) });
        res.render('bookViewList', {
          nav,
          title: 'Library',
          book: books,
          user
        });
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    })();
  }

  function middleware(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect('/auth/signIn');
    }
  }

  return {
    getIndex,
    getById,
    middleware
  };
}

module.exports = bookController;
