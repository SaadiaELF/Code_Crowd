// Dependencies
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const compression = require('compression');

const routes = require('./controllers');
const helpers = require('./utils/helpers.js');
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

// compress all responses
app.use(compression());

// server-sent event stream
app.get('/events', function (req, res) {
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')

    // send a ping approx every 2 seconds
    var timer = setInterval(function () {
        res.write('data: ping\n\n')

        // !!! this is the important part
        res.flush()
    }, 2000)

    res.on('close', function () {
        clearInterval(timer)
    })
})

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// Make app listen on port
sequelize.sync({ force: false }).then(() => {


    app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
});
