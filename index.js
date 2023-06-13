import path, {resolve} from 'path';
import express, {query} from 'express';
import mysql from 'mysql';
import bodyParser from 'body-parser';
import session from 'express-session';
import crypto from 'crypto';

const PORT = 8080;
const app = express();

app.listen(PORT, () => {
    console.log(`Port ${PORT} is Ready!`);
});
app.set('view engine','ejs');
app.use(express.static(path.resolve('public')));
app.use(express.urlencoded({extended:true}))


//-------Session-------
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
    })
)


//-------Connect to DB-------
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


//-------Query untuk DB-------
const getLoginAdmin = (conn, user, pass) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM adminbl WHERE username = '${user}' AND pass = '${pass}'`, (err, result) => {
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

const getLoginMember = (conn, user, pass) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM pelanggan WHERE username = '${user}' AND pass = '${pass}'`, (err, result) => {
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

const getNamaMember = (conn, user) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT namaP FROM pelanggan WHERE username = '${user}'`, (err, result) => {
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

const getNamaAdmin = (conn, user) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT namaA FROM adminbl WHERE username = '${user}'`, (err, result) => {
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}


//-------Router Login-------
app.get('/login',async (req,res) =>{
    let arr = "";
    res.render('login', {arr})
});

app.post('/login', async(req, res) => {
    const conn = await dbConnect();
    const {user, pass} = req.body;
    const hashed_pass = crypto.createHash('sha256').update(pass).digest('base64');
    let arr = "";
    // console.log(hashed_pass);
    if(user.length > 0 && pass.length > 0){
        // untuk memastikan admin atau member yang login
        const admin = await getLoginAdmin(conn, user, hashed_pass)
        const member = await getLoginMember(conn, user, hashed_pass)
        // console.log(member)
        if(member.length > 0){
            // untuk member jika login
            const getNama = await getNamaMember(conn, user)
            req.session.nama = getNama[0].namaP;
            // console.log(getNama)
            req.session.username = user;
            res.redirect('/homeMember')
        }
        else if(admin.length > 0){
            // untuk admin jika login
            const getNama = await getNamaAdmin(conn, user)
            req.session.nama = getNama[0].namaA;
            // console.log(getNama)
            req.session.username = user;
            res.redirect('/homeAdmin')
        }
        else{
            arr = "Username atau Password salah!";
            res.render('login', {arr})
        }
    }
});


//-------Router Member-------
app.get('/',async (req,res) =>{
    let arr = "";
    res.render('homePelanggan')
});

app.get('/homeMember', async(req, res) => {
    const conn = await dbConnect();
    const nama = req.session.nama;
    conn.release();
    res.render('homeMember', {
        nama
    });
});

app.get('/history', async (req,res) => {
    const conn = await dbConnect();
    const nama = req.session.nama;
    conn.release();
    res.render('history', {
        nama
    });
});