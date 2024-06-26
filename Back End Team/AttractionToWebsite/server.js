const express = require('express');
const cors = require('cors');
const db = require('./db'); // Assuming db.js is in the same directory

const app = express();
const port = 3005; // Ensure this matches your server port

app.use(cors());

// Example endpoint to fetch data
app.get('/api/data', async (req, res) => {
    try {
        const query = 'SELECT title, subtitle, address, cords FROM atlas_obscura_attractions'; // Replace with your table name
        const data = await db.query(query);

        if (data.length === 0) {
            res.status(404).json({ error: 'No data found' });
        } else {
            res.json(data);
        }
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});