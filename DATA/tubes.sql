CREATE TABLE adminBL (
    idA INT NOT NULL,
    namaA VARCHAR(15),
    username VARCHAR(15),
    pass VARCHAR(15)
);

CREATE TABLE pelanggan (
    idP INT NOT NULL,
    namaP VARCHAR(15),
    username VARCHAR(15),
    pass VARCHAR(15)
);

CREATE TABLE transaksi (
    idTransaksi INT NOT NULL,
    tglTransaksi DATE,
    totalTiket INT NOT NULL,
    idPelanggan INT NOT NULL,
    harga FLOAT
);

CREATE TABLE tiket (
    idT INT NOT NULL,
    statusTiket VARCHAR(15),
    harga FLOAT,
    jam INT NOT NULL,
    tanggal DATE,
    idM INT NOT NULL,
    noMeja INT NOT NULL
);

CREATE TABLE meja (
    idM INT NOT NULL,
    noMeja INT NOT NULL
);

CREATE TABLE alamat (
    idAlamat INT NOT NULL,
    alamat VARCHAR(50),
    idPelanggan INT NOT NULL,
    idKel INT NOT NULL,
    idKec INT NOT NULL,
    idKota INT NOT NULL
);

CREATE TABLE kelurahan (
    idKel INT NOT NULL,
    kelurahan VARCHAR(50),
    idKec INT NOT NULL
);

CREATE TABLE kecamatan (
    idKec INT NOT NULL,
    kecamatan VARCHAR(50),
    idKota INT NOT NULL
);

CREATE TABLE kota (
    idKota INT NOT NULL,
    kota VARCHAR(50)
);

INSERT INTO adminBL (idA, namaA, username, pass)
VALUES (1, 'Faisal Surya', 'faisal', 'faisal123');

INSERT INTO pelanggan (idP, namaP, username, pass)
VALUES (1, 'Sergio Petri', 'sergio', 'sergipetri');

INSERT INTO pelanggan (idP, namaP, username, pass)
VALUES (2, 'Irsyad Aegis', 'irsyad', 'kayu3.0');
