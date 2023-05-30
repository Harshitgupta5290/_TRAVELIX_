-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 17, 2023 at 05:46 AM
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
-- Database: `clever_travelers`
--

-- --------------------------------------------------------

--
-- Table structure for table `categorys`
--

CREATE TABLE `categorys` (
  `id` bigint(20) NOT NULL,
  `category` varchar(200) DEFAULT NULL,
  `imagepath` varchar(255) DEFAULT NULL,
  `created` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categorys`
--

INSERT INTO `categorys` (`id`, `category`, `imagepath`, `created`) VALUES
(8, 'Honeymoon', 'uploads//f2018090426.jpg', '2018-04-05 09:04:26'),
(9, 'Weekend Trips', 'uploads//f2018090459.jpg', '2018-04-05 09:04:59'),
(12, 'Beach', 'uploads//f2018090853.JPG', '2018-04-05 09:08:53');

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `id` bigint(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone_no` varchar(16) NOT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `message` varchar(255) NOT NULL,
  `adding_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `contact`
--

INSERT INTO `contact` (`id`, `name`, `email`, `phone_no`, `subject`, `message`, `adding_date`) VALUES
(3, 'Hemant Kumar', 'admin@gmail.com', '8989898989', 'Chemistry', 'testing message', '2018-03-07 12:32:28'),
(4, 'Ghanshyam', 'ghanshyam@gmail.com', '9818637154', 'Buy A Car', 'Buy A Car', '2018-03-25 08:36:25'),
(5, 'Rashi', 'admin@gmail.com', '7982760507', 'test', 'wertyuiuytre', '2023-05-13 01:40:25');

-- --------------------------------------------------------

--
-- Table structure for table `demo`
--

CREATE TABLE `demo` (
  `id` int(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `subject` varchar(250) NOT NULL,
  `message` varchar(1000) NOT NULL,
  `reply` text NOT NULL,
  `adding_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `demo`
--

INSERT INTO `demo` (`id`, `name`, `subject`, `message`, `reply`, `adding_date`) VALUES
(1, 'Raju', 'english', 'asdfghjklkjuytrew', 'testing message', '2023-05-14 04:53:51'),
(2, 'test', 'test2', 'test message', 'test reply', '2023-05-17 04:47:03');

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `id` bigint(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone_no` varchar(16) NOT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `message` varchar(255) NOT NULL,
  `adding_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`id`, `name`, `email`, `phone_no`, `subject`, `message`, `adding_date`) VALUES
(2, 'Ankit', 'raju@gmail.com', '2345678923', 'english', 'szdfghj', '2023-05-14 07:56:31'),
(3, 'price', 'admin@gmail.com', '5432176890', 'asdfghjdsfghj', 'asdfghjkljhgfdsfghjk,l', '2023-05-15 08:22:03'),
(4, 'Rohit', 'rohit123@gmail.com', '1234566554', 'kjhgfd', 'lkjhgfds', '2023-05-16 08:24:52');

-- --------------------------------------------------------

--
-- Table structure for table `hotels`
--

CREATE TABLE `hotels` (
  `id` bigint(10) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `category` varchar(200) DEFAULT NULL,
  `hotel_name` varchar(200) DEFAULT NULL,
  `city` varchar(200) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `imagepath` varchar(200) DEFAULT NULL,
  `imagepath2` varchar(200) DEFAULT NULL,
  `created` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `hotels`
--

INSERT INTO `hotels` (`id`, `user_id`, `category`, `hotel_name`, `city`, `description`, `imagepath`, `imagepath2`, `created`) VALUES
(5, 8, '8', 'Lila', 'New Delhi', 'dsgdf', 'uploads//f2018075037.JPG', 'uploads//f2018075037.jpg', '2018-04-06 00:00:00'),
(6, 8, '9', 'Taj', 'Mumbai', 'hgkfdjhjlfklh', 'uploads//f2018103315.jpg', 'uploads//f2018103315.jpg', '2018-04-07 00:00:00'),
(7, 8, '8', 'Lila', 'New Delhi', 'hfgdk', 'uploads//f2018104144.jpg', 'uploads//f2018104144.jpg', '2018-04-07 00:00:00'),
(8, 8, '12', 'Dreamy Bintan', 'SINGAPORE', 'Choice of Billiard at lobby or 1 round of Horse Ride for Children', 'uploads//f2018105047.jpg', 'uploads//f2018105047.jpg', '2018-04-07 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `packages`
--

CREATE TABLE `packages` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `hotel_id` bigint(20) DEFAULT NULL,
  `person` varchar(255) DEFAULT NULL,
  `source` varchar(255) DEFAULT NULL,
  `destination` varchar(255) DEFAULT NULL,
  `sales_price` varchar(200) DEFAULT NULL,
  `medium` varchar(255) DEFAULT NULL,
  `days` varchar(255) DEFAULT NULL,
  `astatus` enum('Active','Inactive','Deleted') DEFAULT 'Active',
  `created` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `packages`
--

INSERT INTO `packages` (`id`, `user_id`, `hotel_id`, `person`, `source`, `destination`, `sales_price`, `medium`, `days`, `astatus`, `created`) VALUES
(10, 9, 7, '2', 'Goa', 'Mumbai', '500000', 'flight', '2', 'Active', '2018-03-25 00:00:00'),
(13, 8, 6, '2', 'Delhi', 'Mumbai', '10000', 'flight', '7', 'Active', '2018-04-05 00:00:00'),
(15, 8, 5, '3', 'Patna', 'Delhi', '5000', 'train', '3', 'Active', '2018-04-08 00:00:00'),
(18, 8, 6, '2', 'Patna', 'Mumbai', '10000', 'train', '4', 'Active', '2018-04-08 00:00:00'),
(20, NULL, 8, '2', 'Delhi', 'Kerla', '3000', 'bus', '2', 'Active', '2018-04-08 00:00:00'),
(38, NULL, 5, '2', 'Mumbai', 'Delhi', '5000', 'train', '2', 'Active', '2018-04-08 00:00:00'),
(39, NULL, 5, '2', 'fhgjmt', 'sdyjh', '3500', 'flight', '2', 'Active', '2023-05-17 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `package_id` bigint(20) DEFAULT NULL,
  `card_type` varchar(100) DEFAULT NULL,
  `name_on_card` varchar(100) DEFAULT NULL,
  `card_no` varchar(100) DEFAULT NULL,
  `expiry_date` varchar(100) DEFAULT NULL,
  `expiry_month` varchar(100) DEFAULT NULL,
  `cvv` varchar(100) DEFAULT NULL,
  `created` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `user_id`, `package_id`, `card_type`, `name_on_card`, `card_no`, `expiry_date`, `expiry_month`, `cvv`, `created`) VALUES
(12, 10, 9, 'Credit', 'Sbi', '12334345', '2020', '08', '123', NULL),
(13, 9, 9, 'Debit', 'Sbi', '53465657', '2019', '06', '123', NULL),
(14, 8, 0, 'Credit', 'Union Bank', '1234567812345678', '2020', '02', '123', NULL),
(15, 8, 6, 'Debit', 'Union Bank', '1232434344567834', '2021', '05', '456', NULL),
(16, 13, 15, 'Credit', 'kjhjhgfdsas', '3245456787651200', '2025', '02', '876', NULL),
(17, 13, 15, 'Credit', 'kjhjhgfdsas', '3245456787651200', '2025', '02', '876', NULL),
(18, 13, 15, 'Debit', 'dfghjkl', '123456789998765', '2018', '05', '677', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `review_and_rating`
--

CREATE TABLE `review_and_rating` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `package_id` int(10) NOT NULL,
  `rating` int(5) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `review_and_rating`
--

INSERT INTO `review_and_rating` (`id`, `user_id`, `package_id`, `rating`, `title`, `description`, `created_at`) VALUES
(1, 8, 13, 5, 'test', 'test', '2023-05-17 05:32:17'),
(2, 8, 13, 5, 'test2', 'dsfdsafs', '2023-05-17 05:33:45'),
(3, 8, 13, 4, 'test2', 'test3', '2023-05-17 05:34:27'),
(4, 8, 38, 2, 'test2', 'test', '2023-05-17 05:45:44');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(25) DEFAULT NULL,
  `phone_no` varchar(10) DEFAULT NULL,
  `gender` varchar(16) NOT NULL DEFAULT '',
  `dob` varchar(25) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `pin_no` varchar(6) DEFAULT NULL,
  `imgpath` varchar(255) DEFAULT NULL,
  `user_type` varchar(20) DEFAULT 'user',
  `adding_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `phone_no`, `gender`, `dob`, `city`, `state`, `address`, `country`, `pin_no`, `imgpath`, `user_type`, `adding_date`) VALUES
(8, 'Kamal Kant', 'admin@gmail.com', 'admin', '8989898989', '', '2000-03-15', 'New Delhi', 'Delhi', 'Address', 'India', '110018', NULL, 'admin', '2018-03-07 12:22:12'),
(9, 'Hemant Kumar', 'hemant@gmail.com', 'admin', '8909090909', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'user', '2018-03-07 12:22:28'),
(11, 'Ghanshyam', 'ghanshyam@gmail.com', 'admin', '9818637154', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'user', '2018-03-25 08:37:06'),
(12, 'Raju', 'raju@gmail.com', '1234567890', '2345678923', '', '2023-05-02', 'noida', 'up', 'chipiyana', 'india', '200920', NULL, 'user', '2023-05-14 03:48:32'),
(13, 'Rohit', 'rohit123@gmail.com', '1234567890', '1234566554', '', '2023-05-16', 'noida', 'noida', 'kjhgfdfghjk', 'asdfbbvcx', '123456', NULL, 'user', '2023-05-16 07:40:15');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categorys`
--
ALTER TABLE `categorys`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `demo`
--
ALTER TABLE `demo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hotels`
--
ALTER TABLE `hotels`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `packages`
--
ALTER TABLE `packages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `review_and_rating`
--
ALTER TABLE `review_and_rating`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categorys`
--
ALTER TABLE `categorys`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` bigint(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `demo`
--
ALTER TABLE `demo`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` bigint(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `hotels`
--
ALTER TABLE `hotels`
  MODIFY `id` bigint(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `packages`
--
ALTER TABLE `packages`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `review_and_rating`
--
ALTER TABLE `review_and_rating`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
