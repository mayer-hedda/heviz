-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Gép: localhost:3306
-- Létrehozás ideje: 2023. Júl 10. 19:48
-- Kiszolgáló verziója: 5.7.24
-- PHP verzió: 8.1.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `chapterx`
--
CREATE DATABASE IF NOT EXISTS `chapterx` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `chapterx`;

-- DELIMITER $$
--
-- Eljárások
--
-- CREATE DEFINER=`root`@`localhost` PROCEDURE `addAges` (IN `nameIN` VARCHAR(20), IN `minAgeIN` INT, IN `maxAgeIN` INT)   INSERT INTO `ages` (`ages`.`name`, `ages`.`minAge`, `ages`.`maxAge`)
-- VALUES (nameIN, minAgeIN, maxAgeIN)$$

-- CREATE DEFINER=`root`@`localhost` PROCEDURE `addCategory` (IN `nameIN` VARCHAR(50), IN `imageIN` VARCHAR(50))   INSERT INTO `category` (`category`.`name`, `category`.`image`)
-- VALUES (nameIN, imageIN)$$

-- CREATE DEFINER=`root`@`localhost` PROCEDURE `addColor` (IN `codeIN` VARCHAR(8))   INSERT INTO `color` (`color`.`code`)
-- VALUES (codeIN)$$

-- CREATE DEFINER=`root`@`localhost` PROCEDURE `addHelpCenter` (IN `questionIN` TEXT, IN `answerIN` TEXT)   INSERT INTO `helpcenter` (`helpcenter`.`question`, `helpcenter`.`answer`)
-- VALUES (questionIN, answerIN)$$

-- CREATE DEFINER=`root`@`localhost` PROCEDURE `addLanguage` (IN `codeIN` CHAR(2), IN `languageIN` VARCHAR(50))   INSERT INTO `language` (`language`.`code`, `language`.`language`)
-- VALUES (codeIN, languageIN)$$

-- CREATE DEFINER=`root`@`localhost` PROCEDURE `addTag` (IN `nameIN` VARCHAR(50))   INSERT INTO `tag` (`tag`.`name`)
-- VALUES (nameIN)$$

-- CREATE DEFINER=`root`@`localhost` PROCEDURE `getBookReport` ()   SELECT * FROM `bookreport`$$

-- DELIMITER ;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `ages`
--

CREATE TABLE `ages` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `minAge` int(10) UNSIGNED NOT NULL,
  `maxAge` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `book`
--

CREATE TABLE `book` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `status` enum('looking for a publisher','published by','self-published') NOT NULL,
  `writerId` int(11) NOT NULL,
  `companyId` int(11) DEFAULT NULL,
  `publishedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `rating` double UNSIGNED DEFAULT NULL,
  `summary` text NOT NULL,
  `price` int(10) UNSIGNED NOT NULL,
  `coverImage` varchar(50) DEFAULT NULL,
  `text` varchar(50) NOT NULL,
  `chapterNumber` int(10) UNSIGNED NOT NULL,
  `freeChapterNumber` int(10) UNSIGNED NOT NULL,
  `languageId` int(11) NOT NULL,
  `adultFiction` tinyint(1) NOT NULL,
  `agesId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `bookrating`
--

CREATE TABLE `bookrating` (
  `id` int(11) NOT NULL,
  `ratingerId` int(11) NOT NULL,
  `bookId` int(11) NOT NULL,
  `ratingTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `rating` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `bookreport`
--

CREATE TABLE `bookreport` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `bookId` int(11) NOT NULL,
  `description` varchar(500) NOT NULL,
  `reportTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `bookshopping`
--

CREATE TABLE `bookshopping` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `bookId` int(11) NOT NULL,
  `shoppingTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `booksopened`
--

CREATE TABLE `booksopened` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `bookId` int(11) NOT NULL,
  `openedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `book_x_category`
--

CREATE TABLE `book_x_category` (
  `id` int(11) NOT NULL,
  `bookId` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `image` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `categoryinterest`
--

CREATE TABLE `categoryinterest` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `color`
--

CREATE TABLE `color` (
  `id` int(11) NOT NULL,
  `code` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `company`
--

CREATE TABLE `company` (
  `id` int(11) NOT NULL,
  `companyName` varchar(50) DEFAULT NULL,
  `publishedBookCount` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `publishedBookCountOnPage` int(10) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `follow`
--

CREATE TABLE `follow` (
  `id` int(11) NOT NULL,
  `followerId` int(11) NOT NULL,
  `followdId` int(11) NOT NULL,
  `followingTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `general`
--

CREATE TABLE `general` (
  `id` int(11) NOT NULL,
  `authorName` varchar(50) DEFAULT NULL,
  `birthdate` date NOT NULL,
  `publicFullName` tinyint(1) NOT NULL DEFAULT '0',
  `publishedBookCount` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `selfPublishedBookCount` int(10) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `helpcenter`
--

CREATE TABLE `helpcenter` (
  `id` int(11) NOT NULL,
  `question` text NOT NULL,
  `answer` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `language`
--

CREATE TABLE `language` (
  `id` int(11) NOT NULL,
  `code` char(2) NOT NULL,
  `language` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `list`
--

CREATE TABLE `list` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `bookId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `pay`
--

CREATE TABLE `pay` (
  `id` int(11) NOT NULL,
  `invoiceNumber` varchar(20) NOT NULL,
  `paymentId` int(11) NOT NULL,
  `invoice` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `post`
--

CREATE TABLE `post` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `text` text NOT NULL,
  `postTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `postlike`
--

CREATE TABLE `postlike` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `postId` int(11) NOT NULL,
  `likeTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `post_x_tag`
--

CREATE TABLE `post_x_tag` (
  `id` int(11) NOT NULL,
  `postId` int(11) NOT NULL,
  `tagId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `read`
--

CREATE TABLE `read` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `bookId` int(11) NOT NULL,
  `readTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `readSecound` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `search`
--

CREATE TABLE `search` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `searchTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `subscription`
--

CREATE TABLE `subscription` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `price` int(10) UNSIGNED NOT NULL,
  `description` varchar(500) NOT NULL,
  `validityDay` int(10) UNSIGNED NOT NULL,
  `optional` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tag`
--

CREATE TABLE `tag` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `rank` enum('general','company') NOT NULL,
  `firstName` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `publicEmail` tinyint(1) NOT NULL DEFAULT '0',
  `publicPhone` tinyint(1) NOT NULL DEFAULT '0',
  `introText` varchar(1000) NOT NULL,
  `website` varchar(100) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `tutorial` tinyint(1) NOT NULL DEFAULT '0',
  `registrationTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `coverColorId` int(11) NOT NULL DEFAULT '1',
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `userrating`
--

CREATE TABLE `userrating` (
  `id` int(11) NOT NULL,
  `ratingerId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `ratingTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `rating` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user_x_subscription`
--

CREATE TABLE `user_x_subscription` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `subscriptionId` int(11) NOT NULL,
  `subscriptionTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `ages`
--
ALTER TABLE `ages`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`id`),
  ADD KEY `writerId` (`writerId`),
  ADD KEY `companyId` (`companyId`),
  ADD KEY `agesId` (`agesId`),
  ADD KEY `languageId` (`languageId`);

--
-- A tábla indexei `bookrating`
--
ALTER TABLE `bookrating`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ratingerId` (`ratingerId`),
  ADD KEY `bookId` (`bookId`);

--
-- A tábla indexei `bookreport`
--
ALTER TABLE `bookreport`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `bookId` (`bookId`);

--
-- A tábla indexei `bookshopping`
--
ALTER TABLE `bookshopping`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `bookId` (`bookId`);

--
-- A tábla indexei `booksopened`
--
ALTER TABLE `booksopened`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `bookId` (`bookId`);

--
-- A tábla indexei `book_x_category`
--
ALTER TABLE `book_x_category`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bookId` (`bookId`),
  ADD KEY `categoryId` (`categoryId`);

--
-- A tábla indexei `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `categoryinterest`
--
ALTER TABLE `categoryinterest`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `categoryId` (`categoryId`);

--
-- A tábla indexei `color`
--
ALTER TABLE `color`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `follow`
--
ALTER TABLE `follow`
  ADD PRIMARY KEY (`id`),
  ADD KEY `followerId` (`followerId`),
  ADD KEY `followdId` (`followdId`);

--
-- A tábla indexei `general`
--
ALTER TABLE `general`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `helpcenter`
--
ALTER TABLE `helpcenter`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `language`
--
ALTER TABLE `language`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `list`
--
ALTER TABLE `list`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `bookId` (`bookId`);

--
-- A tábla indexei `pay`
--
ALTER TABLE `pay`
  ADD PRIMARY KEY (`id`),
  ADD KEY `paymentId` (`paymentId`);

--
-- A tábla indexei `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- A tábla indexei `postlike`
--
ALTER TABLE `postlike`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `postId` (`postId`);

--
-- A tábla indexei `post_x_tag`
--
ALTER TABLE `post_x_tag`
  ADD PRIMARY KEY (`id`),
  ADD KEY `postId` (`postId`),
  ADD KEY `tagId` (`tagId`);

--
-- A tábla indexei `read`
--
ALTER TABLE `read`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `bookId` (`bookId`);

--
-- A tábla indexei `search`
--
ALTER TABLE `search`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoryId` (`categoryId`),
  ADD KEY `userId` (`userId`);

--
-- A tábla indexei `subscription`
--
ALTER TABLE `subscription`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `coverColorId` (`coverColorId`),
  ADD KEY `userId` (`userId`);

--
-- A tábla indexei `userrating`
--
ALTER TABLE `userrating`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ratingerId` (`ratingerId`),
  ADD KEY `userId` (`userId`);

--
-- A tábla indexei `user_x_subscription`
--
ALTER TABLE `user_x_subscription`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `subscriptionId` (`subscriptionId`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `ages`
--
ALTER TABLE `ages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `book`
--
ALTER TABLE `book`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `bookrating`
--
ALTER TABLE `bookrating`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `bookreport`
--
ALTER TABLE `bookreport`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `bookshopping`
--
ALTER TABLE `bookshopping`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `booksopened`
--
ALTER TABLE `booksopened`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `book_x_category`
--
ALTER TABLE `book_x_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `categoryinterest`
--
ALTER TABLE `categoryinterest`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `color`
--
ALTER TABLE `color`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `company`
--
ALTER TABLE `company`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `follow`
--
ALTER TABLE `follow`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `general`
--
ALTER TABLE `general`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `helpcenter`
--
ALTER TABLE `helpcenter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `language`
--
ALTER TABLE `language`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `list`
--
ALTER TABLE `list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `pay`
--
ALTER TABLE `pay`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `postlike`
--
ALTER TABLE `postlike`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `post_x_tag`
--
ALTER TABLE `post_x_tag`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `read`
--
ALTER TABLE `read`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `search`
--
ALTER TABLE `search`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `subscription`
--
ALTER TABLE `subscription`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `tag`
--
ALTER TABLE `tag`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `userrating`
--
ALTER TABLE `userrating`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `user_x_subscription`
--
ALTER TABLE `user_x_subscription`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
