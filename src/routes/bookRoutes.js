const express = require('express');

const bookController = require('../controllers/bookControllers');

const bookRouter = express.Router();

function router(nav) {
  const { getIndex, getById, middleware } = bookController(nav);
  bookRouter.use(middleware);
  bookRouter.route('/').get(getIndex);

  bookRouter.route('/:id').get(getById);

  return bookRouter;
}

module.exports = router;
