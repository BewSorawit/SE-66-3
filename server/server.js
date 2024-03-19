const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const app = express()

app.use(cors());
app.use(express.json());

// Environment variables
const port = process.env.PORT || 8080 ;   
const dbConfig = {
    host: process.env.DB_HOST || 'localhost', 
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'test_se',
}

// Database connection
const db = mysql.createConnection(dbConfig);
   
db.connect((err) => {
    if(err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

app.get('/', (req, res) => {
    const sql = "SELECT * FROM user"; 
    db.query(sql, (err, result) => {
        if (err) {
            return res.json({ error: 'Internal Server Error' }); 
        }
        return res.json(result); 
    });
});

app.post('/user',(req,res) => { 
    const sql = " INSERT INTO user (`userID`, `firstName`,`surName`,`email`,`dateBirth`,`passwordUser` ) VALUES (?) " ;
    console.log(req.body)
    const values = [
        req.body.userid,
        req.body.firstname,
        req.body.surname,
        req.body.email,
        req.body.date,
        req.body.passworduser
    ]
    db.query(sql,[values],(err,result) => {
        if(err)  return res.json(err);
         return res.json(result); 
    })
})
app.put('/Edit/:id', (req, res) => {
    const sql = 'UPDATE user SET `userID`=?, `firstName`=?, `surName`=?, `email`=?, `dateBirth`=?, `passwordUser`=? WHERE ID=?';
    const id = req.params.id;
    const values = [
        req.body.userid,
        req.body.firstname,
        req.body.surname,
        req.body.email,
        req.body.date,
        req.body.passworduser,
        id // ใช้ ID ที่รับมาจาก URL
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating user:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        console.log('User updated successfully');
        return res.json({ message: 'User updated successfully' });
    });
});

app.delete('/delete/:id', (req, res) => { 
    const sql = "DELETE FROM user WHERE ID = ?";  
    const id = req.params.id;
    
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error deleting user:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        console.log('User deleted successfully');
        return res.json({ message: 'User deleted successfully' });
    });
});

app.listen(port,()=> {
    console.log("Listening...");
    console.log(`Server listening on port ${port}`);
})


