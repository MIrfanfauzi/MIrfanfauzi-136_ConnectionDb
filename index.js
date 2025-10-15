const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.json());


const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    port: '3309',
    password: 'irfanfauzi',
    database: 'mahasiswa' 
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack);
        return;
    }
    console.log('Connected to MySQL successfully.');
});

app.get('/', (req, res) => {
    res.send('Hello World! API Biodata aktif 🚀');
});


app.get('/biodata', (req, res) => {
    const query = 'SELECT * FROM biodata';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data.' });
        } else {
            res.status(200).json(results);
        }
    });
});

