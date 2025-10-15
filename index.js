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

app.post('/biodata', (req, res) => {
    const {Nama, Alamat, Agama } = req.body;
    if (!Nama || !Alamat || !Agama ) {
        return res.status(400).json({ error: 'Semua field wajib diisi.' });
    }
    const query = 'INSERT INTO biodata (Nama, Alamat, Agama ) VALUES (?, ?, ?)';
    db.query(query, [Nama, Alamat, Agama], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).json({ error: 'Gagal menambahkan data.' });
        } else {
            res.status(201).json({ message: 'Data biodata berhasil ditambahkan!', id: result.insertId });
        }
    });
});