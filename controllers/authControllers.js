const dbClient = require('./../index');
const bcrypt = require('bcrypt');


async function signup(req, res) {
    // needs to add validation and encryption
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const passwordChangedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');;

    await dbClient.signup(username, email, hashedPassword, passwordChangedAt);
  

    res.status(201).json({
        success: true,
    });
}

function logout(req, res, next) {
    req.logOut();
    res.redirect('/');
}

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    
    next();
}

async function checkEditPerms(req, res, next) {
    const user = req.session.passport.user;
    const entry_id = req.path.substring(11);
    const entry = await dbClient.getEntry(entry_id);
    if (entry[0].user_id !== user) {
       
    }

    next();
}

async function checkDeletePerms(req, res, next) {
    const user = req.session.passport.user;
    const entry_id = req.path.substring(11);
    const entry = await dbClient.getEntry(entry_id);
    if (entry[0].user_id !== user) {
      
    }

    next();
}

exports.signup = signup;
exports.logout = logout;
exports.checkAuthenticated = checkAuthenticated;
exports.checkNotAuthenticated = checkNotAuthenticated;
exports.checkEditPerms = checkEditPerms;
exports.checkDeletePerms = checkDeletePerms;