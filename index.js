import path, {resolve} from 'path';
import express, {query} from 'express';
import mysql from 'mysql';
import bodyParser from 'body-parser';
import session from 'express-session';

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
const getLoginDosen = (conn, user, pass) => {
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


//-------Router Login-------
app.get('/',async (req,res) =>{
    res.render('login')
});


//-------Router Member-------
app.post('/', async(req, res) => {
    const {user,pass} = req.body
    const conn = await dbConnect();
    const login = await getLoginMember(conn, user, pass)
    if(login.length > 0){
        req.session.loggedin = true;
        req.session.username = user;
            res.redirect('/homePelanggan')
    }
    else{
        res.send('<script>alert("Invalid username or password.");</script>')
        // res.redirect('/')
    }
});

app.get('/homePelanggan', async(req, res) => {
    const conn = await dbConnect();
    const nama = req.session.username;
    conn.release();
    res.render('homePelanggan', {
        nama
    });
});

app.get('/history', async (req,res) => {
    const conn = await dbConnect();
    const nama = req.session.username;
    conn.release();
    res.render('history', {
        nama
    });
});