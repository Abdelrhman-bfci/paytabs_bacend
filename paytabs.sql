-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 07, 2022 at 11:24 PM
-- Server version: 5.7.33
-- PHP Version: 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `paytabs`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `parent_id` int(11) NOT NULL DEFAULT '0',
  `name` varchar(100) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `parent_id`, `name`, `updated_at`, `created_at`) VALUES
(1, 0, 'Category A', '2022-12-07 21:17:50', '2022-12-07 21:17:50'),
(2, 0, 'Category B', '2022-12-07 21:17:50', '2022-12-07 21:17:50'),
(3, 2, 'Sub B1', '2022-12-07 21:18:21', '2022-12-07 21:18:21'),
(4, 2, 'Sub B2', '2022-12-07 21:18:21', '2022-12-07 21:18:21'),
(5, 3, 'Sub sub B1', '2022-12-07 21:18:21', '2022-12-07 21:18:21'),
(6, 4, 'Sub sub B2', '2022-12-07 21:18:21', '2022-12-07 21:18:21'),
(7, 1, 'Sub A1', '2022-12-07 21:18:21', '2022-12-07 21:18:21'),
(8, 1, 'Sub A2', '2022-12-07 21:18:21', '2022-12-07 21:18:21'),
(9, 7, 'Sub sub A1', '2022-12-07 21:18:21', '2022-12-07 21:18:21'),
(10, 8, 'Sub sub A2', '2022-12-07 21:18:21', '2022-12-07 21:18:21'),
(11, 5, 'Sub sub sub B1', '2022-12-07 21:18:21', '2022-12-07 21:18:21'),
(12, 6, 'Sub sub sub B2', '2022-12-07 21:18:21', '2022-12-07 21:18:21'),
(13, 9, 'Sub sub sub A1', '2022-12-07 21:18:21', '2022-12-07 21:18:21'),
(14, 10, 'Sub sub sub A2', '2022-12-07 21:18:21', '2022-12-07 21:18:21');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parent_id` (`parent_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
