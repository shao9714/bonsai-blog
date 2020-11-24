const localStrategy = require('passport-local').Strategy;

function initialize(passport, getUser, getUserById) {
    const authenticateUser = async (email, password, done) => {
        const user = await getUser(email);
        if (user == null) {
            return done(null, false, { message: "No user with that email" });
        }
        return done(null, user);
    }

    passport.use(new localStrategy({ usernameField: 'email' }, authenticateUser));

    passport.serializeUser((user, done) => {
        done(null, user[0].id)
    });

    passport.deserializeUser((id, done) => {
        done(null, getUserById(id));
    });
}

module.exports = initialize;