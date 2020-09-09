-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 09, 2020 at 10:42 AM
-- Server version: 10.3.16-MariaDB
-- PHP Version: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chatbot`
--

-- --------------------------------------------------------

--
-- Table structure for table `botaction`
--

CREATE TABLE `botaction` (
  `id` int(11) NOT NULL,
  `receive` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `subtitle` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `buttons` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `reply` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `images` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `user_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `botaction`
--

INSERT INTO `botaction` (`id`, `receive`, `title`, `subtitle`, `buttons`, `reply`, `type`, `images`, `user_id`) VALUES
(1, 'quan áo', 'bạn muốn mua loại quần áo nào?', 'xxx', 'áo nam , quần jean , mũ', 'quick', 'quick', '', ''),
(22, 'hi', '', '', '', 'Xin chào bạn, chào mừng bạn đến vào page bán hàng nam', 'text', '', ''),
(23, 'xem san pham', '', '', '', 'san pham bao gom quan ao nam nu', 'text', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `bots`
--

CREATE TABLE `bots` (
  `id` int(11) NOT NULL,
  `botname` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `user_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `botaction_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bots`
--

INSERT INTO `bots` (`id`, `botname`, `user_id`, `botaction_id`) VALUES
(2, 'chatbot show sản phẩm ', '1262649734', '[1,22,4,23]');

-- --------------------------------------------------------

--
-- Table structure for table `chatbotpages`
--

CREATE TABLE `chatbotpages` (
  `id` int(11) NOT NULL,
  `page_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `bot_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `chatbotpages`
--

INSERT INTO `chatbotpages` (`id`, `page_id`, `bot_id`) VALUES
(1, '109203267573632', 2);

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `page_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `send_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `gender` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `page_id`, `send_id`, `gender`, `name`, `avatar`) VALUES
(6, '109203267573632', '3231693413595497', 'male', 'Nguyễn Minh Thư', 'https://platform-lookaside.fbsbx.com/platform/profilepic/?psid=3231693413595497&width=1024&ext=1602122158&hash=AeTgCup7NlbHM2nO'),
(8, '116463323504860', '3099724493469883', 'male', 'Nguyễn Đăng Hưng', 'https://platform-lookaside.fbsbx.com/platform/profilepic/?psid=3099724493469883&width=1024&ext=1602122513&hash=AeS-eDJOxWMxBSN9'),
(9, '109203267573632', '4351173044956579', 'male', 'Nguyễn Đăng Hưng', 'https://platform-lookaside.fbsbx.com/platform/profilepic/?psid=4351173044956579&width=1024&ext=1602122583&hash=AeTY_mVY9V6-bAlI'),
(11, '116463323504860', '3064385566992160', '', 'Nguyễn Minh Thư', '');

-- --------------------------------------------------------

--
-- Table structure for table `page`
--

CREATE TABLE `page` (
  `id` int(11) NOT NULL,
  `page_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `avt` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `access_token` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `page`
--

INSERT INTO `page` (`id`, `page_id`, `name`, `avt`, `access_token`, `user_id`, `status`) VALUES
(6, '109203267573632', 'Chatbot 2', 'https://scontent.fvca1-1.fna.fbcdn.net/v/t1.0-1/cp0/p50x50/118194436_109203334240292_3703868183695947655_o.png?_nc_cat=103&_nc_sid=dbb9e7&_nc_ohc=Hs_cFQdSvJYAX-px-mz&_nc_ht=scontent.fvca1-1.fna&oh=85a587cd4aead49225dd558cb3ad83fe&oe=5F70CB2C', 'EAAGKCb3V9UcBAF8vM2LmaiMExKq0Od6ypnvXHabZBlvP1AX5f1qhNecOjnRwWUFetFktH6pTzYWE5ovAebhWiA2ZCard0YwIGkdOZCxdy039ZBSoVNkiTyIy0W8tWmUp05e0yNDh0DIggr8E1NQcqcKpnGSMdeZBJrAiG4CcQcgZDZD', '1160073687696370', 1),
(7, '116463323504860', 'Demo Chatbot', 'https://scontent.fvca1-1.fna.fbcdn.net/v/t1.0-1/cp0/p50x50/118121035_116463363504856_1039726871954937852_o.png?_nc_cat=103&_nc_sid=dbb9e7&_nc_ohc=JbN9t_DK99cAX8CSYo8&_nc_ht=scontent.fvca1-1.fna&oh=bc66f50bf37cc15ffb6d3c4c57922b8e&oe=5F6FE161', 'EAAGKCb3V9UcBADmWAKEocau3GuMzQDZAZAy7SMzDRXgWJHzlFRsuguw3ZAZBTr6Rl7MKyDKysf3Jr4nLjbFyOWEsCdl6wJXc4QD3etHRJmtaZBuClJrNm5bIMZBEi8GCg0AM3KPfwE2NxnRY0EkFdQa9zLMiEM7mWfQofO1ABNbAZDZD', '1160073687696370', 1),
(8, '109203267573631', 'Chatbot 2', 'https://scontent.fvca1-1.fna.fbcdn.net/v/t1.0-1/cp0/p50x50/118194436_109203334240292_3703868183695947655_o.png?_nc_cat=103&_nc_sid=dbb9e7&_nc_ohc=Hs_cFQdSvJYAX-px-mz&_nc_ht=scontent.fvca1-1.fna&oh=85a587cd4aead49225dd558cb3ad83fe&oe=5F70CB2C', 'EAAGKCb3V9UcBAF8vM2LmaiMExKq0Od6ypnvXHabZBlvP1AX5f1qhNecOjnRwWUFetFktH6pTzYWE5ovAebhWiA2ZCard0YwIGkdOZCxdy039ZBSoVNkiTyIy0W8tWmUp05e0yNDh0DIggr8E1NQcqcKpnGSMdeZBJrAiG4CcQcgZDZD', '1160073687696371', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `user_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `fb_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `avt` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `access_token` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user_id`, `fb_id`, `avt`, `username`, `access_token`) VALUES
(13, '1262649734', '1160073687696370', 'https://scontent.fvca1-1.fna.fbcdn.net/v/t1.0-1/cp0/p32x32/117580885_2721149078113930_5288871559250754550_o.jpg?_nc_cat=111&_nc_sid=dbb9e7&_nc_ohc=pQzzt8QHLhEAX9FrcSX&_nc_ht=scontent.fvca1-1.fna&oh=3cac646593e84cecdc89edcbf7f740ac&oe=5F6FC717', 'nguyen dang hung', 'EAAGKCb3V9UcBANROJD06lfH1NZBt82UVlHSjtDNAlBbeZBoZBHueVGNP42v2soeMg0R9IR3iPYpDIqJDJicSOGRvoVV2Vybq6aeZAbFi6kGNdHZB4opX6i3YwHrEYddCBZB99ZBQkWDTzlcyY4Y5WAcYs31kApeyRCbCin5XzycEwZDZD'),
(14, '1262649734', '1160073687696371', 'https://scontent.fvca1-1.fna.fbcdn.net/v/t1.0-1/cp0/p32x32/117580885_2721149078113930_5288871559250754550_o.jpg?_nc_cat=111&_nc_sid=dbb9e7&_nc_ohc=pQzzt8QHLhEAX9FrcSX&_nc_ht=scontent.fvca1-1.fna&oh=3cac646593e84cecdc89edcbf7f740ac&oe=5F6FC717', 'nguyen dang hung', 'EAAGKCb3V9UcBANROJD06lfH1NZBt82UVlHSjtDNAlBbeZBoZBHueVGNP42v2soeMg0R9IR3iPYpDIqJDJicSOGRvoVV2Vybq6aeZAbFi6kGNdHZB4opX6i3YwHrEYddCBZB99ZBQkWDTzlcyY4Y5WAcYs31kApeyRCbCin5XzycEwZDZD');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `botaction`
--
ALTER TABLE `botaction`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bots`
--
ALTER TABLE `bots`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chatbotpages`
--
ALTER TABLE `chatbotpages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `send_id` (`send_id`);

--
-- Indexes for table `page`
--
ALTER TABLE `page`
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
-- AUTO_INCREMENT for table `botaction`
--
ALTER TABLE `botaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `bots`
--
ALTER TABLE `bots`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `chatbotpages`
--
ALTER TABLE `chatbotpages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `page`
--
ALTER TABLE `page`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
