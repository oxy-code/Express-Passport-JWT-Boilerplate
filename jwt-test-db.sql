-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 13, 2017 at 11:05 PM
-- Server version: 5.5.50-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `jwt-test-db`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(150) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  `role` enum('ADM','USR') COLLATE utf8_unicode_ci DEFAULT 'USR',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=5 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `is_active`, `created_at`) VALUES
(1, 'Velmurugan', 'velmurugaaan@gmail.com', 'a2a12550ebb6df4fa3809fce4d172a25dc74e838bdd2be6056aa861f9c795709', 'USR', 1, '2017-08-13 16:53:39'),
(2, 'Velmurugan', 'velmurugaaan1@gmail.com', 'a2a12550ebb6df4fa3809fce4d172a25dc74e838bdd2be6056aa861f9c795709', 'USR', 1, '2017-08-13 16:54:27'),
(3, 'Velmurugan2', 'velmurugaaan2@gmail.com', 'a2a12550ebb6df4fa3809fce4d172a25dc74e838bdd2be6056aa861f9c795709', 'USR', 1, '2017-08-13 16:54:38'),
(4, 'Velmurugan123', 'velmurugaaan123@gmail.com', 'a2a12550ebb6df4fa3809fce4d172a25dc74e838bdd2be6056aa861f9c795709', 'USR', 1, '2017-08-13 16:54:49');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
