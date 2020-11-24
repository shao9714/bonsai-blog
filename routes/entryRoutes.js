const express = require('express');
const router = express.Router();

const entryControllers = require('./../controllers/entryControllers');

// add validation by middleware

router
  .route('/')
  .get(entryControllers.getAllEntries)
  .post(entryControllers.createEntry);

router
  .route('/:id')
  .get(entryControllers.getEntry)
  .patch(entryControllers.editEntry)
  .delete(entryControllers.deleteEntry);

module.exports = router;
