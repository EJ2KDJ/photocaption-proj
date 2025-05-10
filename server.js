const express = require('express');
const app = express();
const photoRoutes = require('./routes/photoRoutes');

// Middleware
app.use(express.json());
app.use(express.static('public')); // Serve static files

// Routes
app.use('/images', photoRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});