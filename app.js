const express = require('express');
const path = require('path');
const session = require('express-session');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Session configuration
app.use(session({
    secret: 'water-level-monitoring-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/', require('./routes/index'));

// Start server
app.listen(PORT, () => {
    console.log(`Water Level Monitoring System running on http://localhost:${PORT}`);
});

module.exports = app;