const express = require('express');
const app = express();
const photoRoutes = require('./routes/photoRoutes');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');

// Middleware
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());

// Routes
app.use('/images', photoRoutes);
app.use('/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});