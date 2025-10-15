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