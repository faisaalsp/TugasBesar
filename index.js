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

const addMember = (conn, nama, username, pass, alamat, kel, kec, kota) => {
    return new Promise((resolve, reject) => {
        conn.query(`INSERT INTO pelanggan (namaP, username, pass, alamat, idKel, idKec, idKota) VALUES ('${nama}', '${username}', '${pass}', '${alamat}', '${kel}', '${kec}', '${kota}')`, (err, result) => {
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

const namaKelKeIDKel = (conn, kel) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT idKel FROM kelurahan WHERE kelurahan = '${kel}'`, (err, result) => {
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

const namaKecKeIDKec = (conn, kec) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT idKec FROM kecamatan WHERE kecamatan = '${kec}'`, (err, result) => {
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

const namaKotaKeIDKota = (conn, kota) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT idKota FROM kota WHERE kota = '${kota}'`, (err, result) => {
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

const getDataPelanggan = (conn) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM pelanggan JOIN kelurahan ON pelanggan.idKel = kelurahan.idKel JOIN kecamatan ON kelurahan.idKec = kecamatan.idKec JOIN kota ON kecamatan.idKota = kota.idKota`, (err, result) => {
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

const getDataKelurahan = (conn) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM kelurahan`, (err, result) => {
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

const getDataKecamatan = (conn) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM kecamatan`, (err, result) => {
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

const getDataKota = (conn) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM kota`, (err, result) => {
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

const getIDPelanggan = (conn, nama) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT idP FROM pelanggan WHERE namaP = '${nama}'`, (err, result) => {
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

const getHistory = (conn, id) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM transaksi WHERE idPelanggan = '${id}'`, (err, result) => {
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
app.get('/',async (req,res) => {
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
    const idP = await getIDPelanggan(conn, nama);
    const history = await getHistory(conn, idP[0].idP)
    conn.release();
    // console.log(idP);
    // console.log(history);
    res.render('history', {
        nama, history
    });
});

app.get('/pembayaran',async (req,res) =>{
    const conn = await dbConnect();
    const nama = req.session.nama;
    conn.release();
    res.render('pembayaran', {
        nama
    });
});


//-------Router Admin-------
app.get('/homeAdmin', async(req, res) => {
    const conn = await dbConnect();
    const nama = req.session.nama;
    conn.release();
    res.render('homeAdmin', {
        nama
    });
});

app.get('/laporan', async(req, res) => {
    const conn = await dbConnect();
    const nama = req.session.nama;
    conn.release();
    res.render('laporan', {
        nama
    });
});

app.get('/manageMember', async(req, res) => {
    const conn = await dbConnect();
    const nama = req.session.nama;
    const dataPelanggan = await getDataPelanggan(conn);
    conn.release();
    // console.log(dataPelanggan);
    res.render('manageMember', {
        nama, dataPelanggan
    });
});

app.get('/addMember', async(req, res) => {
    const conn = await dbConnect();
    const nama = req.session.nama;
    const dataKelurahan = await getDataKelurahan(conn);
    const dataKecamatan = await getDataKecamatan(conn);
    const dataKota = await getDataKota(conn);
    conn.release();
    res.render('addMember', {
        nama, dataKelurahan, dataKecamatan, dataKota
    });
});

app.get('/addMeja', async(req, res) => {
    const conn = await dbConnect();
    const nama = req.session.nama;
    conn.release();
    res.render('addMeja', {
        nama
    });
});

app.get('/editDataMember', async(req, res) => {
    const conn = await dbConnect();
    const nama = req.session.nama;
    const dataKelurahan = await getDataKelurahan(conn);
    const dataKecamatan = await getDataKecamatan(conn);
    const dataKota = await getDataKota(conn);
    conn.release();
    res.render('editDataMember', {
        nama, dataKelurahan, dataKecamatan, dataKota
    });
});

app.get('/editMeja', async(req, res) => {
    const conn = await dbConnect();
    const nama = req.session.nama;
    conn.release();
    res.render('editMeja', {
        nama
    });
});

app.post('/addMember', async (req, res) => {
    const conn = await dbConnect();
    const {nama, user, pass, alamat, filterkel, filterkec, filterkota} = req.body
    // console.log(nama)
    // console.log(user)
    // console.log(pass)
    // console.log(alamat)
    // console.log(filterkel)
    // console.log(filterkec)
    // console.log(filterkota)

    const getIDKel = await namaKelKeIDKel(conn, filterkel);
    const getIDKec = await namaKecKeIDKec(conn, filterkec);
    const getIDKota = await namaKotaKeIDKota(conn, filterkota);
    const idKel = getIDKel[0].idKel;
    const idKec = getIDKec[0].idKec;
    const idKota = getIDKota[0].idKota;
    // console.log(idKel)
    // console.log(idKec)
    // console.log(idKota)
    const addNewMember = await addMember(conn, nama, user, pass, alamat, idKel, idKec, idKota);
    conn.release();
    res.redirect('/addMember');
})