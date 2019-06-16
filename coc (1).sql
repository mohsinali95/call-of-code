-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Dec 19, 2018 at 07:28 PM
-- Server version: 10.1.19-MariaDB
-- PHP Version: 5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `coc`
--

-- --------------------------------------------------------

--
-- Table structure for table `evalutaion`
--

CREATE TABLE `evalutaion` (
  `id` int(11) NOT NULL,
  `complexity` int(11) NOT NULL,
  `pmd` text NOT NULL,
  `loc` int(11) NOT NULL,
  `pmdCount` int(11) NOT NULL,
  `output` text NOT NULL,
  `memory` int(11) NOT NULL,
  `cpuTime` float NOT NULL,
  `submitTime` int(11) NOT NULL,
  `score_complexity` int(55) NOT NULL,
  `score_cpd` int(55) NOT NULL,
  `score_smellyCode` int(55) NOT NULL,
  `score_compileTime` int(55) NOT NULL,
  `score_memoryUsed` int(55) NOT NULL,
  `score_cpuUsed` int(55) NOT NULL,
  `score_submitTime` int(55) NOT NULL,
  `match_score` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `evalutaion`
--

INSERT INTO `evalutaion` (`id`, `complexity`, `pmd`, `loc`, `pmdCount`, `output`, `memory`, `cpuTime`, `submitTime`, `score_complexity`, `score_cpd`, `score_smellyCode`, `score_compileTime`, `score_memoryUsed`, `score_cpuUsed`, `score_submitTime`, `match_score`) VALUES
(1, 2, '[{"Rule":"EqualComparison"}]', 9, 1, 'MAaz\n', 39080, 0.32, 0, 40, -5, -10, 30, 40, 30, 30, 155),
(2, 1, '[]', 3, 0, 'asdasdasd\n', 39496, 0.32, 0, 40, -5, 30, 30, 30, 30, 30, 185),
(3, 2, '[{"Rule":"EqualComparison"}]', 8, 1, 'adadasd\n', 39080, 0.35, 0, 40, -5, -10, 40, 40, 30, 30, 165),
(4, 2, '[{"Rule":"EqualComparison"}]', 9, 1, 'Correct\n', 39288, 0.44, 0, 40, -5, -10, 30, 30, 30, 30, 145),
(5, 1, '[]', 6, 0, '4\n', 39696, 0.3, 0, 40, -5, 30, 40, 30, 30, 30, 195),
(6, 2, '[{"Rule":"EqualComparison"}]', 8, 1, 'matched\n', 39508, 0.36, 0, 40, -5, -10, 30, 40, 30, 30, 155);

-- --------------------------------------------------------

--
-- Table structure for table `friends`
--

CREATE TABLE `friends` (
  `id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `friends`
--

INSERT INTO `friends` (`id`, `sender_id`, `receiver_id`, `created_at`) VALUES
(7, 23, 26, '2018-12-03 21:39:07'),
(8, 26, 23, '2018-12-03 21:39:07'),
(11, 26, 24, '2018-12-03 21:48:59'),
(12, 24, 26, '2018-12-03 21:48:59'),
(13, 25, 23, '2018-12-04 09:06:45'),
(14, 23, 25, '2018-12-04 09:06:45'),
(15, 23, 24, '2018-12-05 16:59:09'),
(16, 24, 23, '2018-12-05 16:59:09'),
(17, 24, 25, '2018-12-05 16:59:20'),
(18, 25, 24, '2018-12-05 16:59:20');

-- --------------------------------------------------------

--
-- Table structure for table `friend_requests`
--

CREATE TABLE `friend_requests` (
  `id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `accepted` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `friend_requests`
--

INSERT INTO `friend_requests` (`id`, `sender_id`, `receiver_id`, `created_at`, `accepted`) VALUES
(11, 25, 24, '2018-12-05 16:59:20', 1),
(15, 26, 23, '2018-12-03 21:39:07', 1),
(16, 24, 26, '2018-12-03 21:48:59', 1),
(17, 23, 25, '2018-12-04 09:06:45', 1),
(21, 24, 23, '2018-12-05 16:59:09', 1);

-- --------------------------------------------------------

--
-- Table structure for table `match_detail`
--

CREATE TABLE `match_detail` (
  `id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `winner_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `match_detail`
--

INSERT INTO `match_detail` (`id`, `question_id`, `created_at`, `winner_id`) VALUES
(1, 9, '2018-12-06 07:39:43', 25),
(2, 9, '2018-12-06 10:39:50', 25),
(3, 9, '2018-12-06 11:10:46', 23);

-- --------------------------------------------------------

--
-- Table structure for table `player_detail`
--

CREATE TABLE `player_detail` (
  `id` int(11) NOT NULL,
  `player` int(11) NOT NULL,
  `evaluation_id` int(11) NOT NULL,
  `match_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `player_detail`
--

INSERT INTO `player_detail` (`id`, `player`, `evaluation_id`, `match_id`) VALUES
(1, 23, 1, 1),
(4, 23, 4, 2),
(5, 23, 5, 3),
(2, 25, 2, 1),
(3, 25, 3, 2),
(6, 25, 6, 3);

-- --------------------------------------------------------

--
-- Table structure for table `profile`
--

CREATE TABLE `profile` (
  `id` int(11) NOT NULL,
  `level` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  `profile_image` text NOT NULL,
  `phone` varchar(55) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_active` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `profile`
--

INSERT INTO `profile` (`id`, `level`, `score`, `profile_image`, `phone`, `created_at`, `updated_at`, `is_active`, `user_id`) VALUES
(1, 4, 485, '1544011342348maaaaaz.jpg', '03243424011', '2018-12-02 11:26:02', '2018-12-06 11:10:47', 0, 23),
(2, 3, 330, '1543750268609profile_pic2.jpg', '090078601', '2018-12-02 11:30:59', '2018-12-06 10:39:51', 0, 25),
(3, 0, 0, '1544011589779mmm.jpg', '03481355091', '2018-12-05 12:06:22', '2018-12-06 00:11:46', 0, 24);

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `question` text NOT NULL,
  `input` varchar(150) NOT NULL,
  `output` varchar(150) NOT NULL,
  `answer` text NOT NULL,
  `difficulty` varchar(150) NOT NULL,
  `language` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `question`, `input`, `output`, `answer`, `difficulty`, `language`) VALUES
(1, 'Write a Java program to print the sum (addition), multiply, subtract, divide and remainder of two numbers.', 'num1= 4; num2= 2 ', '6, 2 , 8, 2', '6, 2 , 8, 2', 'Easy', 'java'),
(2, 'Write a Java program that takes a number as input and prints its multiplication table upto 10.', 'num1 =3', '3,6,9,12,15,18,21,24,27,30', '3,6,9,12,15,18,21,24,27,30', 'Easy', 'java'),
(3, 'Write a Java Script program to print the sum (addition), multiply, subtract, divide and remainder of two numbers.', 'num1 =4 num2 =2', '6 , 8 , 2 ,2 ', '6 , 8 , 2 ,2 ', 'Easy', 'js'),
(5, 'Write a Java program to print the ascii value of a given character.', 'character = a', '', '', 'Medium', 'java'),
(6, 'Write a Java program to calculate the average value of array elements.', 'arr = [20,4,6,14]', '', '', 'Hard', 'java'),
(7, 'Write a JavaScript program to display the current day and time in the following format.\r\n', 'current date and time', '', '', 'Medium', 'js'),
(8, 'Write a JavaScript program to find the most frequent item of an array.', 'var arr=[3, ''a'', ''a'', ''a'', 2, 3, ''a'', 3, ''a'', 2, 4, 9, 3];', '', '', 'Hard', 'js'),
(9, 'Write a JavaScript program to check two given numbers and return true if one of the number is 50 or if their sum is 50.', 'input as required', '', '', 'Easy', 'js'),
(10, 'Write a JavaScript program to calculate days left until next Christmas.', 'input as required', '', '', 'Medium', 'js');

-- --------------------------------------------------------

--
-- Table structure for table `userimage`
--

CREATE TABLE `userimage` (
  `id` int(55) NOT NULL,
  `name` varchar(55) NOT NULL,
  `image` varchar(55) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(55) NOT NULL,
  `last_name` varchar(55) NOT NULL,
  `email` varchar(55) NOT NULL,
  `password` varchar(256) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `created_at`, `updated_at`, `created_by`, `updated_by`) VALUES
(23, 'Maaz', 'Mehtab', 'maaz@gmail.com', '$2b$10$eCOl6ka1sk2QwjZKId2sZe7HefPBY2ShjxGoJZLmTsnZWDFGvgbm6', '2018-12-02 11:07:01', '2018-12-02 11:07:01', 0, 0),
(24, 'Mohsin', 'Ali', 'mohsin@gmail.com', '$2b$10$O2rmrnFC4rwjMjNBOTMFVe1aRqVIXg33SFr679lPTsG.M5XeVc0bu', '2018-12-02 11:11:15', '2018-12-02 11:11:15', 0, 0),
(25, 'moiz', 'khan', 'moiz@gmail.com', '$2b$10$yg8u9/wv1oScL21rLhxfX.Slk/O9luNYHn.nhDczkEZkeIr5uGKgu', '2018-12-02 11:18:12', '2018-12-02 11:18:12', 0, 0),
(26, 'zaid', 'imtiaz', 'zaid@gmail.com', '$2b$10$OVsB5.5H/vIAlc85mhBA0OVk2dxt3FhA.Wtr9UORY90QOcrQt573K', '2018-12-02 11:22:55', '2018-12-02 11:22:55', 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `evalutaion`
--
ALTER TABLE `evalutaion`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `friends`
--
ALTER TABLE `friends`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sender_id` (`sender_id`,`receiver_id`),
  ADD KEY `receiver_id` (`receiver_id`);

--
-- Indexes for table `friend_requests`
--
ALTER TABLE `friend_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sender_id` (`sender_id`,`receiver_id`),
  ADD KEY `receiver_id` (`receiver_id`);

--
-- Indexes for table `match_detail`
--
ALTER TABLE `match_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `question_id` (`question_id`);

--
-- Indexes for table `player_detail`
--
ALTER TABLE `player_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `player` (`player`,`evaluation_id`,`match_id`),
  ADD KEY `evaluation_id` (`evaluation_id`),
  ADD KEY `match_id` (`match_id`);

--
-- Indexes for table `profile`
--
ALTER TABLE `profile`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userimage`
--
ALTER TABLE `userimage`
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
-- AUTO_INCREMENT for table `evalutaion`
--
ALTER TABLE `evalutaion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `friends`
--
ALTER TABLE `friends`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT for table `friend_requests`
--
ALTER TABLE `friend_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT for table `match_detail`
--
ALTER TABLE `match_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `player_detail`
--
ALTER TABLE `player_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `profile`
--
ALTER TABLE `profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `userimage`
--
ALTER TABLE `userimage`
  MODIFY `id` int(55) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `friends`
--
ALTER TABLE `friends`
  ADD CONSTRAINT `friends_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `friends_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `friend_requests`
--
ALTER TABLE `friend_requests`
  ADD CONSTRAINT `friend_requests_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `friend_requests_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `match_detail`
--
ALTER TABLE `match_detail`
  ADD CONSTRAINT `match_detail_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `player_detail`
--
ALTER TABLE `player_detail`
  ADD CONSTRAINT `player_detail_ibfk_1` FOREIGN KEY (`evaluation_id`) REFERENCES `evalutaion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `player_detail_ibfk_2` FOREIGN KEY (`match_id`) REFERENCES `match_detail` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `profile`
--
ALTER TABLE `profile`
  ADD CONSTRAINT `profile_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
