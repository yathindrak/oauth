const express = require('express');
const authRoutes = require('./routes/auth.routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport =require('passport');

const Keys = require('./config/keys');

const app = express();
const PORT = 3000;
// set up view engine
app.set('view engine', 'ejs');

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    keys: [Keys.session.cookieKey]
}));

// init passport
app.use(passport.initialize());
app.use(passport.session());

// connect to mongodb
mongoose.connect(Keys.mongodb.dbUri, () => {
    console.log('connected to mongodb');
});

app.use('/auth',authRoutes);

// create home route
app.get('/', (req,res) => {
    console.log(req.user);
    res.render('home');
});

app.listen(PORT, ()=>{
    console.log("Listening on port ", PORT);
});