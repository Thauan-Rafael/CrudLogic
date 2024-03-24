const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();
app.use(express.urlencoded({ extended: true}));
app.use(cors())

app.listen(3000, () => {
    console.log('App running on port 3000');
})
app.get('/createCard/:title/:text/:color', (req,res) => {
    cardTitle = req.params.title;
    cardText = req.params.text;
    cardColor = req.params.color;
    pool.query('INSERT INTO cards (title,text,color) VALUES (?,?,?)',[cardTitle,cardText,cardColor], (error) => {
        if (error) {console.error('Error executing query:', error);}
        else{res.json()}
      });
})
app.get('/checkCards', (req,res) => {
    pool.query('SELECT * FROM cards', (error, results) => {
        if (error) {
          console.error('Error checking row in database:', error);
          return;
        }
        if (results.length > 0) {res.json({ exists: true, rows: results });} 
        else {res.json({ exists: false });}
    });
})
app.get('/updateCard/:id/:title/:text/:color', (req,res) => {
    cardTitle = req.params.title;
    cardText = req.params.text;
    cardColor = req.params.color;
    pool.query('UPDATE cards SET title=?, text=?, color=? WHERE id=?',[cardTitle, cardText, cardColor, req.params.id],(error, results) => {
        if(error){console.error('Error in updating card:', error)}
        else{res.json()}
    })
})
app.get('/deleteCard/:id', (req,res) => {
    pool.query(`DELETE FROM cards WHERE id=${req.params.id}`,(error,results) =>{
        if(error){console.error('Error in deleting card:', error)}
        else{res.json()}
    })
})
const pool = mysql.createPool({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
  });
  