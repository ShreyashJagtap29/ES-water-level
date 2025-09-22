const express = require('express');
const router = express.Router();

// Demo credentials
const DEMO_USERNAME = 'admin';
const DEMO_PASSWORD = 'water123';

// Middleware to check authentication
const requireAuth = (req, res, next) => {
    if (req.session.isAuthenticated) {
        next();
    } else {
        res.redirect('/');
    }
};

// Login page (home route)
router.get('/', (req, res) => {
    if (req.session.isAuthenticated) {
        return res.redirect('/dashboard');
    }
    res.render('login', { error: null });
});

// Handle login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // Display login attempt in terminal
    console.log(' LOGIN ATTEMPT:');
    console.log(' Username entered:', username);
    console.log(' Password entered:', password);
    
    if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
        req.session.isAuthenticated = true;
        req.session.username = username;
        console.log('✅ LOGIN SUCCESSFUL for user:', username);
        res.redirect('/dashboard');
    } else {
        console.log('❌ LOGIN FAILED - Invalid credentials');
        res.render('login', { error: 'Invalid username or password' });
    }
});


// Dashboard (company info page)
router.get('/dashboard', requireAuth, (req, res) => {
    res.render('dashboard', { username: req.session.username });
});

// Project documentation page
router.get('/documentation', requireAuth, (req, res) => {
    res.render('documentation');
});

// API endpoint for water level data (simulated)
router.get('/api/water-level', requireAuth, (req, res) => {
    // Simulate water level data
    const currentLevel = Math.floor(Math.random() * 100) + 1;
    const status = currentLevel > 80 ? 'High' : currentLevel > 50 ? 'Normal' : 'Low';
    const timestamp = new Date().toISOString();
    
    res.json({
        level: currentLevel,
        status: status,
        timestamp: timestamp,
        maxCapacity: 100,
        unit: '%'
    });
});

// Logout
router.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;