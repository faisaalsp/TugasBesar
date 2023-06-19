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

//-------Untuk validasi admin atau member gaboleh ke halamannya
const isAdmin = (req, res, next) => {
    if (req.session.role == 'admin') {
      next();
    } else {
      res.redirect('/homeAdmin');
    }
};

const isMember = (req, res, next) => {
    if (req.session.role == 'member') {
      next();
    } else {
      res.redirect('/homeMember');
    }
};

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

const getLaporan = (conn, id) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM transaksi JOIN pelanggan ON transaksi.idPelanggan = pelanggan.idP`, (err, result) => {
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
        conn.query(`SELECT * FROM transaksi WHERE idPelanggan = '${id}' AND status = 1`, (err, result) => {
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}
const getCart = (conn, id) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM transaksi WHERE idPelanggan = '${id}' AND status = 0`, (err, result) => {
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

const getTiketAdmin = (conn) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM tiket`, (err, result) => {
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

const getTiketPelanggan = (conn) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM tiket WHERE statusTiket = 'Available'`, (err, result) => {
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

const getIDKeNama = (conn, id) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT namaP FROM pelanggan WHERE idP = '${id}'`, (err, result) => {
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

const getIDKeEditNama = (conn, id) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM pelanggan JOIN kelurahan ON pelanggan.idKel = kelurahan.idKel JOIN kecamatan ON kelurahan.idKec = kecamatan.idKec JOIN kota ON kecamatan.idKota = kota.idKota WHERE idP = '${id}'`, (err, result) => {
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

const updateDataMember = (conn, namaP, username, alamat, kota, kec, kel, id) => {
    return new Promise((resolve, reject) => {
        conn.query(`UPDATE pelanggan SET namaP = '${namaP}', username = '${username}', alamat = '${alamat}', idKota = '${kota}', idKec = '${kec}', idKel = '${kel}' WHERE idP = '${id}'`, (err, result) => {
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

const forTransaksi = (conn, tanggal, idP, harga, idT) => {
    return new Promise((resolve, reject) => {
        conn.query(`INSERT INTO transaksi (tglTransaksi, idPelanggan, harga, idT) VALUES ('${tanggal}', '${idP}', '${harga}', '${idT}')`, (err, result) => {
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

const getHarga = (conn, idT) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT harga FROM tiket WHERE idT = '${idT}'`, (err, result) => {
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

const getLunas = (conn, id) => {
    return new Promise((resolve, reject) => {
        conn.query(`UPDATE transaksi SET status = '${1}' WHERE idPelanggan = '${id}'`, (err, result) => {
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
            req.session.role = 'member';
            req.session.idMember = member[0].idP;
            console.log(req.session.role)
            res.redirect('/homeMember')
        }
        else if(admin.length > 0){
            // untuk admin jika login
            const getNama = await getNamaAdmin(conn, user)
            req.session.nama = getNama[0].namaA;
            // console.log(getNama)
            req.session.username = user;
            req.session.role = 'admin';
            console.log(req.session.role)
            res.redirect('/homeAdmin')
        }
        else{
            arr = "Username atau Password salah!";
            res.render('login', {arr})
        }
    }
});


//-------Router Pelanggan & Member-------
app.get('/',async (req,res) => {
    const conn = await dbConnect();
    const tiket = await getTiketPelanggan(conn);
    conn.release();
    res.render('homePelanggan', {
        tiket
    });
});

app.get('/homeMember', isMember, async(req, res) => {
    const conn = await dbConnect();
    const nama = req.session.nama;
    const tiket = await getTiketPelanggan(conn);
    conn.release();
    res.render('homeMember', {
        nama, tiket
    });
});

app.get('/history', isMember, async (req,res) => {
    const conn = await dbConnect();
    const nama = req.session.nama;
    const idP = await getIDPelanggan(conn, nama);
    const history = await getHistory(conn, idP[0].idP);
    conn.release();
    // console.log(idP);
    // console.log(history);
    res.render('history', {
        nama, history
    });
});

app.get('/pembayaran', isMember, async (req,res) =>{
    const conn = await dbConnect();
    const nama = req.session.nama;
    const idP = await getIDPelanggan(conn, nama);
    const cart = await getCart(conn, idP[0].idP);
    conn.release();
    res.render('pembayaran', {
        nama, cart
    });
});

app.post('/updateTiket/:idT', isMember, async(req, res) => {
    const conn = await dbConnect();
    const nama = req.session.nama;
    const {idT} = req.params;
    const harga = await getHarga(conn, idT);
    //buat tanggal transaksi hari ini
    const date = Date.now();
    const today = new Date(date);
    const formatMap = {
        mm: today.getMonth() + 1,
        dd: today.getDate(),
        yyyy: today.getFullYear()
    };
    //buat kalau bulan harinya cuma 1 angka buat nyesuaiin di tipe db
    if(formatMap.mm < 10){
        var bulan = "0" + formatMap.mm
    }
    else{
        var bulan = formatMap.mm
    }
    if(formatMap.dd < 10){
        var hari = "0" + formatMap.dd
    }
    else{
        var hari = formatMap.dd
    }
    const now = formatMap.yyyy + "-" + bulan + "-" + hari;
    // console.log(now)
    const addCart = await forTransaksi(conn, now, req.session.idMember, harga[0].harga, idT)
    // console.log(harga)
    conn.release();
    res.redirect('/homeMember')
});

app.post('/updateBayar', isMember, async (req,res) =>{
    const conn = await dbConnect();
    const nama = req.session.nama;
    const id = req.session.idMember;
    const cart = await getLunas(conn, id)
    conn.release();
    res.redirect('/history');
});


//-------Router Admin-------
app.get('/homeAdmin', isAdmin, async(req, res) => {
    const conn = await dbConnect();
    const nama = req.session.nama;
    const tiket = await getTiketAdmin(conn);
    conn.release();
    res.render('homeAdmin', {
        nama, tiket
    });
});

app.get('/laporan', isAdmin, async(req, res) => {
    const conn = await dbConnect();
    const nama = req.session.nama;
    const laporan = await getLaporan(conn);
    //buat total pendapatan
    let total = 0;
    for(let i = 0; i < laporan.length; i++){
        total += laporan[i].harga
    }
    // console.log(total)
    // console.log(laporan.length)
    conn.release();
    res.render('laporan', {
        nama, laporan, total
    });
});

app.get('/laporanMember', isAdmin, async(req, res) => {
    const conn = await dbConnect();
    const nama = req.session.nama;
    const laporan = await getLaporan(conn)
    // console.log(laporan)
    conn.release();
    res.render('laporanMember', {
        nama, laporan
    });
});

app.get('/manageMember', isAdmin, async(req, res) => {
    const conn = await dbConnect();
    const nama = req.session.nama;
    const dataPelanggan = await getDataPelanggan(conn);
    conn.release();
    // console.log(dataPelanggan);
    res.render('manageMember', {
        nama, dataPelanggan
    });
});

app.get('/addMember', isAdmin, async(req, res) => {
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

app.get('/addMeja', isAdmin, async(req, res) => {
    const conn = await dbConnect();
    const nama = req.session.nama;
    conn.release();
    res.render('addMeja', {
        nama
    });
});

app.get('/editDataMember', isAdmin, async(req, res) => {
    const conn = await dbConnect();
    const nama = req.session.nama;
    const id = req.session.editData
    const dataEdit = await getIDKeEditNama(conn, id);
    const dataKelurahan = await getDataKelurahan(conn);
    const dataKecamatan = await getDataKecamatan(conn);
    const dataKota = await getDataKota(conn);
    console.log(dataEdit)
    conn.release();
    res.render('editDataMember', {
        nama, dataKelurahan, dataKecamatan, dataKota, dataEdit
    });
});

app.get('/editMeja', isAdmin, async(req, res) => {
    const conn = await dbConnect();
    const nama = req.session.nama;
    conn.release();
    res.render('editMeja', {
        nama
    });
});

app.get('/grafik', isAdmin, async(req, res) => {
    const conn = await dbConnect();
    const nama = req.session.nama;
    conn.release();
    res.render('grafik', {
        nama
    });
});

app.post('/addMember', isAdmin, async (req, res) => {
    const conn = await dbConnect();
    const {nama, user, pass, alamat, filterkel, filterkec, filterkota} = req.body
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
});

app.post('/editDataMember/:id', isAdmin, async(req, res) => {
    const conn = await dbConnect();
    const nama = req.session.nama;
    const {id} = req.params;
    req.session.editData = id
    console.log(req.session.editData);
    conn.release();
    res.redirect('/editDataMember')
});

app.post('/updateDataMember', isAdmin, async(req, res) => {
    const conn = await dbConnect();
    const nama = req.session.nama;
    const id = req.session.editData;
    console.log(id);
    const {namaP, username, alamat, filterkota, filterkec, filterkel} = req.body;
    const idKota = await namaKotaKeIDKota(conn, filterkota);
    const idKec = await namaKecKeIDKec(conn, filterkec);
    const idKel = await namaKelKeIDKel(conn, filterkel);
    const updateMember = await updateDataMember(conn, namaP, username, alamat, idKota[0].idKota, idKec[0].idKec, idKel[0].idKel, id)
    conn.release();
    res.redirect('/manageMember')
});