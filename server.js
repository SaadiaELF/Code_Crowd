// Dependencies
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

const routes = require ('./controllers');
const helpers = require ('./utils/helpers.js');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


// Require app
const app = express();

// Port
const PORT = process.env.PORT || 8000;

const hbs = exphbs.create({ helpers });

const sess = {
    secret: 'Super secret secret',

    //page idle for 30 mins
    cookie: {
        maxAge: 30 * 60 * 1000
    },
    rolling: true,
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// Make app listen on port
sequelize.sync({ force: true}).then(() => {

    app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
});
