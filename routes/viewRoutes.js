const express = require('express');
const passport = require('passport');

const router = express.Router();

const viewControllers = require('./../controllers/viewControllers');
const authControllers = require('./../controllers/authControllers');

router.get('/', viewControllers.getHomePage)

router
  .route('/entry/:id')
  .get(viewControllers.getEntry);

router
  .route('/entry')
  .get(authControllers.checkAuthenticated, viewControllers.displayEntryForm)
  .post(authControllers.checkAuthenticated, viewControllers.createEntry)

router
  .route('/editEntry/:id')
  .get(authControllers.checkAuthenticated, viewControllers.displayEditForm)
  .patch(authControllers.checkAuthenticated, viewControllers.editEntry);

router
  .route('/deleteEntry/:id')
  .delete(viewControllers.deleteEntry);

router
  .route('/search')
  .get(viewControllers.getTags);

router
  .route('/about')
  .get(viewControllers.getAboutPage);

router
  .route('/account')
  .get(authControllers.checkAuthenticated, viewControllers.getAccountPage);

router  
  .route('/signup')
  .get(authControllers.checkNotAuthenticated, viewControllers.getSignup)
  .post(authControllers.checkNotAuthenticated, authControllers.signup);

router
  .route('/login')
  .get(authControllers.checkNotAuthenticated, viewControllers.getLogin)
  .post(authControllers.checkNotAuthenticated,
    passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }));

router
  .route('/logout')
  .delete(authControllers.checkAuthenticated, authControllers.logout);

module.exports = router;