// src/app.js

const express = require('express');
const dataRoutes = require('./routes/dataRoutes');
const db = require('./models/db');

const app = express();

app.use(express.json());
app.use('/api', dataRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {

    try {
        // Run a simple test query to verify the connection
        const result = await db.query('SELECT 1');
        console.log('Database connected successfully!');
        console.log('Server is running on port', PORT);
    } catch (error) {
        console.error('Error connecting to database:', error);
        // Exit the process if there's an error connecting to the database
        process.exit(1);
    }
});

module.exports = app;
