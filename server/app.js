const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./user');
const connectDB = require("../config/db");
const port = 3000;


// Connect to mongoDB database
connectDB();

// MIDDLEWARE
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());

// Define passport strategy to handle user authentication
passport.use(new LocalStrategy(
  async function(username, password, done) {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }
      const isValidPassword = await user.checkPassword(password);
      if (!isValidPassword) {
        return done(null, false, { message: 'Incorrect password' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

// Initialize passport and enable session support
app.use(passport.initialize());
app.use(passport.session());

// Configure passport to serialize and deserialize user objects
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// ROUTES
app.get('/users', async (req, res) => {
  try { 
    const users = await User.find();
    res.json(users);
  } catch (err){
    console.log(err)
    res.status(500).json({error: 'Internal server error'});
  }
});

app.post('/users', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username});
    await user.setPassword(password);
    await user.save();
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({error: 'Internal server error'});
  }
})

app.post('/login', passport.authenticate('local'), function(req, res) {
  // This function is called if the authentication was successful
  res.json({ success: true, user: req.user });
});

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});



// Binds to port to listen for any connections
const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})

// On unhandledRejection error close server with exit code 1
process.on("unhandledRejection", err => {
  console.log(`An error occurred:  ${err.message}`)
  server.close(() => process.exit(1));
})