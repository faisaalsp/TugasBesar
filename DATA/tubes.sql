-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 19, 2023 at 03:23 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tubes`
--

-- --------------------------------------------------------

--
-- Table structure for table `adminbl`
--

CREATE TABLE `adminbl` (
  `idA` int(11) NOT NULL,
  `namaA` varchar(15) DEFAULT NULL,
  `username` varchar(15) DEFAULT NULL,
  `pass` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `adminbl`
--

INSERT INTO `adminbl` (`idA`, `namaA`, `username`, `pass`) VALUES
(1, 'Faisal Surya', 'faisal', 'xRcHQUzF4bp4HClsyK4f+U3pshfR5DNgmb8ESihshqI=');

-- --------------------------------------------------------

--
-- Table structure for table `kecamatan`
--

CREATE TABLE `kecamatan` (
  `idKec` int(11) NOT NULL,
  `kecamatan` varchar(50) DEFAULT NULL,
  `idKota` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kecamatan`
--

INSERT INTO `kecamatan` (`idKec`, `kecamatan`, `idKota`) VALUES
(1, 'Andir', 1),
(2, 'Astana Anyar', 1),
(3, 'Buah Batu', 1),
(4, 'Cidadap', 1),
(5, 'Lengkong', 1),
(6, 'Gambir', 2),
(7, 'Kemayoran', 2),
(8, 'Menteng', 2),
(9, 'Kelapa Gading', 2),
(10, 'Pasar Minggu', 2),
(11, 'Banyumanik', 3),
(12, 'Gayamsari', 3),
(13, 'Pedurungan', 3),
(14, 'Tembalang', 3),
(15, 'Tugu', 3),
(16, 'Tegalsari', 4),
(17, 'Gubeng', 4),
(18, 'Genteng', 4),
(19, 'Wonokromo', 4),
(20, 'Gayungan', 4),
(21, 'Bogor Barat', 5),
(22, 'Bogor Selatan', 5),
(23, 'Bogor Tengah', 5),
(24, 'Bogor Timur', 5),
(25, 'Bogor Utara', 5);

-- --------------------------------------------------------

--
-- Table structure for table `kelurahan`
--

CREATE TABLE `kelurahan` (
  `idKel` int(11) NOT NULL,
  `kelurahan` varchar(50) DEFAULT NULL,
  `idKec` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kelurahan`
--

INSERT INTO `kelurahan` (`idKel`, `kelurahan`, `idKec`) VALUES
(1, 'Cijaura', 3),
(2, 'Kebon Jeruk', 1);

-- --------------------------------------------------------

--
-- Table structure for table `kota`
--

CREATE TABLE `kota` (
  `idKota` int(11) NOT NULL,
  `kota` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kota`
--

INSERT INTO `kota` (`idKota`, `kota`) VALUES
(1, 'Bandung'),
(2, 'Jakarta'),
(3, 'Semarang'),
(4, 'Surabaya'),
(5, 'Bogor');

-- --------------------------------------------------------

--
-- Table structure for table `meja`
--

CREATE TABLE `meja` (
  `idM` int(11) NOT NULL,
  `noMeja` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `meja`
--

INSERT INTO `meja` (`idM`, `noMeja`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

-- --------------------------------------------------------

--
-- Table structure for table `pelanggan`
--

CREATE TABLE `pelanggan` (
  `idP` int(11) NOT NULL,
  `namaP` varchar(15) DEFAULT NULL,
  `username` varchar(15) DEFAULT NULL,
  `pass` varchar(64) DEFAULT NULL,
  `alamat` varchar(100) NOT NULL,
  `idKel` int(11) NOT NULL,
  `idKec` int(11) NOT NULL,
  `idKota` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pelanggan`
--

INSERT INTO `pelanggan` (`idP`, `namaP`, `username`, `pass`, `alamat`, `idKel`, `idKec`, `idKota`) VALUES
(1, 'Irsyad Hanif', 'irsyad', 'mG5PRcAMbMS2YVJKnpN6WaBYBPxf7DHfdbfwsujgS10=', 'Tubagus Ismail Park Blok F-7', 1, 1, 1),
(2, 'Michael Sergio', 'sergio', '53y5lEGPW8DsEAe2wTeRjZrtTnsL3kXXSlDQknLC1gI=', 'Bukit Jarian No. 5', 2, 6, 1),
(3, 'Wildan Rizki', 'wildan', 'gtIOynYRojxzKxyzMArqvWvzKSsndQVmzaXSbz9uDIY=', 'Podomoro Park Blok F-8', 1, 3, 1),
(4, 'Gasta Ubaidil', 'gasta', 'iyLwmf+fwn9br5Gm4QYlx+al7fXpmcUxZO8sQKilPaE=', 'Podomoro Park Blok F-9', 1, 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tiket`
--

CREATE TABLE `tiket` (
  `idT` int(11) NOT NULL,
  `statusTiket` varchar(15) DEFAULT NULL,
  `harga` float DEFAULT NULL,
  `jam` int(11) NOT NULL,
  `tanggal` date DEFAULT NULL,
  `idM` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tiket`
--

INSERT INTO `tiket` (`idT`, `statusTiket`, `harga`, `jam`, `tanggal`, `idM`) VALUES
(1, 'Available', 50000, 13, '2022-06-07', 1),
(2, 'Available', 50000, 14, '2022-06-07', 2),
(3, 'Sold', 60000, 17, '2023-06-10', 3),
(4, 'Redeemed', 60000, 19, '2022-06-07', 4),
(5, 'Available', 60000, 20, '2022-06-07', 1),
(6, 'Available', 60000, 21, '2022-06-07', 5),
(7, 'Available', 60000, 22, '2023-06-04', 4),
(8, 'Available', 50000, 15, '2023-06-01', 2);

-- --------------------------------------------------------

--
-- Table structure for table `transaksi`
--

CREATE TABLE `transaksi` (
  `idTransaksi` int(11) NOT NULL,
  `tglTransaksi` date DEFAULT NULL,
  `idPelanggan` int(11) NOT NULL,
  `harga` float DEFAULT NULL,
  `idT` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transaksi`
--

INSERT INTO `transaksi` (`idTransaksi`, `tglTransaksi`, `idPelanggan`, `harga`, `idT`, `status`) VALUES
(23, '2023-06-19', 1, 50000, 1, 1),
(24, '2023-06-19', 1, 50000, 2, 1),
(25, '2023-06-19', 1, 60000, 5, 1),
(26, '2023-06-19', 2, 60000, 5, 1),
(27, '2023-06-19', 2, 50000, 2, 1),
(28, '2023-06-19', 2, 50000, 1, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adminbl`
--
ALTER TABLE `adminbl`
  ADD PRIMARY KEY (`idA`);

--
-- Indexes for table `kecamatan`
--
ALTER TABLE `kecamatan`
  ADD PRIMARY KEY (`idKec`),
  ADD KEY `FK_id_kota` (`idKota`);

--
-- Indexes for table `kelurahan`
--
ALTER TABLE `kelurahan`
  ADD PRIMARY KEY (`idKel`),
  ADD KEY `FK_id_kecamatan` (`idKec`);

--
-- Indexes for table `kota`
--
ALTER TABLE `kota`
  ADD PRIMARY KEY (`idKota`);

--
-- Indexes for table `meja`
--
ALTER TABLE `meja`
  ADD PRIMARY KEY (`idM`);

--
-- Indexes for table `pelanggan`
--
ALTER TABLE `pelanggan`
  ADD PRIMARY KEY (`idP`),
  ADD KEY `FK_id_kelurahan` (`idKel`),
  ADD KEY `FK_id_kecamatan2` (`idKec`),
  ADD KEY `FK_id_kota2` (`idKota`);

--
-- Indexes for table `tiket`
--
ALTER TABLE `tiket`
  ADD PRIMARY KEY (`idT`),
  ADD KEY `FK_id_meja` (`idM`);

--
-- Indexes for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`idTransaksi`),
  ADD KEY `FK_id_pelanggan` (`idPelanggan`),
  ADD KEY `FK_id_tiket` (`idT`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adminbl`
--
ALTER TABLE `adminbl`
  MODIFY `idA` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `kecamatan`
--
ALTER TABLE `kecamatan`
  MODIFY `idKec` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `kelurahan`
--
ALTER TABLE `kelurahan`
  MODIFY `idKel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `kota`
--
ALTER TABLE `kota`
  MODIFY `idKota` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `meja`
--
ALTER TABLE `meja`
  MODIFY `idM` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `pelanggan`
--
ALTER TABLE `pelanggan`
  MODIFY `idP` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tiket`
--
ALTER TABLE `tiket`
  MODIFY `idT` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `idTransaksi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `kecamatan`
--
ALTER TABLE `kecamatan`
  ADD CONSTRAINT `FK_id_kota` FOREIGN KEY (`idKota`) REFERENCES `kota` (`idKota`);

--
-- Constraints for table `kelurahan`
--
ALTER TABLE `kelurahan`
  ADD CONSTRAINT `FK_id_kecamatan` FOREIGN KEY (`idKec`) REFERENCES `kecamatan` (`idKec`);

--
-- Constraints for table `pelanggan`
--
ALTER TABLE `pelanggan`
  ADD CONSTRAINT `FK_id_kecamatan2` FOREIGN KEY (`idKec`) REFERENCES `kecamatan` (`idKec`),
  ADD CONSTRAINT `FK_id_kelurahan` FOREIGN KEY (`idKel`) REFERENCES `kelurahan` (`idKel`),
  ADD CONSTRAINT `FK_id_kota2` FOREIGN KEY (`idKota`) REFERENCES `kota` (`idKota`);

--
-- Constraints for table `tiket`
--
ALTER TABLE `tiket`
  ADD CONSTRAINT `FK_id_meja` FOREIGN KEY (`idM`) REFERENCES `meja` (`idM`);

--
-- Constraints for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD CONSTRAINT `FK_id_pelanggan` FOREIGN KEY (`idPelanggan`) REFERENCES `pelanggan` (`idP`),
  ADD CONSTRAINT `FK_id_tiket` FOREIGN KEY (`idT`) REFERENCES `tiket` (`idT`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
