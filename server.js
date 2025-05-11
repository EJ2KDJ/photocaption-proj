const express = require('express');
const app = express();
const photoRoutes = require('./routes/photoRoutes');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/swagger.yaml');

// Middleware
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());

// Routes
app.use('/images', photoRoutes);
app.use('/auth', authRoutes);

app.use('/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});