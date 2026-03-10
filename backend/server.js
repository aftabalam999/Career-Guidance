const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/colleges', require('./routes/colleges'));
app.use('/api/tests', require('./routes/tests'));
app.use('/api/results', require('./routes/results'));

app.get('/', (req, res) => {
    res.send('API is running');
});

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
if (process.env.MONGO_URI) {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log('MongoDB connected');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    }).catch(err => {
        console.error('Database connection error:', err);
    });
} else {
    console.log('No MONGO_URI provided in environment, starting server without DB.');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}