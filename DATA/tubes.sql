CREATE TABLE adminbl (
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
    idM INT NOT NULL
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

INSERT INTO adminbl (idA, namaA, username, pass)
VALUES (1, 'Faisal Surya', 'faisal', 'faisal123');

INSERT INTO pelanggan (idP, namaP, username, pass)
VALUES (1, 'Sergio Petri', 'sergio', 'sergipetri');

INSERT INTO pelanggan (idP, namaP, username, pass)
VALUES (2, 'Irsyad Aegis', 'irsyad', 'kayu3.0');

INSERT INTO alamat (idAlamat, alamat, idPelanggan, idKel, idKec, idKota)
VALUES(1, 'Komplek Summarecon blok F no 7', 1, 1, 1, 1)

INSERT INTO alamat (idAlamat, alamat, idPelanggan, idKel, idKec, idKota)
VALUES(2, 'Komplek Podomoro Park blok F no 7', 2, 2, 2, 1)

INSERT INTO kelurahan (idKel, kelurahan, idKec)
VALUES(1, 'Dago', 1)

INSERT INTO kelurahan (idKel, kelurahan, idKec)
VALUES(2, 'Hegarmanah', 2)

INSERT INTO kecamatan (idKec, kecamatan, idKota)
VALUES(1, 'Coblong', 1)

INSERT INTO kecamatan (idKec, kecamatan, idKota)
VALUES(2, 'Cidadap', 1)

INSERT INTO kota (idKota, kota)
VALUES(1, 'Bandung')

INSERT INTO meja(idM, noMeja)
VALUES (1, 1)

INSERT INTO meja(idM, noMeja)
VALUES (2, 2)

INSERT INTO meja(idM, noMeja)
VALUES (3, 3)

INSERT INTO meja(idM, noMeja)
VALUES (4, 4)

INSERT INTO meja(idM, noMeja)
VALUES (5, 5)

INSERT INTO tiket (idT, statusTiket, harga, jam, tanggal, idM)
VALUES (1, 'available', 50000, 13, '2023-06-10', 1)