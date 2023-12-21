-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: bjpz2d7sarifvkowtpun-mysql.services.clever-cloud.com:3306
-- Generation Time: Dec 21, 2023 at 08:15 AM
-- Server version: 8.0.22-13
-- PHP Version: 8.2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bjpz2d7sarifvkowtpun`
--

-- --------------------------------------------------------

--
-- Table structure for table `password_reset`
--

CREATE TABLE `password_reset` (
  `email` varchar(256) NOT NULL,
  `token` varchar(256) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `password_reset`
--

INSERT INTO `password_reset` (`email`, `token`, `created_at`) VALUES
('dev220791@gmail.com', 'GpGRsCrvvhX2LFdFua5zlacoCIVyJN1w', '2023-05-20 14:19:06'),
('nlagdhir@gmail.com', 'Hj0PvZAEJ48ZnrWF6eXtUWiq3S7PhyUW', '2023-06-12 14:31:49'),
('tareque179@gmail.com', '7vuxFwZ9RpkhBT30jocscbdA4v44Bm6r', '2023-08-10 15:48:52');

-- --------------------------------------------------------

--
-- Table structure for table `register`
--

CREATE TABLE `register` (
  `id` int NOT NULL,
  `email` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL,
  `message` varchar(256) NOT NULL,
  `role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `register`
--

INSERT INTO `register` (`id`, `email`, `password`, `message`, `role`) VALUES
(2, 'tareqxnx@gmail.com', '$2a$10$PXmdYdtC7Tsw/rIKIgf1AeqcYlAMQBlaLLYiQPqR9OyykNIOurteu', '1500', 'admin'),
(3, 'tareque179@gmail.com', '$2a$10$KuGr5jPom05Gz7Jnr3EH6OBj9bZ/WIOXufo4BdVpAJPUw2Iuw9Nbm', '400', 'admin'),
(48, 'tareq.dev001@gmail.com', '$2a$10$/KRH8TP4yvCz9vc6dvqMRuVKi6oLW8Dk6pA8VZKVZ5Y5N9mt0qKvC', '18', ''),
(49, 'session@session.com', '$2a$10$4n5haBNr0WOFk2dWHJEeBudjVZAD76bmUHX83VFga469ZvJY1ZSM6', '20', ''),
(50, 'session2@session.com', '$2a$10$B9vbBv9k06qhyBnbJJavj.QOGtW2qnOBAVVhelotfWJ4NBtwcLtDe', '0', ''),
(51, 'session4@session.com', '$2a$10$Jqzixc6qoYMrokJFsrcyz.4vRl3u3wWh3Ll8YCI2u64aRNUHnUsBW', '5', ''),
(52, 'tareq.dev005@gmail.com', '$2a$10$KUyhFFjKqszIA1top9FiK.uDCXetxaj60VhESlgC9RAgadFj4Dnge', '0', ''),
(53, 'test1@gmail.com', '$2a$10$Qzkbvdl6LbeKgUCxeh34hu/wcJvQ4GBx72sxbliZ60CLWOq.zh4gO', '20', ''),
(54, 'tareque.dev@gmail.com', '$2a$10$59oR7obALaQbU/BO2XkJhucOs71zuCaS.MZXdTkdeleVMMcmEDXLW', '6', '');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `user_number` varchar(50) NOT NULL,
  `sessionId` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`user_number`, `sessionId`) VALUES
('', 'zom5jg'),
('', 'H7URPP'),
('8801568035983', 'WUfPU7'),
('8801993149698', 'gECkR2');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `register`
--
ALTER TABLE `register`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `register`
--
ALTER TABLE `register`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
