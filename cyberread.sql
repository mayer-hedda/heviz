-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Sep 29, 2023 at 07:23 PM
-- Server version: 8.0.31
-- PHP Version: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cyberread`
--
CREATE DATABASE IF NOT EXISTS `cyberread` DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci;
USE `cyberread`;

DELIMITER $$
--
-- Procedures
--
DROP PROCEDURE IF EXISTS `addAges`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `addAges` (IN `nameIN` VARCHAR(20), IN `minAgeIN` INT, IN `maxAgeIN` INT)   INSERT INTO `ages` (`ages`.`name`, `ages`.`minAge`, `ages`.`maxAge`)
VALUES (nameIN, minAgeIN, maxAgeIN)$$

DROP PROCEDURE IF EXISTS `addBookRating`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `addBookRating` (IN `ratingerIdIN` INT, IN `bookIdIN` INT, IN `ratingIN` INT)   INSERT INTO `bookrating` (`bookrating`.`ratingerId`, `bookrating`.`bookId`, `bookrating`.`rating`)
VALUES (ratingerIdIN, bookIdIN, ratingIN)$$

DROP PROCEDURE IF EXISTS `addCategory`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `addCategory` (IN `nameIN` VARCHAR(50), IN `imageIN` VARCHAR(50))   INSERT INTO `category` (`category`.`name`, `category`.`image`)
VALUES (nameIN, imageIN)$$

DROP PROCEDURE IF EXISTS `addColor`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `addColor` (IN `codeIN` VARCHAR(8))   INSERT INTO `color` (`color`.`code`)
VALUES (codeIN)$$

DROP PROCEDURE IF EXISTS `addHelpCenter`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `addHelpCenter` (IN `questionIN` TEXT, IN `answerIN` TEXT)   INSERT INTO `helpcenter` (`helpcenter`.`question`, `helpcenter`.`answer`)
VALUES (questionIN, answerIN)$$

DROP PROCEDURE IF EXISTS `addLanguage`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `addLanguage` (IN `codeIN` CHAR(2), IN `languageIN` VARCHAR(50))   INSERT INTO `language` (`language`.`code`, `language`.`language`)
VALUES (codeIN, languageIN)$$

DROP PROCEDURE IF EXISTS `addList`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `addList` (IN `userIdIN` INT, IN `bookIdIN` INT)   INSERT INTO `list` (`list`.`userId`, `list`.`bookId`)
VALUES (userIdIN, bookIdIN)$$

DROP PROCEDURE IF EXISTS `addPost`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `addPost` (IN `userIdIN` INT, IN `textIN` TEXT)   INSERT INTO `post` (`post`.`userId`, `post`.`text`)
VALUES (userIdIN, textIN)$$

DROP PROCEDURE IF EXISTS `addTag`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `addTag` (IN `nameIN` VARCHAR(50))   INSERT INTO `tag` (`tag`.`name`)
VALUES (nameIN)$$

DROP PROCEDURE IF EXISTS `addUserRating`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `addUserRating` (IN `ratingerIdIN` INT, IN `userIdIN` INT, IN `ratingIN` INT)   INSERT INTO `userrating` (`userrating`.`ratingerId`, `userrating`.`userId`, `userrating`.`rating`)
VALUES (ratingerIdIN, userIdIN, ratingIN)$$

DROP PROCEDURE IF EXISTS `generalRegistration`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `generalRegistration` (IN `usernameIN` VARCHAR(50), IN `firstNameIN` VARCHAR(50), IN `lastNameIN` VARCHAR(50), IN `emailIN` VARCHAR(50), IN `birthdateIN` DATE, IN `passwordIN` VARCHAR(100))   BEGIN

	INSERT INTO `general` (`general`.`birthdate`)
	VALUES (birthdateIN);

	SELECT LAST_INSERT_ID() INTO @userId;
    
    INSERT INTO `user` (`user`.`username`, `user`.`email`, `user`.`password`, `user`.`rank`, `user`.`firstName`, `user`.`lastName`, `user`.`userId`)
    VALUES (usernameIN, emailIN, SHA1(passwordIN), "general", firstNameIN, lastNameIN, @userId);

END$$

DROP PROCEDURE IF EXISTS `getBookByCategory`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getBookByCategory` (IN `categoryNameIN` INT)   SELECT `book`.*
FROM `book`
LEFT JOIN `book_x_category` ON `book`.`id` = `book_x_category`.`bookId`
LEFT JOIN `category` ON `book_x_category`.`categoryId` = `category`.`id`
WHERE `category`.`name` = categoryNameIN
ORDER BY RAND()$$

DROP PROCEDURE IF EXISTS `getBookRating`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getBookRating` (IN `bookIdIN` INT, OUT `avgRatingOUT` INT)   SELECT AVG(`bookrating`.`rating`) INTO @avgRatingOUT
FROM `bookrating`
WHERE `bookrating`.`bookId` = bookIdIN$$

DROP PROCEDURE IF EXISTS `getBookReport`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getBookReport` ()   SELECT * FROM `bookreport`$$

DROP PROCEDURE IF EXISTS `getCompanyName`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getCompanyName` (IN `publisherIdIN` INT, OUT `companyNameOUT` VARCHAR(50))   SELECT `publisher`.`companyName` INTO companyNameOUT
FROM `publisher`
WHERE `publisher`.`id` = publisherIdIN$$

DROP PROCEDURE IF EXISTS `getPublishedByBook`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getPublishedByBook` ()   SELECT * FROM `book`
WHERE `book`.`status` = "published by"$$

DROP PROCEDURE IF EXISTS `getSearch`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getSearch` (IN `textIN` INT)   BEGIN

	SELECT SUBSTRING(textIN, 1, 1) INTO @firstChar;
    
    IF @firstChar = "@" THEN
    	SELECT SUBSTRING(textIN, 2) INTO @text;
    	SELECT * FROM `user` WHERE `user`.`username` LIKE CONCAT("%", @text, "%");
        
    ELSE 
    	SELECT * FROM `user` WHERE `user`.`username` LIKE
        CONCAT("%", textIN, "%");
    END IF;

END$$

DROP PROCEDURE IF EXISTS `getSelfPublishedBook`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getSelfPublishedBook` ()   SELECT * FROM `book`
WHERE `book`.`status` = "self-published"$$

DROP PROCEDURE IF EXISTS `getTagByUserId`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getTagByUserId` (IN `userIdIN` INT)   SELECT `tag`.`name` FROM `tag` WHERE `tag`.`userId` = userIdIN$$

DROP PROCEDURE IF EXISTS `getUserRating`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getUserRating` (IN `userIdIN` INT, OUT `avgRatingOUT` INT)   SELECT AVG(`userrating`.`rating`) INTO @avgRatingOUT
FROM `userrating`
WHERE `userrating`.`userId` = userIdIN$$

DROP PROCEDURE IF EXISTS `login`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `login` (IN `emailIN` VARCHAR(50), IN `passwordIN` VARCHAR(100), OUT `idOUT` INT)   SELECT `user`.`id` INTO idOUT FROM `user`
WHERE `user`.`email` = emailIN AND `user`.`password` = SHA1(passwordIN)$$

DROP PROCEDURE IF EXISTS `publisherRegistration`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `publisherRegistration` (IN `usernameIN` VARCHAR(50), IN `firstNameIN` VARCHAR(50), IN `lastNameIN` VARCHAR(50), IN `companyNameIN` VARCHAR(50), IN `emailIN` VARCHAR(50), IN `passwordIN` VARCHAR(100))   BEGIN

	INSERT INTO `publisher` (`publisher`.`companyName`)
	VALUES (companyNameIN);

	SELECT LAST_INSERT_ID() INTO @userId;
    
    INSERT INTO `user` (`user`.`username`, `user`.`email`, `user`.`password`, `user`.`rank`, `user`.`firstName`, `user`.`lastName`, `user`.`userId`)
    VALUES (usernameIN, emailIN, SHA1(passwordIN), "publisher", firstNameIN, lastNameIN, @userId);

END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `ages`
--

DROP TABLE IF EXISTS `ages`;
CREATE TABLE IF NOT EXISTS `ages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `minAge` int UNSIGNED NOT NULL,
  `maxAge` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `aszf`
--

DROP TABLE IF EXISTS `aszf`;
CREATE TABLE IF NOT EXISTS `aszf` (
  `id` int NOT NULL AUTO_INCREMENT,
  `startDate` timestamp NOT NULL,
  `endDate` timestamp NULL DEFAULT NULL,
  `aszfText` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
CREATE TABLE IF NOT EXISTS `book` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `status` enum('looking for a publisher','published by','self-published') NOT NULL,
  `writerId` int NOT NULL,
  `publisherId` int DEFAULT NULL,
  `publishedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `rating` double UNSIGNED DEFAULT NULL,
  `summary` varchar(1000) NOT NULL,
  `price` int UNSIGNED NOT NULL,
  `coverImage` varchar(50) DEFAULT NULL,
  `text` varchar(50) NOT NULL,
  `chapterNumber` int UNSIGNED NOT NULL,
  `freeChapterNumber` int UNSIGNED NOT NULL,
  `languageId` int NOT NULL,
  `adultFiction` tinyint(1) NOT NULL,
  `agesId` int NOT NULL,
  `categoryId` int NOT NULL,
  `copyrightId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `writerId` (`writerId`),
  KEY `publisherId` (`publisherId`),
  KEY `agesId` (`agesId`),
  KEY `languageId` (`languageId`),
  KEY `categoryId` (`categoryId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `bookrating`
--

DROP TABLE IF EXISTS `bookrating`;
CREATE TABLE IF NOT EXISTS `bookrating` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ratingerId` int NOT NULL,
  `bookId` int NOT NULL,
  `ratingTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `rating` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ratingerId` (`ratingerId`),
  KEY `bookId` (`bookId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `bookreport`
--

DROP TABLE IF EXISTS `bookreport`;
CREATE TABLE IF NOT EXISTS `bookreport` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `bookId` int NOT NULL,
  `description` varchar(500) NOT NULL,
  `reportTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `bookId` (`bookId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `bookshopping`
--

DROP TABLE IF EXISTS `bookshopping`;
CREATE TABLE IF NOT EXISTS `bookshopping` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `bookId` int NOT NULL,
  `shoppingTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `bookId` (`bookId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `booksopened`
--

DROP TABLE IF EXISTS `booksopened`;
CREATE TABLE IF NOT EXISTS `booksopened` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `bookId` int NOT NULL,
  `openedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `bookId` (`bookId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `image` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `categoryinterest`
--

DROP TABLE IF EXISTS `categoryinterest`;
CREATE TABLE IF NOT EXISTS `categoryinterest` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `categoryId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `categoryId` (`categoryId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `color`
--

DROP TABLE IF EXISTS `color`;
CREATE TABLE IF NOT EXISTS `color` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(8) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `copyright`
--

DROP TABLE IF EXISTS `copyright`;
CREATE TABLE IF NOT EXISTS `copyright` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` varchar(200) NOT NULL,
  `helpCenterId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `helpCenterId` (`helpCenterId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `follow`
--

DROP TABLE IF EXISTS `follow`;
CREATE TABLE IF NOT EXISTS `follow` (
  `id` int NOT NULL AUTO_INCREMENT,
  `followerId` int NOT NULL,
  `followdId` int NOT NULL,
  `followingTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `followerId` (`followerId`),
  KEY `followdId` (`followdId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `forgotpassword`
--

DROP TABLE IF EXISTS `forgotpassword`;
CREATE TABLE IF NOT EXISTS `forgotpassword` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `code` char(6) NOT NULL,
  `active` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `general`
--

DROP TABLE IF EXISTS `general`;
CREATE TABLE IF NOT EXISTS `general` (
  `id` int NOT NULL AUTO_INCREMENT,
  `authorName` varchar(50) DEFAULT NULL,
  `birthdate` date NOT NULL,
  `publicFullName` tinyint(1) NOT NULL DEFAULT '0',
  `publishedBookCount` int UNSIGNED NOT NULL DEFAULT '0',
  `selfPublishedBookCount` int UNSIGNED NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `helpcenter`
--

DROP TABLE IF EXISTS `helpcenter`;
CREATE TABLE IF NOT EXISTS `helpcenter` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` text NOT NULL,
  `answer` text,
  `active` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `language`
--

DROP TABLE IF EXISTS `language`;
CREATE TABLE IF NOT EXISTS `language` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` char(2) NOT NULL,
  `language` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `list`
--

DROP TABLE IF EXISTS `list`;
CREATE TABLE IF NOT EXISTS `list` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `bookId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `bookId` (`bookId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `pay`
--

DROP TABLE IF EXISTS `pay`;
CREATE TABLE IF NOT EXISTS `pay` (
  `id` int NOT NULL AUTO_INCREMENT,
  `invoiceNumber` varchar(20) NOT NULL,
  `paymentId` int NOT NULL,
  `invoice` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `paymentId` (`paymentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
CREATE TABLE IF NOT EXISTS `post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `text` varchar(1000) NOT NULL,
  `postTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `postlike`
--

DROP TABLE IF EXISTS `postlike`;
CREATE TABLE IF NOT EXISTS `postlike` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `postId` int NOT NULL,
  `likeTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `postId` (`postId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `post_x_tag`
--

DROP TABLE IF EXISTS `post_x_tag`;
CREATE TABLE IF NOT EXISTS `post_x_tag` (
  `id` int NOT NULL AUTO_INCREMENT,
  `postId` int NOT NULL,
  `tagId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `postId` (`postId`),
  KEY `tagId` (`tagId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `publisher`
--

DROP TABLE IF EXISTS `publisher`;
CREATE TABLE IF NOT EXISTS `publisher` (
  `id` int NOT NULL AUTO_INCREMENT,
  `companyName` varchar(50) DEFAULT NULL,
  `publishedBookCount` int UNSIGNED NOT NULL DEFAULT '0',
  `publishedBookCountOnPage` int UNSIGNED NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `read`
--

DROP TABLE IF EXISTS `read`;
CREATE TABLE IF NOT EXISTS `read` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `bookId` int NOT NULL,
  `readTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `readSecound` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `bookId` (`bookId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `search`
--

DROP TABLE IF EXISTS `search`;
CREATE TABLE IF NOT EXISTS `search` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `categoryId` int NOT NULL,
  `searchTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `categoryId` (`categoryId`),
  KEY `userId` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `subscription`
--

DROP TABLE IF EXISTS `subscription`;
CREATE TABLE IF NOT EXISTS `subscription` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `price` int UNSIGNED NOT NULL,
  `description` varchar(500) NOT NULL,
  `validityDay` int UNSIGNED NOT NULL,
  `optional` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
CREATE TABLE IF NOT EXISTS `tag` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `rank` enum('general','publisher') NOT NULL,
  `firstName` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `publicEmail` tinyint(1) NOT NULL DEFAULT '0',
  `publicPhone` tinyint(1) NOT NULL DEFAULT '0',
  `introText` varchar(1000) DEFAULT NULL,
  `website` varchar(100) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `tutorial` tinyint(1) NOT NULL DEFAULT '0',
  `registrationTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `coverColorId` int NOT NULL DEFAULT '1',
  `userId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`),
  KEY `coverColorId` (`coverColorId`),
  KEY `userId` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `userrating`
--

DROP TABLE IF EXISTS `userrating`;
CREATE TABLE IF NOT EXISTS `userrating` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ratingerId` int NOT NULL,
  `userId` int NOT NULL,
  `ratingTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `rating` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ratingerId` (`ratingerId`),
  KEY `userId` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `user_x_subscription`
--

DROP TABLE IF EXISTS `user_x_subscription`;
CREATE TABLE IF NOT EXISTS `user_x_subscription` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `subscriptionId` int NOT NULL,
  `subscriptionTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `subscriptionId` (`subscriptionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
