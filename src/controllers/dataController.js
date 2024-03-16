// src/controllers/dataController.js

const db = require('../models/db');

const getData = async (req, res) => {
    try {
        const data = await db.query('SELECT * FROM public.users');
        res.json(data.rows);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const addData = async (req, res) => {
    const { name, id, number } = req.body;
    try {
        const newData = await db.query('INSERT INTO public.users (name, id, number) VALUES ($1, $2, $3) RETURNING *', [name, id, number]);
        res.status(201).json(newData.rows[0]);
    } catch (err) {
        console.error('Error adding data:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { getData, addData };
