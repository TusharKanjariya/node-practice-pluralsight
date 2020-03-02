const express = require('express');
const debug = require('debug')('app:adminRoutes');
const { MongoClient } = require('mongodb');

const adminRouter = express.Router();
const books = [
  {
    title: 'Antidorcas marsupialis',
    genre: 'Isosorbide',
    author: 'Jeth Mawtus',
    read: false
  },
  {
    title: 'Spermophilus tridecemlineatus',
    genre: 'Bupropion Hydrochloride',
    author: 'Augusto Mensler',
    read: false
  },
  {
    title: 'Milvus migrans',
    genre: 'multi symptom cold plus',
    author: 'Kelly Nowill',
    read: false
  },
  {
    title: 'Sula nebouxii',
    genre: 'SODIUM CHLORIDE',
    author: 'Heddie Considine',
    read: true
  },
  {
    title: 'Lasiorhinus latifrons',
    genre: 'Labetalol hydrochloride',
    author: 'Abigail Garnall',
    read: false
  },
  {
    title: 'Anas punctata',
    genre: 'Rimmel London',
    author: 'Tracey Arrault',
    read: false
  },
  {
    title: 'Ardea golieth',
    genre: 'Rite Aid Cold Sore Treatment',
    author: 'Hildagarde Pasby',
    read: false
  },
  {
    title: 'Phalaropus fulicarius',
    genre: 'Fluoxetine Hydrochloride',
    author: 'Carlos Rorke',
    read: true
  },
  {
    title: 'Cynomys ludovicianus',
    genre: 'Stimulant Laxative',
    author: 'Ninnetta Wolford',
    read: false
  },
  {
    title: 'Spilogale gracilis',
    genre: 'NeoStrata Ultra Daytime Smoothing',
    author: 'Elsy Lusk',
    read: true
  }
];

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
