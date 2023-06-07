import path from 'path';
import express from 'express';
import mysql from 'mysql';

const PORT = 8080;
const app = express();

app.listen(PORT, () => {
    console.log(`Port ${PORT} is Ready!`);
});
app.set('view engine','ejs');
app.use(express.static(path.resolve('public')));

//Connect to DB
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tubes'
});

const dbConnect = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if(err){
                reject(err);
            }
            else{
                resolve(conn);
            }
        })
    })
}

app.get('/',async (req,res) =>{
    res.render('login')
});

app.get('/homeAdmin', async (req,res) => {
    res.render('homeAdmin')
});

app.get('/laporanAdmin', async (req,res) => {
    res.render('manageLaporanAdmin')
});

app.get('/login',async (req,res) =>{
    res.render('login2')
});