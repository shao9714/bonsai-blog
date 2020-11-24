const dbClient = require('./../index');
const jwt = require('jsonwebtoken');

const signToken = email => {
    return jwt.sign({ email }, 'secret', {
        expiresIn: '14d'
    });
}

async function signup(req, res) {
    // needs to add validation and encryption
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const passwordChangedAt = req.body.passwordChangedAt;

    await dbClient.signup(username, email, password, passwordChangedAt);
    const token =signToken(email);

    res.status(201).json({
        success: true,
        data: {
            token
        }
    });
}

// async function login(req, res) {
//     const email = req.body.email;
//     const password = req.body.password;

//     const user = await dbClient.login(email, password);

//     if (!user) {
//         console.log("User not found.");
//         return next();
//     }

//     const token = signToken(user.email);
//     res.status(201).json({
//         success: true,
//         data: {
//             user,
//             token
//         }
//     });
// }

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

exports.signup = signup;
// exports.login = login;
exports.logout = logout;
exports.checkAuthenticated = checkAuthenticated;
exports.checkNotAuthenticated = checkNotAuthenticated;