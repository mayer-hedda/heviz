-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2023. Dec 16. 01:30
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `cyberread`
--
CREATE DATABASE IF NOT EXISTS `cyberread` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `cyberread`;

DELIMITER $$
--
-- Eljárások
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `addBook` (IN `userIdIN` INT, IN `titleIN` VARCHAR(50), IN `descriptionIN` VARCHAR(1000), IN `targetAudienceIdIN` INT, IN `languageIdIN` INT, IN `adultFictionIN` BOOLEAN, IN `categoryIdIN` INT, IN `statusIN` INT, IN `priceIN` INT, IN `coverImageIN` VARCHAR(100), IN `fileIN` VARCHAR(100), IN `bankAccountNumberIN` VARCHAR(30), OUT `result` INT)   BEGIN

	DECLARE statusText VARCHAR(50);
 
    IF NOT EXISTS (SELECT * FROM `targetaudience` WHERE `targetaudience`.`id` = targetAudienceIdIN) AND NOT EXISTS (SELECT * FROM `language` WHERE `language`.`id` = languageIdIN) AND NOT EXISTS (SELECT * FROM `category` WHERE `category`.`id` = categoryIdIN) THEN
    	SET result = 8;
    ELSEIF NOT EXISTS (SELECT * FROM `language` WHERE `language`.`id` = languageIdIN) AND NOT EXISTS (SELECT * FROM `category` WHERE `category`.`id` = categoryIdIN) THEN
    	SET result = 7;
    ELSEIF NOT EXISTS (SELECT * FROM `targetaudience` WHERE `targetaudience`.`id` = targetAudienceIdIN) AND NOT EXISTS (SELECT * FROM `category` WHERE `category`.`id` = categoryIdIN) THEN
    	SET result = 6;
    ELSEIF NOT EXISTS (SELECT * FROM `targetaudience` WHERE `targetaudience`.`id` = targetAudienceIdIN) AND NOT EXISTS (SELECT * FROM `language` WHERE `language`.`id` = languageIdIN) THEN
    	SET result = 5;
    ELSEIF NOT EXISTS (SELECT * FROM `category` WHERE `category`.`id` = categoryIdIN) THEN
    	SET result = 4;
    ELSEIF NOT EXISTS (SELECT * FROM `language` WHERE `language`.`id` = languageIdIN) THEN
    	SET result = 3;
    ELSEIF NOT EXISTS (SELECT * FROM `targetaudience` WHERE `targetaudience`.`id` = targetAudienceIdIN) THEN
    	SET result = 2;
    ELSE

        IF statusIN IS NOT NULL THEN
            IF statusIN = 1 THEN
                SET statusText = "looking for a publisher";
                INSERT INTO `book` (`book`.`writerId`,`book`.`title`, `book`.`description`, `book`.`targetAudienceId`, `book`.`languageId`, `book`.`adultFiction`, `book`.`categoryId`, `book`.`status`, `book`.`coverImage`, `book`.`file`)
                VALUES (userIdIN, titleIN, descriptionIN, targetAudienceIdIN, languageIdIN, adultFictionIN, categoryIdIN, statusText, coverImageIN, fileIN);
                SET result = 1;
            ELSEIF statusIN = 2 THEN
                SET statusText = "self-published";

                INSERT INTO `book` (`book`.`writerId`,`book`.`title`, `book`.`description`, `book`.`targetAudienceId`, `book`.`languageId`, `book`.`adultFiction`, `book`.`categoryId`, `book`.`status`, `book`.`price`, `book`.`coverImage`, `book`.`file`, `book`.`bankAccountNumber`)
                VALUES (userIdIN, titleIN, descriptionIN, targetAudienceIdIN, languageIdIN, adultFictionIN, categoryIdIN, statusText, priceIN, coverImageIN, fileIN, bankAccountNumberIN);
                SET result = 1;
            END IF;
        END IF;
    END IF;
    
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `addPost` (IN `userIdIN` INT, IN `descriptionIN` VARCHAR(1000))   INSERT INTO `post` (`post`.`userId`, `post`.`description`)
VALUES (userIdIN, descriptionIN)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `generalRegistration` (IN `usernameIN` VARCHAR(50), IN `firstNameIN` VARCHAR(50), IN `lastNameIN` VARCHAR(50), IN `emailIN` VARCHAR(50), IN `birthdateIN` DATE, IN `passwordIN` VARCHAR(100))   BEGIN

	INSERT INTO `general` (`general`.`birthdate`)
	VALUES (birthdateIN);

	SELECT LAST_INSERT_ID() INTO @userId;
    
    INSERT INTO `user` (`user`.`username`, `user`.`email`, `user`.`password`, `user`.`rank`, `user`.`firstName`, `user`.`lastName`, `user`.`userId`)
    VALUES (usernameIN, emailIN, SHA1(passwordIN), "general", firstNameIN, lastNameIN, @userId);

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllCategories` ()   SELECT `category`.`id`, `category`.`name`
FROM `category`$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllLanguages` ()   SELECT *
FROM `language`$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllTargetAudiences` ()   SELECT *
FROM `targetaudience`$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getBookDetails` (IN `bookIdIN` INT)   SELECT
	`book`.`id`,
    `book`.`title`,
    `book`.`description`,
    `book`.`targetAudienceId`,
    `book`.`languageId`,
    `book`.`adultFiction`,
    `book`.`categoryId`,
    `book`.`status`,
    `book`.`price`,
    `book`.`coverImage`,
    `book`.`file`,
    `book`.`bankAccountNumber`
FROM `book`
WHERE `book`.`id` = bookIdIN$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getFeedPosts` (IN `userIdIN` INT)   SELECT 
	`post`.`id`,
    `user`.`username`, 
    `user`.`image`, 
    `post`.`postTime`, 
    `post`.`description`,
    IF(`postlike`.`userId` IS NOT NULL, TRUE, FALSE) AS `liked`
FROM 
    `user`
INNER JOIN 
    `follow` ON `follow`.`followedId` = `user`.`id`
INNER JOIN 
    `post` ON `post`.`userId` = `follow`.`followedId`
LEFT JOIN 
    `postlike` ON `postlike`.`postId` = `post`.`id` AND `postlike`.`userId` = userIdIN
WHERE
    `follow`.`followerId` = userIdIN
ORDER BY
	RAND()$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getMostSavedBooksOfTheMonth` (IN `userIdIN` INT)   SELECT DISTINCT 
	`book`.`id`,
    `book`.`coverImage`,
	`book`.`title`, 
    `general`.`authorName`, 
    `writer`.`firstName`, 
    `writer`.`lastName`,
    `publisher`.`companyName`,
    `book`.`description`,
    `book`.`pagesNumber`,
    AVG(`bookrating`.`rating`) AS `rating`,
    `language`.`code`,
    IF(`saved`.`userId` IS NOT NULL, TRUE, FALSE) AS `save`
FROM `book`
INNER JOIN `user` AS `writer` ON `writer`.`id` = `book`.`writerId`
INNER JOIN `user` AS `publish` ON `publish`.`id` = `book`.`publisherId`
INNER JOIN `general` ON `general`.`id` = `writer`.`userId`
INNER JOIN `publisher` ON `publisher`.`id` = `publish`.`userId`
INNER JOIN `bookrating` ON `bookrating`.`bookId` = `book`.`id`
INNER JOIN `language` ON `language`.`id` = `book`.`languageId`
LEFT JOIN `saved` ON `saved`.`bookId` = `book`.`id` AND `saved`.`userId` = userIdIN
WHERE 
	YEAR(`saved`.`savedTime`) = YEAR(CURRENT_DATE()) AND 
    MONTH(`saved`.`savedTime`) = MONTH(CURRENT_DATE())
ORDER BY COUNT(`saved`.`id`) DESC
LIMIT 5$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getOneRandomBook` (IN `userIdIN` INT)   SELECT DISTINCT
    `book`.`id`, 
    `book`.`coverImage`, 
    `book`.`title`, 
    `general`.`authorName`,
    `writer`.`firstName`,
    `writer`.`lastName`,
    `publisher`.`companyName`,
    `book`.`description`,
    `book`.`pagesNumber`,
    AVG(`bookrating`.`rating`) AS rating, 
    `language`.`code`, 
    IF(`saved`.`userId` IS NOT NULL, TRUE, FALSE) AS `save`
FROM `book`
INNER JOIN `user` AS `writer` ON `writer`.`id` = `book`.`writerId`
INNER JOIN `user` AS `publish` ON `publish`.`id` = `book`.`publisherId`
INNER JOIN `general` ON `general`.`id` = `writer`.`userId`
INNER JOIN `publisher` ON `publisher`.`id` = `publish`.`userId`
INNER JOIN `bookrating` ON `bookrating`.`bookId` = `book`.`id`
INNER JOIN `language` ON `language`.`id` = `book`.`languageId`
LEFT JOIN `saved` ON `saved`.`bookId` = `book`.`id` AND `saved`.`userId` = userIdIN
ORDER BY RAND()
LIMIT 1$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getPublishedBooks` (IN `userIdIN` INT)   SELECT DISTINCT
    `book`.`id`, 
    `book`.`coverImage`, 
    `book`.`title`, 
    `general`.`authorName`,
    `writer`.`firstName`,
    `writer`.`lastName`,
    `publisher`.`companyName`,
    `book`.`description`,
    `book`.`pagesNumber`,
    AVG(`bookrating`.`rating`) AS rating, 
    `language`.`code`, 
    IF(`saved`.`userId` IS NOT NULL, TRUE, FALSE) AS `save`
FROM `book`
INNER JOIN `user` AS `writer` ON `writer`.`id` = `book`.`writerId`
INNER JOIN `user` AS `publish` ON `publish`.`id` = `book`.`publisherId`
INNER JOIN `general` ON `general`.`id` = `writer`.`userId`
INNER JOIN `publisher` ON `publisher`.`id` = `publish`.`userId`
INNER JOIN `bookrating` ON `bookrating`.`bookId` = `book`.`id`
INNER JOIN `language` ON `language`.`id` = `book`.`languageId`
LEFT JOIN `saved` ON `saved`.`bookId` = `book`.`id` AND `saved`.`userId` = userIdIN
WHERE `book`.`status` = "published by"
ORDER BY RAND()
LIMIT 9$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getRecommandedBooks` (IN `userIdIN` INT)   SELECT DISTINCT
    `book`.`id`, 
    `book`.`coverImage`, 
    `book`.`title`,
    `general`.`authorName`,
    `writer`.`firstName`,
    `writer`.`lastName`,
    `publisher`.`companyName`,
    `book`.`description`, 
    `book`.`pagesNumber`,
    AVG(`bookrating`.`rating`) AS rating, 
    `language`.`code`, 
    IF(`saved`.`userId` IS NOT NULL, TRUE, FALSE) AS `save`
FROM `book`
INNER JOIN `user` AS `writer` ON `writer`.`id` = `book`.`writerId`
INNER JOIN `user` AS `publish` ON `publish`.`id` = `book`.`publisherId`
INNER JOIN `general` ON `general`.`id` = `writer`.`userId`
INNER JOIN `publisher` ON `publisher`.`id` = `publish`.`userId`
INNER JOIN `bookrating` ON `bookrating`.`bookId` = `book`.`id`
INNER JOIN `language` ON `language`.`id` = `book`.`languageId`
LEFT JOIN `saved` ON `saved`.`bookId` = `book`.`id` AND `saved`.`userId` = userIdIN
WHERE `book`.`categoryId` IN (
    SELECT `category`.`id`
	FROM `saved`
	INNER JOIN `book` ON `book`.`id` = `saved`.`bookId`
	INNER JOIN `category` ON `category`.`id` = `book`.`categoryId`
	WHERE `saved`.`userId` = userIdIN
)
OR
`book`.`categoryId` IN (
	SELECT `categoryinterest`.`categoryId`
    FROM `categoryinterest`
    WHERE `categoryinterest`.`userId` = userIdIN
)
ORDER BY 
    RAND()
LIMIT 9$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getRecommandedUsers` (IN `userIdIN` INT)   SELECT DISTINCT `user`.`image`, `user`.`username`
FROM `user`
INNER JOIN `follow` ON `user`.`id` = `follow`.`followerId`
WHERE `follow`.`followedId` IN (
    SELECT DISTINCT `user`.`id`
	FROM `user`
	INNER JOIN `follow` ON `user`.`id` = `follow`.`followedId`
	WHERE `follow`.`followerId` = userIdIN
)
AND `user`.`id` != userIdIN
AND `user`.`id` NOT IN (
	SELECT `user`.`id`
    FROM `user`
    INNER JOIN `follow` ON `user`.`id` = `follow`.`followedId`
    WHERE `follow`.`followerId` = userIdIN
)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getSelfPublishedBooks` (IN `userIdIN` INT)   SELECT DISTINCT
    `book`.`id`, 
    `book`.`coverImage`, 
    `book`.`title`, 
    `general`.`authorName`,
    `writer`.`firstName`,
    `writer`.`lastName`,
    `publisher`.`companyName`,
    `book`.`description`,
    `book`.`pagesNumber`,
    AVG(`bookrating`.`rating`) AS rating, 
    `language`.`code`, 
    IF(`saved`.`userId` IS NOT NULL, TRUE, FALSE) AS `save`
FROM `book`
INNER JOIN `user` AS `writer` ON `writer`.`id` = `book`.`writerId`
INNER JOIN `user` AS `publish` ON `publish`.`id` = `book`.`publisherId`
INNER JOIN `general` ON `general`.`id` = `writer`.`userId`
INNER JOIN `publisher` ON `publisher`.`id` = `publish`.`userId`
INNER JOIN `bookrating` ON `bookrating`.`bookId` = `book`.`id`
INNER JOIN `language` ON `language`.`id` = `book`.`languageId`
LEFT JOIN `saved` ON `saved`.`bookId` = `book`.`id` AND `saved`.`userId` = userIdIN
WHERE `book`.`status` = "self-published"
ORDER BY RAND()
LIMIT 9$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `login` (IN `emailIN` VARCHAR(50), IN `passwordIN` VARCHAR(100), OUT `userIdOUT` INT, OUT `usernameOUT` VARCHAR(50), OUT `imageOUT` VARCHAR(100), OUT `rankOUT` ENUM("admin","general","publisher"))   SELECT `user`.`id`, `user`.`username`, `user`.`image`, `user`.`rank`
INTO userIdOUT, usernameOUT, imageOUT, rankOUT
FROM `user`
WHERE `user`.`email` = emailIN AND `user`.`password` = SHA1(passwordIN)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `postDislike` (IN `userIdIN` INT, IN `postIdIN` INT, OUT `result` INT)   BEGIN

	IF NOT EXISTS (SELECT * FROM `post` WHERE `post`.`id` = postIdIN) THEN
        SET result = 2;
    ELSE
        DELETE 
        FROM `postlike`
        WHERE `postlike`.`userId` = userIdIN AND `postlike`.`postId` = postIdIN;

        SET result = 1;
    END IF;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `postLike` (IN `userIdIN` INT, IN `postIdIN` INT, OUT `result` INT)   BEGIN

	IF NOT EXISTS (SELECT * FROM `post` WHERE `post`.`id` = postIdIN) THEN
    	SET result = 2;
    ELSE
        INSERT INTO `postlike` (`postlike`.`userId`, `postlike`.`postId`)
        VALUES (userIdIN, postIdIN);
        
        SET result = 1;
    END IF;
    
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `publisherRegistration` (IN `usernameIN` VARCHAR(50), IN `firstNameIN` VARCHAR(50), IN `lastNameIN` VARCHAR(50), IN `companyNameIN` VARCHAR(50), IN `emailIN` VARCHAR(50), IN `passwordIN` VARCHAR(100))   BEGIN

	INSERT INTO `publisher` (`publisher`.`companyName`)
	VALUES (companyNameIN);

	SELECT LAST_INSERT_ID() INTO @userId;
    
    INSERT INTO `user` (`user`.`username`, `user`.`email`, `user`.`password`, `user`.`rank`, `user`.`firstName`, `user`.`lastName`, `user`.`userId`)
    VALUES (usernameIN, emailIN, SHA1(passwordIN), "publisher", firstNameIN, lastNameIN, @userId);

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `setBook` (IN `bookIdIN` INT, IN `titleIN` VARCHAR(50), IN `descriptionIN` VARCHAR(1000), IN `targetAudienceIdIN` INT, IN `languageIdIN` INT, IN `adultFictionIN` BOOLEAN, IN `categoryIdIN` INT, IN `statusIdIN` INT, IN `priceIN` INT, IN `coverImageIN` VARCHAR(100), IN `fileIN` VARCHAR(100), IN `bankAccountNumberIN` VARCHAR(30), OUT `result` INT)   BEGIN
    
    IF NOT EXISTS (SELECT * FROM `targetaudience` WHERE `targetaudience`.`id` = targetAudienceIdIN) AND NOT EXISTS (SELECT * FROM `language` WHERE `language`.`id` = languageIdIN) AND NOT EXISTS (SELECT * FROM `category` WHERE `category`.`id` = categoryIdIN) THEN
    	SET result = 8;
    ELSEIF NOT EXISTS (SELECT * FROM `language` WHERE `language`.`id` = languageIdIN) AND NOT EXISTS (SELECT * FROM `category` WHERE `category`.`id` = categoryIdIN) THEN
    	SET result = 7;
    ELSEIF NOT EXISTS (SELECT * FROM `targetaudience` WHERE `targetaudience`.`id` = targetAudienceIdIN) AND NOT EXISTS (SELECT * FROM `category` WHERE `category`.`id` = categoryIdIN) THEN
    	SET result = 6;
    ELSEIF NOT EXISTS (SELECT * FROM `targetaudience` WHERE `targetaudience`.`id` = targetAudienceIdIN) AND NOT EXISTS (SELECT * FROM `language` WHERE `language`.`id` = languageIdIN) THEN
    	SET result = 5;
    ELSEIF NOT EXISTS (SELECT * FROM `category` WHERE `category`.`id` = categoryIdIN) THEN
    	SET result = 4;
    ELSEIF NOT EXISTS (SELECT * FROM `language` WHERE `language`.`id` = languageIdIN) THEN
    	SET result = 3;
    ELSEIF NOT EXISTS (SELECT * FROM `targetaudience` WHERE `targetaudience`.`id` = targetAudienceIdIN) THEN
    	SET result = 2;
    ELSE
    
        IF statusIdIN IS NOT NULL THEN
            IF statusIdIN = 1 THEN
                UPDATE `book`
                SET `book`.`status` = "looking for a publisher"
                WHERE `book`.`id` = bookIdIN;

                UPDATE `book`
                SET `book`.`price` = NULL
                WHERE `book`.`id` = bookIdIN;
            ELSEIF statusIdIN = 2 THEN
                UPDATE `book`
                SET `book`.`status` = "self-published"
                WHERE `book`.`id` = bookIdIN;

                IF priceIN IS NOT NULL THEN
                    UPDATE `book`
                    SET `book`.`price` = priceIN
                    WHERE `book`.`id` = bookIdIN;
                END IF;

                IF bankAccountNumberIN IS NOT NULL THEN
                    UPDATE `book`
                    SET `book`.`bankAccountNumber` = bankAccountNumberIN
                    WHERE `user`.`id` = (SELECT `book`.`writerId` FROM `book` WHERE `book`.`id` = bookIdIN);
                END IF;
            END IF;
        END IF;

        IF titleIN IS NOT NULL THEN
            UPDATE `book`
            SET `book`.`title` = titleIN
            WHERE `book`.`id` = bookIdIN;
        END IF;

        IF descriptionIN IS NOT NULL THEN
            UPDATE `book`
            SET `book`.`description` = descriptionIN
            WHERE `book`.`id` = bookIdIN;
        END IF;

        IF targetAudienceIdIN IS NOT NULL THEN
            UPDATE `book`
            SET `book`.`targetAudienceId` = targetAudienceIdIN
            WHERE `book`.`id` = bookIdIN;
        END IF;

        IF languageIdIN IS NOT NULL THEN
            UPDATE `book`
            SET `book`.`languageId` = languageIdIN
            WHERE `book`.`id` = bookIdIN;
        END IF;

        IF adultFictionIN IS NOT NULL THEN
            UPDATE `book`
            SET `book`.`adultFiction` = adultFictionIN
            WHERE `book`.`id` = bookIdIN;
        END IF;

        IF categoryIdIN IS NOT NULL THEN
            UPDATE `book`
            SET `book`.`categoryId` = categoryIdIN
            WHERE `book`.`id` = bookIdIN;
        END IF;

        IF coverImageIN IS NOT NULL THEN
            UPDATE `book`
            SET `book`.`coverImage` = coverImageIN
            WHERE `book`.`id` = bookIdIN;
        END IF;

        IF fileIN IS NOT NULL THEN
            UPDATE `book`
            SET `book`.`file` = fileIN
            WHERE `book`.`id` = bookIdIN;
        END IF;

        SET result = 1;
    END IF;

END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aszf`
--

CREATE TABLE `aszf` (
  `id` int(11) NOT NULL,
  `startDate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `endDate` timestamp NULL DEFAULT NULL,
  `description` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `book`
--

CREATE TABLE `book` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `status` enum('looking for a publisher','published by','self-published') NOT NULL,
  `writerId` int(11) NOT NULL,
  `publisherId` int(11) DEFAULT NULL,
  `publishedTime` timestamp NOT NULL DEFAULT current_timestamp(),
  `rating` double UNSIGNED DEFAULT NULL,
  `description` varchar(1000) NOT NULL,
  `price` int(10) UNSIGNED NOT NULL,
  `coverImage` varchar(100) NOT NULL,
  `file` varchar(100) NOT NULL,
  `chapterNumber` int(10) UNSIGNED NOT NULL,
  `freeChapterNumber` int(10) UNSIGNED NOT NULL,
  `pagesNumber` int(10) UNSIGNED NOT NULL,
  `adultFiction` tinyint(1) NOT NULL,
  `bankAccountNumber` varchar(30) DEFAULT NULL,
  `languageId` int(11) NOT NULL,
  `targetAudienceId` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `bookrating`
--

CREATE TABLE `bookrating` (
  `id` int(11) NOT NULL,
  `ratingerId` int(11) NOT NULL,
  `bookId` int(11) NOT NULL,
  `rating` int(10) UNSIGNED NOT NULL,
  `ratingTime` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `bookreport`
--

CREATE TABLE `bookreport` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `bookId` int(11) NOT NULL,
  `description` varchar(500) NOT NULL,
  `reportTime` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `bookshopping`
--

CREATE TABLE `bookshopping` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `bookId` int(11) NOT NULL,
  `shoppingTime` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `image` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `categoryinterest`
--

CREATE TABLE `categoryinterest` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `color`
--

CREATE TABLE `color` (
  `id` int(11) NOT NULL,
  `code` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `follow`
--

CREATE TABLE `follow` (
  `id` int(11) NOT NULL,
  `followerId` int(11) NOT NULL,
  `followedId` int(11) NOT NULL,
  `followingTime` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `forgotpassword`
--

CREATE TABLE `forgotpassword` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `code` char(6) NOT NULL,
  `sendTime` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `general`
--

CREATE TABLE `general` (
  `id` int(11) NOT NULL,
  `authorName` varchar(50) DEFAULT NULL,
  `birthdate` date NOT NULL,
  `publishedBookCount` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `selfPublishedBookCount` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `helpcenter`
--

CREATE TABLE `helpcenter` (
  `id` int(11) NOT NULL,
  `question` text NOT NULL,
  `answer` text DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `language`
--

CREATE TABLE `language` (
  `id` int(11) NOT NULL,
  `code` char(2) NOT NULL,
  `language` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `payment`
--

CREATE TABLE `payment` (
  `id` int(11) NOT NULL,
  `bookShoppingId` int(11) NOT NULL,
  `invoiceNumber` varchar(20) NOT NULL,
  `invoice` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `post`
--

CREATE TABLE `post` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `postTime` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `postlike`
--

CREATE TABLE `postlike` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `postId` int(11) NOT NULL,
  `likeTime` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `publisher`
--

CREATE TABLE `publisher` (
  `id` int(11) NOT NULL,
  `companyName` varchar(50) DEFAULT NULL,
  `publishedBookCount` int(10) UNSIGNED NOT NULL,
  `publishedBookCountOnPage` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `saved`
--

CREATE TABLE `saved` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `bookId` int(11) NOT NULL,
  `savedTime` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `targetaudience`
--

CREATE TABLE `targetaudience` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `minAge` int(10) UNSIGNED NOT NULL,
  `maxAge` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `rank` enum('general','publisher','admin','') NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `phoneNumber` varchar(15) DEFAULT NULL,
  `publicEmail` tinyint(1) NOT NULL DEFAULT 0,
  `publicPhoneNumber` tinyint(1) NOT NULL DEFAULT 0,
  `introDescription` varchar(1000) DEFAULT NULL,
  `website` varchar(100) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `registrationTime` timestamp NOT NULL DEFAULT current_timestamp(),
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `coverColorId` int(11) NOT NULL DEFAULT 1,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `userrating`
--

CREATE TABLE `userrating` (
  `id` int(11) NOT NULL,
  `ratingerId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `rating` int(10) UNSIGNED NOT NULL,
  `ratingTime` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `aszf`
--
ALTER TABLE `aszf`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`id`),
  ADD KEY `writerId` (`writerId`),
  ADD KEY `publisherId` (`publisherId`),
  ADD KEY `languageId` (`languageId`),
  ADD KEY `categoryId` (`categoryId`),
  ADD KEY `targetAudienceId` (`targetAudienceId`);

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
-- A tábla indexei `follow`
--
ALTER TABLE `follow`
  ADD PRIMARY KEY (`id`),
  ADD KEY `followerId` (`followerId`),
  ADD KEY `followedId` (`followedId`);

--
-- A tábla indexei `forgotpassword`
--
ALTER TABLE `forgotpassword`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

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
-- A tábla indexei `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bookShoppingId` (`bookShoppingId`);

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
-- A tábla indexei `publisher`
--
ALTER TABLE `publisher`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `saved`
--
ALTER TABLE `saved`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `bookId` (`bookId`);

--
-- A tábla indexei `targetaudience`
--
ALTER TABLE `targetaudience`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
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
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `aszf`
--
ALTER TABLE `aszf`
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
-- AUTO_INCREMENT a táblához `follow`
--
ALTER TABLE `follow`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `forgotpassword`
--
ALTER TABLE `forgotpassword`
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
-- AUTO_INCREMENT a táblához `payment`
--
ALTER TABLE `payment`
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
-- AUTO_INCREMENT a táblához `publisher`
--
ALTER TABLE `publisher`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `saved`
--
ALTER TABLE `saved`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `targetaudience`
--
ALTER TABLE `targetaudience`
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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
