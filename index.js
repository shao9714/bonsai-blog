const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const initializePassport = require('./passport-config');
const methodOverride = require('method-override');
const MySqlClient = require('./utils/mySqlClient');
const dbClient = new MySqlClient('localhost', 'root', 'password', 'bonsai');
module.exports = dbClient;


initializePassport(passport, 
    email => {
        return dbClient.getUser(email);
    }, 
    async(id) => {
        return await dbClient.getUserById(id);
    });
app.use(flash());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

const entryRouter = require('./routes/entryRoutes');
const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewRoutes');

app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(`${__dirname}/public`));
app.use(methodOverride('_method'));

app.engine('pug', require('pug').__express);
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use('/api/v1/entries', entryRouter);
app.use('/api/v1/users', userRouter);
app.use('/', viewRouter);

app.listen(8000, function() {
    console.log("Listening on port 8000!");
});