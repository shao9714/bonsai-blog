const express = require('express');
const router = express.Router();

const userControllers = require('./../controllers/userControllers');

// add validation by middleware

router
  .route('/')
  .get(userControllers.getAllUsers)
  .post(userControllers.createUser);

router
  .route('/:id')
  .get(userControllers.getUser)
  .patch(userControllers.editUser)
  .delete(userControllers.deleteUser);

module.exports = router;