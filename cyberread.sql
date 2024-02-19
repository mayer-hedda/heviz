-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Feb 19. 13:27
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

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
CREATE DEFINER=`root`@`localhost` PROCEDURE `addBook` (IN `userIdIN` INT, IN `titleIN` VARCHAR(50), IN `descriptionIN` VARCHAR(1000), IN `targetAudienceIdIN` INT, IN `languageIdIN` INT, IN `adultFictionIN` BOOLEAN, IN `categoryIdIN` INT, IN `statusIN` INT, IN `priceIN` INT, IN `coverImageIN` VARCHAR(100), IN `fileIN` VARCHAR(100), IN `bankAccountNumberIN` VARCHAR(30), IN `chapterNumberIN` INT, IN `freeChapterNumberIN` INT, OUT `result` INT)   BEGIN

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
                INSERT INTO `book` (`book`.`writerId`,`book`.`title`, `book`.`description`, `book`.`targetAudienceId`, `book`.`languageId`, `book`.`adultFiction`, `book`.`categoryId`, `book`.`status`, `book`.`coverImage`, `book`.`file`, `book`.`chapterNumber`, `book`.`freeChapterNumber`)
                VALUES (userIdIN, titleIN, descriptionIN, targetAudienceIdIN, languageIdIN, adultFictionIN, categoryIdIN, statusText, coverImageIN, fileIN, chapterNumberIN, freeChapterNumberIN);
                SET result = 1;
            ELSEIF statusIN = 2 THEN
                SET statusText = "self-published";

                INSERT INTO `book` (`book`.`writerId`,`book`.`title`, `book`.`description`, `book`.`targetAudienceId`, `book`.`languageId`, `book`.`adultFiction`, `book`.`categoryId`, `book`.`status`, `book`.`price`, `book`.`coverImage`, `book`.`file`, `book`.`bankAccountNumber`, `book`.`chapterNumber`, `book`.`freeChapterNumber`)
                VALUES (userIdIN, titleIN, descriptionIN, targetAudienceIdIN, languageIdIN, adultFictionIN, categoryIdIN, statusText, priceIN, coverImageIN, fileIN, bankAccountNumberIN, chapterNumberIN, freeChapterNumberIN);
                SET result = 1;
            END IF;
        END IF;
    END IF;
    
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `addCategoryInterest` (IN `userIdIN` INT, IN `categoryIds` TEXT)   BEGIN

    DECLARE counter INT DEFAULT 1;
    DECLARE categoryId INT(11);

    WHILE counter <= LENGTH(categoryIds) - LENGTH(REPLACE(categoryIds, ',', '')) + 1 DO
        SET categoryId = SUBSTRING_INDEX(SUBSTRING_INDEX(categoryIds, ',', counter), ',', -1);
        
        IF NOT EXISTS(SELECT * FROM `categoryinterest` WHERE `categoryinterest`.`userId` = userIdIN AND `categoryinterest`.`categoryId` = categoryId) THEN
            INSERT INTO `categoryinterest` (`categoryinterest`.`userId`, `categoryinterest`.`categoryId`) 
            VALUES (userIdIN, categoryId);
        END IF;

        SET counter = counter + 1;
    END WHILE;
    
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `addPost` (IN `userIdIN` INT, IN `descriptionIN` VARCHAR(1000))   INSERT INTO `post` (`post`.`userId`, `post`.`description`)
VALUES (userIdIN, descriptionIN)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteBook` (IN `userIdIN` INT, IN `bookIdIN` INT, OUT `result` INT)   BEGIN

	IF (SELECT `book`.`writerId` FROM `book` WHERE `book`.`id` = bookIdIN) != userIdIN THEN
		SET result = 3;
    ELSEIF EXISTS (SELECT * FROM `book` WHERE `book`.`id` = bookIdIN) THEN
    	DELETE FROM `book`
        WHERE `book`.`id` = bookIdIN;
        
        SET result = 1;
    ELSE
    	SET result = 2;
    END IF;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deletePost` (IN `userIdIN` INT, IN `postIdIN` INT, OUT `result` INT)   BEGIN

	IF (SELECT `post`.`userId` FROM `post` WHERE `post`.`id` = postIdIN) != userIdIN THEN
    	SET result = 3;
    ELSEIF EXISTS (SELECT * FROM `post` WHERE `post`.`userId` = userIdIN AND `post`.`id` = postIdIN) THEN
    	DELETE FROM `post`
        WHERE `post`.`userId` = userIdIN AND `post`.`id` = postIdIN;
        
        SET result = 1;
    ELSE
    	SET result = 2;
    END IF;
	
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteSavedBook` (IN `userIdIN` INT, IN `bookIdIN` INT, OUT `result` INT)   BEGIN

	IF NOT EXISTS (SELECT * FROM `saved` WHERE `saved`.`userId` = userIdIN AND `saved`.`bookId` = bookIdIN) THEN
    	SET result = 2;
    ELSE
    	DELETE FROM `saved`
        WHERE `saved`.`userId` = userIdIN AND `saved`.`bookId` = bookIdIN;
        
        SET result = 1;
    END IF;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `followUser` (IN `userIdIN` INT, IN `followUserIdIN` INT, OUT `result` INT)   BEGIN

	IF userIdIN = followUserIdIN THEN
    	SET result = 3;
	ELSEIF NOT EXISTS (SELECT * FROM `follow` WHERE `follow`.`followerId` = userIdIN AND `follow`.`followedId` = followUserIdIN) THEN
    	INSERT INTO `follow` (`follow`.`followerId`, `follow`.`followedId`)
        VALUE (userIdIN, followUserIdIN);
        
        SET result = 1;
    ELSE
    	SET result = 2;
    END IF;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `generalRegistration` (IN `usernameIN` VARCHAR(50), IN `firstNameIN` VARCHAR(50), IN `lastNameIN` VARCHAR(50), IN `emailIN` VARCHAR(50), IN `birthdateIN` DATE, IN `passwordIN` VARCHAR(100))   BEGIN

	INSERT INTO `general` (`general`.`birthdate`)
	VALUES (birthdateIN);

	SELECT LAST_INSERT_ID() INTO @userId;
    
    INSERT INTO `user` (`user`.`username`, `user`.`email`, `user`.`password`, `user`.`rank`, `user`.`firstName`, `user`.`lastName`, `user`.`userId`)
    VALUES (usernameIN, emailIN, SHA1(passwordIN), "general", firstNameIN, lastNameIN, @userId);

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getActiveHelpCenter` ()   SELECT `helpcenter`.`id`, `helpcenter`.`question`, `helpcenter`.`answer`
FROM `helpcenter`
WHERE `helpcenter`.`active` = 1$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllBooksByCategory` (IN `userIdIN` INT, IN `categoryIdIN` INT)   SELECT
	`book`.`id`,
    `book`.`coverImage`,
    `book`.`title`,
    `writer`.`firstName`,
    `writer`.`lastName`,
    `publisher`.`companyName`,
    `book`.`description`,
    `book`.`pagesNumber`,
    `bookrat`.`rat`,
    `language`.`code`,
    IF(`saved`.`userId` IS NOT NULL, TRUE, FALSE) AS `save`
FROM `book`
INNER JOIN `user` AS `writer` ON `writer`.`id` = `book`.`writerId`
LEFT JOIN `publisher` ON `book`.`publisherId` = `publisher`.`id`
LEFT JOIN (
    SELECT `bookrating`.`bookId`,
	AVG(`bookrating`.`rating`) AS `rat`
	FROM `bookrating`
	GROUP BY `bookrating`.`bookId`
) AS `bookrat` ON `bookrat`.`bookId` = `book`.`id`
INNER JOIN `language` ON `language`.`id` = `book`.`languageId`
LEFT JOIN `saved` ON `saved`.`bookId` = `book`.`id` AND `saved`.`userId` = userIdIN
WHERE `book`.`categoryId` = categoryIdIN$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllCategory` ()   SELECT *
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `getDetails` (IN `userIdIN` INT)   BEGIN

	DECLARE rank VARCHAR(20);
    
    SELECT `user`.`rank` INTO rank FROM `user` WHERE `user`.`id` = userIdIN;
    
    IF rank = "general" THEN
    	SELECT
        	`user`.`rank`,
        	`user`.`username`,
            `user`.`email`,
            `user`.`phoneNumber`,
            `user`.`firstName`,
            `user`.`lastName`,
            `user`.`publicEmail`,
            `user`.`publicPhoneNumber`,
            `color`.`code`,
            `user`.`image`,
            `user`.`introDescription`,
            `user`.`website`
        FROM `user`
        INNER JOIN `color` ON `color`.`id` = `user`.`coverColorId`
        WHERE `user`.`id` = userIdIN;
    ELSEIF rank = "publisher" THEN
    	SELECT
        	`user`.`rank`,
        	`user`.`username`,
            `user`.`email`,
            `user`.`phoneNumber`,
            `user`.`firstName`,
            `user`.`lastName`,
            `user`.`publicEmail`,
            `user`.`publicPhoneNumber`,
            `color`.`code`,
            `user`.`image`,
            `user`.`introDescription`,
            `user`.`website`,
            `publisher`.`companyName`
        FROM `user`
        INNER JOIN `color` ON `color`.`id` = `user`.`coverColorId`
        INNER JOIN `publisher` ON `user`.`userId` = `publisher`.`id`
        WHERE `user`.`id` = userIdIN;
    END IF;

END$$

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

CREATE DEFINER=`root`@`localhost` PROCEDURE `getFilteredBooks` (IN `userIdIN` INT, IN `filter` INT)   BEGIN

	DECLARE rank VARCHAR(20);
    
    SELECT `user`.`rank` INTO rank 
    FROM `user`
    WHERE `user`.`id` = userIdIN;
    
    IF filter = 1 THEN
       	SELECT
            `book`.`id`,
            `book`.`coverImage`,
            `book`.`title`,
            `writer`.`firstName`,
            `writer`.`lastName`,
            `publisher`.`companyName`,
            `book`.`description`,
            `book`.`pagesNumber`,
            `bookrat`.`rat`,
            `language`.`code`,
            IF(`saved`.`userId` IS NOT NULL, TRUE, FALSE) AS `save`
        FROM `book`
        INNER JOIN `user` AS `writer` ON `writer`.`id` = `book`.`writerId`
        LEFT JOIN `publisher` ON `book`.`publisherId` = `publisher`.`id`
        LEFT JOIN (
            SELECT `bookrating`.`bookId`,
            AVG(`bookrating`.`rating`) AS `rat`
            FROM `bookrating`
            GROUP BY `bookrating`.`bookId`
        ) AS `bookrat` ON `bookrat`.`bookId` = `book`.`id`
        INNER JOIN `language` ON `language`.`id` = `book`.`languageId`
        LEFT JOIN `saved` ON `saved`.`bookId` = `book`.`id` AND `saved`.`userId` = userIdIN
        WHERE `book`.`categoryId` = categoryIdIN
        ORDER BY `book`.`title` ASC;
    ELSEIF filter = 2 THEN
      	SELECT
            `book`.`id`,
            `book`.`coverImage`,
            `book`.`title`,
            `writer`.`firstName`,
            `writer`.`lastName`,
            `publisher`.`companyName`,
            `book`.`description`,
            `book`.`pagesNumber`,
            `bookrat`.`rat`,
            `language`.`code`,
            IF(`saved`.`userId` IS NOT NULL, TRUE, FALSE) AS `save`
        FROM `book`
        INNER JOIN `user` AS `writer` ON `writer`.`id` = `book`.`writerId`
        LEFT JOIN `publisher` ON `book`.`publisherId` = `publisher`.`id`
        LEFT JOIN (
            SELECT `bookrating`.`bookId`,
            AVG(`bookrating`.`rating`) AS `rat`
            FROM `bookrating`
            GROUP BY `bookrating`.`bookId`
        ) AS `bookrat` ON `bookrat`.`bookId` = `book`.`id`
        INNER JOIN `language` ON `language`.`id` = `book`.`languageId`
        LEFT JOIN `saved` ON `saved`.`bookId` = `book`.`id` AND `saved`.`userId` = userIdIN
        WHERE `book`.`categoryId` = categoryIdIN
        ORDER BY `book`.`title` DESC;
    ELSEIF filter = 3 THEN
    	SELECT
            `book`.`id`,
            `book`.`coverImage`,
            `book`.`title`,
            `writer`.`firstName`,
            `writer`.`lastName`,
            `publisher`.`companyName`,
            `book`.`description`,
            `book`.`pagesNumber`,
            `bookrat`.`rat`,
            `language`.`code`,
            IF(`saved`.`userId` IS NOT NULL, TRUE, FALSE) AS `save`
        FROM `book`
        INNER JOIN `user` AS `writer` ON `writer`.`id` = `book`.`writerId`
        LEFT JOIN `publisher` ON `book`.`publisherId` = `publisher`.`id`
        LEFT JOIN (
            SELECT `bookrating`.`bookId`,
            AVG(`bookrating`.`rating`) AS `rat`
            FROM `bookrating`
            GROUP BY `bookrating`.`bookId`
        ) AS `bookrat` ON `bookrat`.`bookId` = `book`.`id`
        INNER JOIN `language` ON `language`.`id` = `book`.`languageId`
        LEFT JOIN `saved` ON `saved`.`bookId` = `book`.`id` AND `saved`.`userId` = userIdIN
        WHERE `book`.`categoryId` = categoryIdIN
        ORDER BY `book`.`publishedTime` ASC;
    ELSEIF filter = 4 THEN
    	SELECT
            `book`.`id`,
            `book`.`coverImage`,
            `book`.`title`,
            `writer`.`firstName`,
            `writer`.`lastName`,
            `publisher`.`companyName`,
            `book`.`description`,
            `book`.`pagesNumber`,
            `bookrat`.`rat`,
            `language`.`code`,
            IF(`saved`.`userId` IS NOT NULL, TRUE, FALSE) AS `save`
        FROM `book`
        INNER JOIN `user` AS `writer` ON `writer`.`id` = `book`.`writerId`
        LEFT JOIN `publisher` ON `book`.`publisherId` = `publisher`.`id`
        LEFT JOIN (
            SELECT `bookrating`.`bookId`,
            AVG(`bookrating`.`rating`) AS `rat`
            FROM `bookrating`
            GROUP BY `bookrating`.`bookId`
        ) AS `bookrat` ON `bookrat`.`bookId` = `book`.`id`
        INNER JOIN `language` ON `language`.`id` = `book`.`languageId`
        LEFT JOIN `saved` ON `saved`.`bookId` = `book`.`id` AND `saved`.`userId` = userIdIN
        WHERE `book`.`categoryId` = categoryIdIN
        ORDER BY `book`.`publishedTime` DESC;
    ELSE
    	IF rank = "general" THEN
        	IF filter = 5 THEN
            	SELECT
                    `book`.`id`,
                    `book`.`coverImage`,
                    `book`.`title`,
                    `writer`.`firstName`,
                    `writer`.`lastName`,
                    `publisher`.`companyName`,
                    `book`.`description`,
                    `book`.`pagesNumber`,
                    `bookrat`.`rat`,
                    `language`.`code`,
                    IF(`saved`.`userId` IS NOT NULL, TRUE, FALSE) AS `save`
                FROM `book`
                INNER JOIN `user` AS `writer` ON `writer`.`id` = `book`.`writerId`
                LEFT JOIN `publisher` ON `book`.`publisherId` = `publisher`.`id`
                LEFT JOIN (
                    SELECT `bookrating`.`bookId`,
                    AVG(`bookrating`.`rating`) AS `rat`
                    FROM `bookrating`
                    GROUP BY `bookrating`.`bookId`
                ) AS `bookrat` ON `bookrat`.`bookId` = `book`.`id`
                INNER JOIN `language` ON `language`.`id` = `book`.`languageId`
                LEFT JOIN `saved` ON `saved`.`bookId` = `book`.`id` AND `saved`.`userId` = userIdIN
                WHERE `book`.`categoryId` = categoryIdIN
                ORDER BY `book`.`price` ASC;
            ELSEIF filter = 6 THEN
            	SELECT
                    `book`.`id`,
                    `book`.`coverImage`,
                    `book`.`title`,
                    `writer`.`firstName`,
                    `writer`.`lastName`,
                    `publisher`.`companyName`,
                    `book`.`description`,
                    `book`.`pagesNumber`,
                    `bookrat`.`rat`,
                    `language`.`code`,
                    IF(`saved`.`userId` IS NOT NULL, TRUE, FALSE) AS `save`
                FROM `book`
                INNER JOIN `user` AS `writer` ON `writer`.`id` = `book`.`writerId`
                LEFT JOIN `publisher` ON `book`.`publisherId` = `publisher`.`id`
                LEFT JOIN (
                    SELECT `bookrating`.`bookId`,
                    AVG(`bookrating`.`rating`) AS `rat`
                    FROM `bookrating`
                    GROUP BY `bookrating`.`bookId`
                ) AS `bookrat` ON `bookrat`.`bookId` = `book`.`id`
                INNER JOIN `language` ON `language`.`id` = `book`.`languageId`
                LEFT JOIN `saved` ON `saved`.`bookId` = `book`.`id` AND `saved`.`userId` = userIdIN
                WHERE `book`.`categoryId` = categoryIdIN
                ORDER BY `book`.`price` DESC;
            ELSEIF filter = 7 THEN
            	SELECT
                    `book`.`id`,
                    `book`.`coverImage`,
                    `book`.`title`,
                    `writer`.`firstName`,
                    `writer`.`lastName`,
                    `publisher`.`companyName`,
                    `book`.`description`,
                    `book`.`pagesNumber`,
                    `bookrat`.`rat`,
                    `language`.`code`,
                    IF(`saved`.`userId` IS NOT NULL, TRUE, FALSE) AS `save`
                FROM `book`
                INNER JOIN `user` AS `writer` ON `writer`.`id` = `book`.`writerId`
                LEFT JOIN `publisher` ON `book`.`publisherId` = `publisher`.`id`
                LEFT JOIN (
                    SELECT `bookrating`.`bookId`,
                    AVG(`bookrating`.`rating`) AS `rat`
                    FROM `bookrating`
                    GROUP BY `bookrating`.`bookId`
                ) AS `bookrat` ON `bookrat`.`bookId` = `book`.`id`
                INNER JOIN `language` ON `language`.`id` = `book`.`languageId`
                LEFT JOIN `saved` ON `saved`.`bookId` = `book`.`id` AND `saved`.`userId` = userIdIN
                WHERE `book`.`categoryId` = categoryIdIN
                ORDER BY (
                    SELECT COUNT(*)
                    FROM `saved`
                    WHERE `saved`.`bookId` = `book`.`id`
                ) DESC;
            ELSEIF filter = 8 THEN
            	SELECT
                    `book`.`id`,
                    `book`.`coverImage`,
                    `book`.`title`,
                    `writer`.`firstName`,
                    `writer`.`lastName`,
                    `publisher`.`companyName`,
                    `book`.`description`,
                    `book`.`pagesNumber`,
                    `bookrat`.`rat`,
                    `language`.`code`,
                    IF(`saved`.`userId` IS NOT NULL, TRUE, FALSE) AS `save`
                FROM `book`
                INNER JOIN `user` AS `writer` ON `writer`.`id` = `book`.`writerId`
                LEFT JOIN `publisher` ON `book`.`publisherId` = `publisher`.`id`
                LEFT JOIN (
                    SELECT `bookrating`.`bookId`,
                    AVG(`bookrating`.`rating`) AS `rat`
                    FROM `bookrating`
                    GROUP BY `bookrating`.`bookId`
                ) AS `bookrat` ON `bookrat`.`bookId` = `book`.`id`
                INNER JOIN `language` ON `language`.`id` = `book`.`languageId`
                LEFT JOIN `saved` ON `saved`.`bookId` = `book`.`id` AND `saved`.`userId` = userIdIN
                WHERE `book`.`categoryId` = categoryIdIN
                ORDER BY (
                	SELECT COUNT(`bookshopping`.`id`)
                    FROM `bookshopping`
                    ORDER BY COUNT(`bookshopping`.`id`)
                ) ASC;
            END IF;
        END IF;
    END IF;

END$$

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
    `bookrat`.`rat`,
    `language`.`code`,
    IF(`saved`.`userId` IS NOT NULL, TRUE, FALSE) AS `save`
FROM `book`
INNER JOIN `user` AS `writer` ON `writer`.`id` = `book`.`writerId`
INNER JOIN `general` ON `general`.`id` = `writer`.`userId`
LEFT JOIN `user` AS `publish` ON `publish`.`id` = `book`.`publisherId`
LEFT JOIN `publisher` ON `publisher`.`id` = `publish`.`userId`
LEFT JOIN (
    SELECT 
    	`bookrating`.`bookId`,
		AVG(`bookrating`.`rating`) AS `rat`
	FROM `bookrating`
	GROUP BY `bookrating`.`bookId`
) AS `bookrat` ON `bookrat`.`bookId` = `book`.`id`
INNER JOIN `language` ON `language`.`id` = `book`.`languageId`
LEFT JOIN `saved` ON `saved`.`bookId` = `book`.`id` AND `saved`.`userId` = userIdIN
INNER JOIN (
    SELECT 
        `saved`.`bookId`, 
    	`saved`.`savedTime`,
        COUNT(`saved`.`id`) AS `count` 
    FROM `saved`
    GROUP BY `saved`.`bookId`
) AS `save` ON `book`.`id` = `save`.`bookId`
WHERE 
	YEAR(`save`.`savedTime`) = YEAR(CURRENT_DATE()) AND 
    MONTH(`save`.`savedTime`) = MONTH(CURRENT_DATE())
ORDER BY `save`.`count` DESC
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
    `bookrat`.`rat`,
    `language`.`code`, 
    IF(`saved`.`userId` IS NOT NULL, TRUE, FALSE) AS `save`
FROM `book`
INNER JOIN `user` AS `writer` ON `writer`.`id` = `book`.`writerId`
INNER JOIN `general` ON `general`.`id` = `writer`.`userId`
LEFT JOIN `user` AS `publish` ON `publish`.`id` = `book`.`publisherId`
LEFT JOIN `publisher` ON `publisher`.`id` = `publish`.`userId`
LEFT JOIN (
    SELECT `bookrating`.`bookId`,
	AVG(`bookrating`.`rating`) AS `rat`
	FROM `bookrating`
	GROUP BY `bookrating`.`bookId`
) AS `bookrat` ON `bookrat`.`bookId` = `book`.`id`
INNER JOIN `language` ON `language`.`id` = `book`.`languageId`
LEFT JOIN `saved` ON `saved`.`bookId` = `book`.`id` AND `saved`.`userId` = userIdIN
ORDER BY RAND()
LIMIT 1$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getOneRandomLookingForPublisherBook` (IN `userIdIN` INT)   SELECT DISTINCT
    `book`.`id`, 
    `book`.`coverImage`, 
    `book`.`title`, 
    `general`.`authorName`,
    `writer`.`firstName`,
    `writer`.`lastName`,
    `book`.`description`,
    `book`.`pagesNumber`,
    `bookrat`.`rat`,
    `language`.`code`, 
    IF(`saved`.`userId` IS NOT NULL, TRUE, FALSE) AS `save`
FROM `book`
INNER JOIN `user` AS `writer` ON `writer`.`id` = `book`.`writerId`
INNER JOIN `general` ON `general`.`id` = `writer`.`userId`
LEFT JOIN (
    SELECT `bookrating`.`bookId`,
	AVG(`bookrating`.`rating`) AS `rat`
	FROM `bookrating`
	GROUP BY `bookrating`.`bookId`
) AS `bookrat` ON `bookrat`.`bookId` = `book`.`id`
INNER JOIN `language` ON `language`.`id` = `book`.`languageId`
LEFT JOIN `saved` ON `saved`.`bookId` = `book`.`id` AND `saved`.`userId` = userIdIN
WHERE `book`.`status` = "looking for a publisher"
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
    `bookrat`.`rat`, 
    `language`.`code`, 
    IF(`saved`.`userId` IS NOT NULL, TRUE, FALSE) AS `save`
FROM `book`
INNER JOIN `user` AS `writer` ON `writer`.`id` = `book`.`writerId`
INNER JOIN `general` ON `general`.`id` = `writer`.`userId`
LEFT JOIN `user` AS `publish` ON `publish`.`id` = `book`.`publisherId`
LEFT JOIN `publisher` ON `publisher`.`id` = `publish`.`userId`
LEFT JOIN (
    SELECT `bookrating`.`bookId`,
	AVG(`bookrating`.`rating`) AS `rat`
	FROM `bookrating`
	GROUP BY `bookrating`.`bookId`
) AS `bookrat` ON `bookrat`.`bookId` = `book`.`id`
INNER JOIN `language` ON `language`.`id` = `book`.`languageId`
LEFT JOIN `saved` ON `saved`.`bookId` = `book`.`id` AND `saved`.`userId` = userIdIN
WHERE `book`.`status` = "published by"
ORDER BY RAND()
LIMIT 9$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getRandomBookByCategory` (IN `userIdIN` INT)   BEGIN

	DECLARE i INT DEFAULT 0;
    DECLARE cId INT;
    CREATE TEMPORARY TABLE IF NOT EXISTS RandomCategories (id INT);
    CREATE TEMPORARY TABLE IF NOT EXISTS result (
        id INT, 
        categoryName VARCHAR(50), 
        coverImage VARCHAR(100),
        title VARCHAR(50),
        authorName VARCHAR(50),
        firstName VARCHAR(50),
        lastName VARCHAR(50),
        description VARCHAR(1000),
        pagesNumber INT,
        rating DECIMAL(10, 2),
        languageCode CHAR(2),
        saved BOOLEAN
    );

	REPEAT
    	
    	SELECT `category`.`id` INTO cId
        FROM `category`
        WHERE EXISTS (
            SELECT `book`.`id`
            FROM `book`
            WHERE `book`.`categoryId` = `category`.`id` AND
			`book`.`status` = "looking for a publisher"
            LIMIT 1
        ) AND 
		`category`.`id` NOT IN (
        	SELECT id
            FROM RandomCategories
        )
        ORDER BY RAND()
        LIMIT 1;
              
        INSERT INTO result
        SELECT DISTINCT
            `book`.`id`, 
            `category`.`name`,
            `book`.`coverImage`, 
            `book`.`title`, 
            `general`.`authorName`,
            `writer`.`firstName`,
            `writer`.`lastName`,
            `book`.`description`,
            `book`.`pagesNumber`,
            `bookrat`.`rat`, 
            `language`.`code`, 
            IF(`saved`.`userId` IS NOT NULL, TRUE, FALSE) AS `save`
        FROM `book`
        LEFT JOIN `user` AS `writer` ON `writer`.`id` = `book`.`writerId`
        LEFT JOIN `general` ON `general`.`id` = `writer`.`userId`
        LEFT JOIN (
            SELECT `bookrating`.`bookId`,
            AVG(`bookrating`.`rating`) AS `rat`
            FROM `bookrating`
            GROUP BY `bookrating`.`bookId`
        ) AS `bookrat` ON `bookrat`.`bookId` = `book`.`id`
        INNER JOIN `language` ON `language`.`id` = `book`.`languageId`
        INNER JOIN `category` ON `category`.`id` = `book`.`categoryId`
        LEFT JOIN `saved` ON `saved`.`bookId` = `book`.`id` AND `saved`.`userId` = userIdIN
        WHERE `book`.`status` = "looking for a publisher" AND
        `book`.`categoryId` = cId
        ORDER BY RAND()
        LIMIT 9;
        
        INSERT INTO RandomCategories (id)
        VALUES (cId);
                
        SET i = i + 1;
    UNTIL i = 4 END REPEAT;
    
    SELECT * FROM result;
    
END$$

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
    `bookrat`.`rat`,
    `language`.`code`,
    IF(`saved`.`userId` IS NOT NULL, TRUE, FALSE) AS `save`
FROM `book`
INNER JOIN `user` AS `writer` ON `writer`.`id` = `book`.`writerId`
INNER JOIN `general` ON `general`.`id` = `writer`.`userId`
LEFT JOIN `user` AS `publish` ON `publish`.`id` = `book`.`publisherId`
LEFT JOIN `publisher` ON `publisher`.`id` = `publish`.`userId`
LEFT JOIN (
    SELECT `bookrating`.`bookId`,
	AVG(`bookrating`.`rating`) AS `rat`
	FROM `bookrating`
	GROUP BY `bookrating`.`bookId`
) AS `bookrat` ON `bookrat`.`bookId` = `book`.`id`
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `getRecommandedBooksForPublisher` (IN `userIdIN` INT)   SELECT DISTINCT
    `book`.`id`, 
    `book`.`coverImage`, 
    `book`.`title`,
    `general`.`authorName`,
    `writer`.`firstName`,
    `writer`.`lastName`,
    `book`.`description`, 
    `book`.`pagesNumber`,
    `bookrat`.`rat`,
    `language`.`code`,
    IF(`saved`.`userId` IS NOT NULL, TRUE, FALSE) AS `save`
FROM `book`
INNER JOIN `user` AS `writer` ON `writer`.`id` = `book`.`writerId`
INNER JOIN `general` ON `general`.`id` = `writer`.`userId`
LEFT JOIN (
    SELECT `bookrating`.`bookId`,
	AVG(`bookrating`.`rating`) AS `rat`
	FROM `bookrating`
	GROUP BY `bookrating`.`bookId`
) AS `bookrat` ON `bookrat`.`bookId` = `book`.`id`
INNER JOIN `language` ON `language`.`id` = `book`.`languageId`
LEFT JOIN `saved` ON `saved`.`bookId` = `book`.`id` AND `saved`.`userId` = userIdIN
WHERE (`book`.`categoryId` IN (
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
)) AND
`book`.`status` = "looking for a publisher"
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `getSavedBooksByUserId` (IN `userIdIN` INT)   SELECT
    `book`.`id`,
    `book`.`coverImage`,
    `book`.`title`,
    `writer`.`firstName`,
    `writer`.`lastName`,
    `publisher`.`companyName`,
    `book`.`description`,
    `book`.`pagesNumber`,
    `bookrat`.`rat`,
    `language`.`code`
FROM `book`
INNER JOIN `user` AS `writer` ON `writer`.`id` = `book`.`writerId`
LEFT JOIN `publisher` ON `book`.`publisherId` = `publisher`.`id`
LEFT JOIN (
    SELECT `bookrating`.`bookId`,
    AVG(`bookrating`.`rating`) AS `rat`
	FROM `bookrating`
    GROUP BY `bookrating`.`bookId`
) AS `bookrat` ON `bookrat`.`bookId` = `book`.`id`
INNER JOIN `language` ON `language`.`id` = `book`.`languageId`
LEFT JOIN `saved` ON `saved`.`bookId` = `book`.`id`
WHERE `saved`.`userId` = userIdIN$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getSearchBooks` (IN `userIdIN` INT, IN `searchTextIN` VARCHAR(50))   BEGIN

	DECLARE userRank VARCHAR(50);
    
    SELECT `user`.`rank` INTO userRank
    FROM `user`
    WHERE `user`.`id` = userIdIN;
    
    IF userRank = "publisher" THEN
    	SELECT
            `book`.`id`,
            `book`.`coverImage`,
            `book`.`title`,
            `writer`.`firstName`,
            `writer`.`lastName`,
            `publisher`.`companyName`,
            `book`.`description`,
            `book`.`pagesNumber`,
            `bookrat`.`rat`,
            `language`.`code`,
            IF(`saved`.`userId` IS NOT NULL, TRUE, FALSE) AS `save`
        FROM `book`
        INNER JOIN `user` AS `writer` ON `writer`.`id` = `book`.`writerId`
        LEFT JOIN `publisher` ON `book`.`publisherId` = `publisher`.`id`
        LEFT JOIN (
            SELECT `bookrating`.`bookId`,
            AVG(`bookrating`.`rating`) AS `rat`
            FROM `bookrating`
            GROUP BY `bookrating`.`bookId`
        ) AS `bookrat` ON `bookrat`.`bookId` = `book`.`id`
        INNER JOIN `language` ON `language`.`id` = `book`.`languageId`
        LEFT JOIN `saved` ON `saved`.`bookId` = `book`.`id` AND `saved`.`userId` = userIdIN
        WHERE (`book`.`title` LIKE CONCAT(searchTextIN, "%") OR `writer`.`firstName` LIKE CONCAT(searchTextIN, "%") OR `writer`.`lastName` LIKE CONCAT(searchTextIN, "%") OR `publisher`.`companyName` LIKE CONCAT(searchTextIN, "%")) AND `book`.`status` = "looking for a publisher";
    ELSEIF userRank = "general" THEN
    	SELECT
            `book`.`id`,
            `book`.`coverImage`,
            `book`.`title`,
            `writer`.`firstName`,
            `writer`.`lastName`,
            `publisher`.`companyName`,
            `book`.`description`,
            `book`.`pagesNumber`,
            `bookrat`.`rat`,
            `language`.`code`,
            IF(`saved`.`userId` IS NOT NULL, TRUE, FALSE) AS `save`
        FROM `book`
        INNER JOIN `user` AS `writer` ON `writer`.`id` = `book`.`writerId`
        LEFT JOIN `publisher` ON `book`.`publisherId` = `publisher`.`id`
        LEFT JOIN (
            SELECT `bookrating`.`bookId`,
            AVG(`bookrating`.`rating`) AS `rat`
            FROM `bookrating`
            GROUP BY `bookrating`.`bookId`
        ) AS `bookrat` ON `bookrat`.`bookId` = `book`.`id`
        INNER JOIN `language` ON `language`.`id` = `book`.`languageId`
        LEFT JOIN `saved` ON `saved`.`bookId` = `book`.`id` AND `saved`.`userId` = userIdIN
        WHERE (`book`.`title` LIKE CONCAT(searchTextIN, "%") OR `writer`.`firstName` LIKE CONCAT(searchTextIN, "%") OR `writer`.`lastName` LIKE CONCAT(searchTextIN, "%") OR `publisher`.`companyName` LIKE CONCAT(searchTextIN, "%")) AND (`book`.`status` = "self-published" OR `book`.`status`= "published by");
    END IF;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getSelfPublishedBooks` (IN `userIdIN` INT)   SELECT DISTINCT
    `book`.`id`, 
    `book`.`coverImage`, 
    `book`.`title`, 
    `general`.`authorName`,
    `writer`.`firstName`,
    `writer`.`lastName`,
    `book`.`description`,
    `book`.`pagesNumber`,
   	`bookrat`.`rat`, 
    `language`.`code`,
    IF (`saved`.`userId` IS NOT NULL, TRUE, FALSE) AS `save`
FROM `book`
INNER JOIN `user` AS `writer` ON `writer`.`id` = `book`.`writerId`
INNER JOIN `general` ON `general`.`id` = `writer`.`userId`
LEFT JOIN (
    SELECT `bookrating`.`bookId`,
	AVG(`bookrating`.`rating`) AS `rat`
	FROM `bookrating`
	GROUP BY `bookrating`.`bookId`
) AS `bookrat` ON `bookrat`.`bookId` = `book`.`id`
INNER JOIN `language` ON `language`.`id` = `book`.`languageId`
LEFT JOIN `saved` ON `saved`.`bookId` = `book`.`id` AND `saved`.`userId` = userIdIN
WHERE `book`.`status` = "self-published"
ORDER BY RAND()
LIMIT 9$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getUserBooks` (IN `userIdIN` INT, IN `profileUsernameIN` VARCHAR(50), OUT `result` INT, OUT `ownBooks` BOOLEAN)   BEGIN

	DECLARE profileUserId INT;
    DECLARE profileUserRank VARCHAR(20);
    
    IF EXISTS (SELECT * FROM `user` WHERE `user`.`username` = profileUsernameIN) THEN
        SELECT `user`.`id` INTO profileUserId
        FROM `user`
        WHERE `user`.`username` = profileUsernameIN;
        
        SELECT `user`.`rank` INTO profileUserRank
        FROM `user`
        WHERE `user`.`id` = profileUserId;
        
        SET ownBooks = (profileUserId = userIdIN);
        
        IF profileUserRank = "general" THEN
            SELECT
                `book`.`id`,
                `book`.`coverImage`,
                `book`.`title`,
                `general`.`authorName`,
                `user`.`firstName`,
                `user`.`lastName`,
                `publisher`.`companyName`,
                `book`.`description`,
                `book`.`pagesNumber`,
                `bookrat`.`rat`,
                `language`.`code`,
                IF(`saved`.`userId` IS NOT NULL, TRUE, FALSE) AS `save`
            FROM `book`
            INNER JOIN `user` ON `user`.`id` = `book`.`writerId`
            INNER JOIN `general` ON `general`.`id` = `user`.`userId`
            LEFT JOIN `publisher` ON `publisher`.`id` = `book`.`publisherId`
            INNER JOIN `language` ON `language`.`id` = `book`.`languageId`
            LEFT JOIN (
                SELECT `bookrating`.`bookId`,
                AVG(`bookrating`.`rating`) AS `rat`
                FROM `bookrating`
                GROUP BY `bookrating`.`bookId`
            ) AS `bookrat` ON `bookrat`.`bookId` = `book`.`id`
            LEFT JOIN `saved` ON `saved`.`bookId` = `book`.`id` AND `saved`.`userId` = userIdIN
            WHERE `book`.`writerId` = profileUserId
        ORDER BY `book`.`publishedTime` DESC;
        ELSEIF profileUserRank = "publisher" THEN
        	SELECT
                `book`.`id`,
                `book`.`coverImage`,
                `book`.`title`,
                `general`.`authorName`,
                `user`.`firstName`,
                `user`.`lastName`,
                `publisher`.`companyName`,
                `book`.`description`,
                `book`.`pagesNumber`,
                `bookrat`.`rat`,
                `language`.`code`,
                IF(`saved`.`userId` IS NOT NULL, TRUE, FALSE) AS `save`
            FROM `book`
            INNER JOIN `user` ON `user`.`id` = `book`.`writerId`
            INNER JOIN `general` ON `general`.`id` = `user`.`userId`
            LEFT JOIN `publisher` ON `publisher`.`id` = `book`.`publisherId`
            INNER JOIN `language` ON `language`.`id` = `book`.`languageId`
            LEFT JOIN (
                SELECT `bookrating`.`bookId`,
                AVG(`bookrating`.`rating`) AS `rat`
                FROM `bookrating`
                GROUP BY `bookrating`.`bookId`
            ) AS `bookrat` ON `bookrat`.`bookId` = `book`.`id`
            LEFT JOIN `saved` ON `saved`.`bookId` = `book`.`id` AND `saved`.`userId` = userIdIN
            WHERE `book`.`publisherId` = profileUserId
        ORDER BY `book`.`publishedTime` DESC;
        END IF;
        
        SET result = 1;
    ELSE
    	SET result = 2;
    END IF;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getUserDetails` (IN `userIdIN` INT, IN `usernameIN` VARCHAR(50), IN `profileUsernameIN` VARCHAR(50), OUT `result` INT)   BEGIN
    DECLARE profileUserId INT;
    DECLARE profileUserRank VARCHAR(20);
    DECLARE userIdMatch BOOLEAN;

    IF EXISTS (SELECT * FROM `user` WHERE `user`.`username` = profileUsernameIN) THEN
        SELECT `user`.`id` INTO profileUserId
        FROM `user`
        WHERE `user`.`username` = profileUsernameIN;
        
        SELECT `user`.`rank` INTO profileUserRank
        FROM `user`
        WHERE `user`.`id` = profileUserId;
        
        SET userIdMatch = (profileUserId = userIdIN);
        
        IF profileUserRank = "general" THEN
            SELECT
                `user`.`rank`,
                `user`.`username`,
                `user`.`image`,
                IF(`follow`.`followerId` IS NOT NULL, TRUE, FALSE) AS `followed`,
                `user`.`firstName`,
                `user`.`lastName`,
                (SELECT COUNT(`book`.`id`) FROM `book` WHERE `book`.`writerId` = profileUserId) AS bookCount,
                (SELECT COUNT(`saved`.`id`) FROM `saved` WHERE `saved`.`userId` = profileUserId) AS savedCount,
                (SELECT COUNT(`follow`.`id`) FROM `follow` WHERE `follow`.`followedId` = profileUserId) AS followCount,
                `user`.`introDescription`,
                `user`.`website`,
                `color`.`code`,
                userIdMatch AS userIdMatchFlag
            FROM `user`
            LEFT JOIN `follow` ON `follow`.`followedId` = profileUserId AND `follow`.`followerId` = userIdIN
            INNER JOIN `color` ON `color`.`id` = `user`.`coverColorId`
            WHERE `user`.`id` = profileUserId;
        ELSEIF profileUserRank = "publisher" THEN
            SELECT
                `user`.`rank`,
                `user`.`username`,
                `user`.`image`,
                IF(`follow`.`followerId` IS NOT NULL, TRUE, FALSE) AS `followed`,
                `publisher`.`companyName`,
                (SELECT COUNT(`book`.`id`) FROM `book` WHERE `book`.`writerId` = profileUserId) AS bookCount,
                (SELECT COUNT(`writers`.`writerId`) FROM (SELECT DISTINCT `book`.`writerId` FROM `book` WHERE `book`.`publisherId` = profileUserId) AS `writers`) AS writerCount,
                (SELECT COUNT(`follow`.`id`) FROM `follow` WHERE `follow`.`followedId` = profileUserId) AS followCount,
                `user`.`introDescription`,
                `user`.`website`,
                `color`.`code`,
                userIdMatch AS userIdMatchFlag
            FROM `user`
            LEFT JOIN `follow` ON `follow`.`followedId` = profileUserId AND `follow`.`followerId` = userIdIN
            INNER JOIN `color` ON `color`.`id` = `user`.`coverColorId`
            INNER JOIN `publisher` ON `publisher`.`id` = `user`.`userId`
            WHERE `user`.`id` = profileUserId;
        END IF;
        
        SET result = 1;
    ELSE
        SET result = 2;
    END IF;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getUserPosts` (IN `userIdIN` INT, IN `profileUsernameIN` VARCHAR(50), OUT `result` INT, OUT `ownPosts` BOOLEAN)   BEGIN

	DECLARE profileUserId INT;
    
    IF EXISTS (SELECT * FROM `user` WHERE `user`.`username` = profileUsernameIN) THEN
        SELECT `user`.`id` INTO profileUserId
        FROM `user`
        WHERE `user`.`username` = profileUsernameIN;
        
        SET ownPosts = (profileUserId = userIdIN);
        
        SELECT
          	`post`.`id`,
            `user`.`username`,
            `user`.`image`,
            `post`.`postTime`,
            `post`.`description`,
            IF(`postlike`.`userId` IS NOT NULL, TRUE, FALSE) AS `liked`
        FROM `post`
        INNER JOIN `user` ON `user`.`id` = `post`.`userId`
        LEFT JOIN `postlike` ON `postlike`.`postId` = `post`.`id` AND `postlike`.`userId` = userIdIN
        WHERE `user`.`id` = profileUserId
        ORDER BY `post`.`postTime` DESC;
        
        SET result = 1;
    ELSE
    	SET result = 2;
    END IF;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `login` (IN `emailIN` VARCHAR(50), IN `passwordIN` VARCHAR(100), OUT `userIdOUT` INT, OUT `usernameOUT` VARCHAR(50), OUT `imageOUT` VARCHAR(100), OUT `rankOUT` ENUM("admin","general","publisher"), OUT `activeOUT` BOOLEAN)   BEGIN

	SELECT `user`.`id`, `user`.`username`, `user`.`image`, `user`.`rank`, `user`.`active`
	INTO userIdOUT, usernameOUT, imageOUT, rankOUT, activeOUT
	FROM `user`
	WHERE `user`.`email` = emailIN AND `user`.`password` = SHA1(passwordIN);
    
    UPDATE `user`
    SET `user`.`active` = false
    WHERE `user`.`email` = emailIN;
END$$

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

CREATE DEFINER=`root`@`localhost` PROCEDURE `saveBook` (IN `userIdIN` INT, IN `bookIdIN` INT, OUT `result` INT)   BEGIN

	IF NOT EXISTS (SELECT * FROM `saved` WHERE `saved`.`userId` = userIdIN AND `saved`.`bookId` = bookIdIN) THEN

        INSERT INTO `saved` (`saved`.`userId`, `saved`.`bookId`)
        VALUE (userIdIN, bookIdIN);
        
        SET result = 1;
        
    ELSE
    	
        SET result = 2;
        
    END IF;
    
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `setBook` (IN `bookIdIN` INT, IN `titleIN` VARCHAR(50), IN `descriptionIN` VARCHAR(1000), IN `targetAudienceIdIN` INT, IN `languageIdIN` INT, IN `adultFictionIN` BOOLEAN, IN `categoryIdIN` INT, IN `statusIdIN` INT, IN `priceIN` INT, IN `coverImageIN` VARCHAR(100), IN `fileIN` VARCHAR(100), IN `bankAccountNumberIN` VARCHAR(30), IN `chapterNumberIN` INT, IN `freeChapterNumberIN` INT, OUT `result` INT)   BEGIN
    
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
        
        IF chapterNumberIN IS NOT NULL THEN
            UPDATE `book`
            SET `book`.`chapterNumber` = chapterNumberIN
            WHERE `book`.`id` = bookIdIN;
        END IF;
        
        IF freeChapterNumberIN IS NOT NULL THEN
            UPDATE `book`
            SET `book`.`freeChapterNumber` = freeChapterNumberIN
            WHERE `book`.`id` = bookIdIN;
        END IF;

        SET result = 1;
    END IF;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `setCompanyName` (IN `userIdIN` INT, IN `companyNameIN` VARCHAR(50), OUT `result` INT)   BEGIN

	DECLARE rank VARCHAR(20);
    
    SELECT `user`.`rank` INTO rank WHERE `user`.`id` = userIdIN;
    
    IF rank = "publisher" THEN
    	UPDATE `publisher`
        SET `publisher`.`companyName` = companyNameIN
        WHERE `publisher`.`id` = (SELECT `user`.`userId` FROM `user` WHERE `user`.`id` = userIdIN);
    
    	SET result = 1;
    ELSE
    	SET result = 2;
    END IF;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `setCoverColor` (IN `userIdIN` INT, IN `coverColorIN` VARCHAR(8))   BEGIN

	DECLARE colorId INT;

	IF CHAR_LENGTH(coverColorIN) = 0 THEN
    	SET colorId = 1;
	ELSEIF EXISTS(SELECT * FROM `color` WHERE `color`.`code` = coverColorIN) THEN
    	SELECT `color`.`id` INTO colorId FROM `color` WHERE `color`.`code` = coverColorIN;
    ELSE
    	INSERT INTO `color` (`color`.`code`)
        VALUES (coverColorIN);
        
        SELECT LAST_INSERT_ID() INTO colorId;
    END IF;
    
    UPDATE `user`
    SET `user`.`coverColorId` = colorId
    WHERE `user`.`id` = userIdIN;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `setEmail` (IN `userIdIN` INT, IN `emailIN` VARCHAR(50))   UPDATE `user`
SET `user`.`email` = emailIN
WHERE `user`.`id` = userIdIN$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `setFirstName` (IN `userIdIN` INT, IN `firstNameIN` VARCHAR(50))   UPDATE `user`
SET `user`.`firstName` = firstNameIN
WHERE `user`.`id` = userIdIN$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `setIntroDescription` (IN `userIdIN` INT, IN `introDescriptionIN` VARCHAR(1000))   UPDATE `user`
SET `user`.`introDescription` = introDescriptionIN
WHERE `user`.`id` = userIdIN$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `setLastName` (IN `userIdIN` INT, IN `lastNameIN` VARCHAR(50))   UPDATE `user`
SET `user`.`lastName` = lastNameIN
WHERE `user`.`id` = userIdIN$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `setPassword` (IN `userIdIN` INT, IN `passwordIN` VARCHAR(100), OUT `result` INT)   BEGIN

	IF SHA1(passwordIN) = (SELECT `user`.`password` FROM `user` WHERE `user`.`id` = userIdIN) THEN
    	SET result = 2;
    ELSE
        UPDATE `user`
        SET `user`.`password` = SHA1(passwordIN)
        WHERE `user`.`id` = userIdIN;
        
        SET result = 1;
    END IF;
    
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `setPhoneNumber` (IN `userIdIN` INT, IN `phoneNumberIN` VARCHAR(15))   UPDATE `user`
SET `user`.`phoneNumber` = phoneNumberIN
WHERE `user`.`id` = userIdIN$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `setProfileImage` (IN `userIdIN` INT, IN `imageIN` VARCHAR(100))   BEGIN

	IF CHAR_LENGTH(imageIN) = 0 THEN
        UPDATE `user`
        SET `user`.`image` = "pictures/default-profile-pic-man.png"
        WHERE `user`.`id` = userIdIN;
    ELSE
        UPDATE `user`
        SET `user`.`image` = imageIN
        WHERE `user`.`id` = userIdIN;
    END IF;
    
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `setPublicEmail` (IN `userIdIN` INT)   BEGIN

	IF (SELECT `user`.`publicEmail` FROM `user` WHERE `user`.`id` = userIdIN) = true THEN
    	UPDATE `user`
        SET `user`.`publicEmail` = false
        WHERE `user`.`id` = userIdIN;
    ELSE
    	UPDATE `user`
        SET `user`.`publicEmail` = true
        WHERE `user`.`id` = userIdIN;
    END IF;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `setPublicPhoneNumber` (IN `userIdIN` INT)   BEGIN

	IF (SELECT `user`.`publicPhoneNumber` FROM `user` WHERE `user`.`id` = userIdIN) = false THEN
    	UPDATE `user`
        SET `user`.`publicPhoneNumber` = true
        WHERE `user`.`id` = userIdIN;
    ELSE
    	UPDATE `user`
        SET `user`.`publicPhoneNumber` = false
        WHERE `user`.`id` = userIdIN;
    END IF;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `setUsername` (IN `userIdIN` INT, IN `usernameIN` VARCHAR(50))   UPDATE `user`
SET `user`.`username` = usernameIN
WHERE `user`.`id` = userIdIN$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `setWebsite` (IN `userIdIN` INT, IN `websiteIN` VARCHAR(100))   UPDATE `user`
SET `user`.`website` = websiteIN
WHERE `user`.`id` = userIdIN$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `unfollowedUser` (IN `userIdIN` INT, IN `followUserIdIN` INT, OUT `result` INT)   BEGIN

	IF EXISTS (SELECT * FROM `follow` WHERE `follow`.`followerId` = userIdIN AND `follow`.`followedId` = followUserIdIN) THEN
    	DELETE FROM `follow`
        WHERE `follow`.`followerId` = userIdIN AND `follow`.`followedId` = followUserIdIN;
    	
        SET result = 1;
    ELSE
    	SET result = 2;
    END IF;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updatePost` (IN `userIdIN` INT, IN `postIdIN` INT, IN `postDescriptionIN` VARCHAR(1000), OUT `result` INT)   BEGIN

	IF (SELECT `post`.`userId` FROM `post` WHERE `post`.`id` = postIdIN) != userIdIN THEN
    	SET result = 3;
    ELSEIF EXISTS (SELECT * FROM `post` WHERE `post`.`id` = postIdIN AND `post`.`userId` = userIdIN) THEN
    	UPDATE `post`
        SET `post`.`description` = postDescriptionIN AND `post`.`postTime` = CURRENT_TIMESTAMP()
        WHERE `post`.`id` = postIdIN;
        
        SET result = 1;
    ELSE
    	SET result = 2;
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
  `file` varchar(100) NOT NULL
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

--
-- A tábla adatainak kiíratása `book`
--

INSERT INTO `book` (`id`, `title`, `status`, `writerId`, `publisherId`, `publishedTime`, `rating`, `description`, `price`, `coverImage`, `file`, `chapterNumber`, `freeChapterNumber`, `pagesNumber`, `adultFiction`, `bankAccountNumber`, `languageId`, `targetAudienceId`, `categoryId`) VALUES
(1, 'The Mystery of the Lost Key', 'published by', 3, 9, '2023-12-17 17:58:06', NULL, 'A thrilling mystery novel that keeps you on the edge of your seat.', 1500, 'pictures/book/The-Mystery-of-the-Lost-Key', '', 30, 6, 200, 0, '1234567890', 1, 4, 12),
(2, 'Echoes of Eternity', 'published by', 5, 7, '2023-12-17 17:58:06', NULL, 'An epic fantasy saga spanning across realms and generations.', 2500, 'pictures/book/Echoes-of-Eternity', '', 40, 8, 350, 0, '0987654321', 2, 5, 18),
(3, 'Beyond the Horizon', 'self-published', 8, NULL, '2023-12-17 17:58:06', NULL, 'A journey of self-discovery and adventure in the heart of the unknown.', 1800, 'pictures/book/Beyond-the-Horizon', '', 25, 5, 180, 0, '1357902468', 3, 3, 9),
(4, 'The Enigma Code', 'self-published', 10, NULL, '2023-12-17 17:58:38', NULL, 'A gripping thriller revealing the secrets of an encrypted message.', 2200, 'pictures/book/The-Enigma-Code', '', 35, 7, 280, 1, '2468135790', 4, 2, 7),
(5, 'Whispers in the Dark', 'looking for a publisher', 14, NULL, '2023-12-17 17:58:38', NULL, 'Mysterious occurrences lead to uncovering dark secrets in a small town.', 1700, 'pictures/book/Whispers-in-the-Dark', '', 28, 5, 220, 0, '9876543210', 2, 6, 14),
(6, 'Skyward Odyssey', 'published by', 18, 5, '2023-12-17 17:58:38', NULL, 'Space adventure exploring uncharted galaxies and alien civilizations.', 2800, 'pictures/book/Skyward-Odyssey', '', 45, 9, 400, 0, '0123456789', 3, 4, 21),
(7, 'The Silent Observer', 'self-published', 20, NULL, '2023-12-17 17:58:38', NULL, 'A psychological thriller about an observer amidst a series of eerie events.', 1900, 'pictures/book/The-Silent-Observer', '', 32, 6, 250, 1, '5432109876', 5, 1, 10),
(8, 'Legacy of Shadows', 'looking for a publisher', 23, NULL, '2023-12-17 17:58:38', NULL, 'A tale of inheritance, betrayal, and the secrets that haunt a family.', 2000, 'pictures/book/Legacy-of-Shadows', '', 33, 6, 260, 0, '6547893210', 1, 5, 17),
(9, 'The Elemental Codex', 'published by', 27, 8, '2023-12-17 17:58:38', NULL, 'Discovering the ancient secrets of the elements in a world on the brink of chaos.', 2600, 'pictures/book/The-Elemental-Codex', '', 38, 7, 320, 0, '7894561230', 4, 3, 11),
(10, 'Beyond the Veil', 'self-published', 29, NULL, '2023-12-17 17:58:38', NULL, 'A journey through realms beyond imagination and the cost of unlocking their secrets.', 2100, 'pictures/book/Beyond-the-Veil', '', 29, 6, 240, 0, '0123789456', 2, 2, 8),
(11, 'Threads of Fate', 'looking for a publisher', 31, NULL, '2023-12-17 17:58:38', NULL, 'Interwoven destinies collide in a tale of destiny, love, and sacrifice.', 2400, 'pictures/book/Threads-of-Fate', '', 36, 7, 290, 0, '9876321045', 5, 6, 24),
(12, 'Midnight Whispers', 'published by', 35, 6, '2023-12-17 17:58:38', NULL, 'A chilling collection of eerie stories that whisper the secrets of the night.', 2300, 'pictures/book/Midnight-Whispers', '', 31, 6, 260, 1, '7418529630', 3, 1, 13),
(13, 'Eternal Echoes', 'self-published', 38, NULL, '2023-12-17 17:58:38', NULL, 'An exploration of time, eternity, and the echoes that reverberate through centuries.', 2000, 'pictures/book/Eternal-Echoes', '', 30, 6, 250, 0, '3698521470', 1, 4, 19),
(14, 'Rogue Chronicles', 'looking for a publisher', 4, NULL, '2023-12-17 17:58:48', NULL, 'Action-packed adventures of a charismatic rogue navigating political intrigue.', 1900, 'pictures/book/Rogue-Chronicles', '', 28, 5, 220, 0, '0987654321', 2, 5, 18),
(15, 'Shadows of Destiny', 'published by', 6, 7, '2023-12-17 17:58:48', NULL, 'A gripping tale where destinies intertwine amidst dark shadows of the past.', 2500, 'pictures/book/Shadows-of-Destiny', '', 35, 7, 300, 0, '1234567890', 3, 3, 9),
(16, 'Forgotten Realms', 'self-published', 9, NULL, '2023-12-17 17:58:48', NULL, 'Exploring the forgotten realms where myths and legends come to life.', 2200, 'pictures/book/Forgotten-Realms', '', 32, 6, 260, 0, '2468135790', 4, 2, 7),
(17, 'Whispering Winds', 'looking for a publisher', 11, NULL, '2023-12-17 17:58:48', NULL, 'Whispers on the winds reveal secrets in a world teetering on the edge.', 2000, 'pictures/book/Whispering-Winds', '', 30, 6, 250, 1, '1357902468', 1, 4, 19),
(18, 'Infinite Odyssey', 'published by', 16, 5, '2023-12-17 17:58:48', NULL, 'An epic odyssey across infinite realms filled with wonder and danger.', 2700, 'pictures/book/Infinite-Odyssey', '', 40, 8, 380, 0, '9876543210', 5, 1, 13),
(19, 'Tales of Tomorrow', 'self-published', 19, NULL, '2023-12-17 17:58:48', NULL, 'Tales from the future revealing visions and warnings of what lies ahead.', 2100, 'pictures/book/Tales-of-Tomorrow', '', 29, 6, 240, 0, '3698521470', 2, 2, 8),
(20, 'Dreams of Destiny', 'looking for a publisher', 22, NULL, '2023-12-17 17:58:48', NULL, 'Visions in dreams foretell the threads of destiny intertwining.', 2400, 'pictures/book/Dreams-of-Destiny', '', 34, 6, 280, 0, '7418529630', 3, 6, 14),
(21, 'Chasing Echoes', 'published by', 26, 6, '2023-12-17 17:58:48', NULL, 'Chasing echoes across time in a quest to unlock forgotten mysteries.', 2600, 'pictures/book/Chasing-Echoes', '', 36, 7, 310, 1, '9876321045', 4, 4, 21),
(22, 'Elysium Chronicles', 'self-published', 28, NULL, '2023-12-17 17:58:48', NULL, 'Chronicles of an otherworldly paradise and the trials to reach its gates.', 2300, 'pictures/book/Elysium-Chronicles', '', 32, 6, 270, 0, '0123789456', 1, 5, 17),
(23, 'Chronicles of Chaos', 'looking for a publisher', 32, NULL, '2023-12-17 17:58:48', NULL, 'Chronicles foretelling the chaos that ensues when worlds collide.', 2600, 'pictures/book/Chronicles-of-Chaos', '', 38, 7, 320, 1, '6547893210', 5, 2, 24),
(24, 'The Quantum Paradox', 'looking for a publisher', 36, NULL, '2023-12-17 17:59:30', NULL, 'A mind-bending journey through the paradoxes of quantum reality.', 2100, 'pictures/book/The-Quantum-Paradox', '', 32, 6, 280, 0, '7418529630', 2, 6, 14),
(25, 'Lost in Translation', 'published by', 40, 9, '2023-12-17 17:59:30', NULL, 'A tale of lost languages and the secrets they hold across continents.', 2700, 'pictures/book/Lost-in-Translation', '', 40, 8, 360, 0, '9876321045', 3, 1, 13),
(26, 'Fires of Revolution', 'self-published', 43, NULL, '2023-12-17 17:59:30', NULL, 'Revolution ignites when forgotten history resurfaces to rewrite the future.', 2300, 'pictures/book/Fires-of-Revolution', '', 33, 6, 270, 0, '0123789456', 1, 5, 17),
(27, 'Dreamweaver Chronicles', 'looking for a publisher', 45, NULL, '2023-12-17 17:59:30', NULL, 'Chronicles of a dreamweaver unveiling prophecies in the fabric of dreams.', 2600, 'pictures/book/Dreamweaver-Chronicles', '', 38, 7, 310, 1, '6547893210', 5, 2, 24),
(28, 'Eternal Struggle', 'published by', 48, 10, '2023-12-17 17:59:30', NULL, 'The eternal struggle between light and darkness, where fate hangs in the balance.', 2800, 'pictures/book/Eternal-Struggle', '', 42, 8, 380, 1, '1234567890', 4, 3, 9),
(29, 'Whispers of Fate', 'self-published', 50, NULL, '2023-12-17 17:59:30', NULL, 'Whispers of fate weave a tapestry that shapes the destinies of all.', 2400, 'pictures/book/Whispers-of-Fate', '', 35, 7, 290, 0, '3698521470', 2, 2, 8),
(30, 'The Seventh Key', 'looking for a publisher', 54, NULL, '2023-12-17 17:59:30', NULL, 'Unveiling the mysteries hidden behind the seventh key to the unknown.', 2000, 'pictures/book/The-Seventh-Key', '', 30, 6, 250, 1, '1357902468', 1, 4, 19),
(31, 'Sands of Time', 'published by', 58, 8, '2023-12-17 17:59:30', NULL, 'Time-traveling across epochs to protect the sands that control the flow of time.', 2500, 'pictures/book/Sands-of-Time', '', 37, 7, 320, 0, '9876543210', 5, 1, 13),
(32, 'The Forgotten Scroll', 'self-published', 61, NULL, '2023-12-17 17:59:30', NULL, 'The secrets etched within the forgotten scroll hold the key to the unknown.', 2200, 'pictures/book/The-Forgotten-Scroll', '', 34, 6, 270, 0, '2468135790', 4, 2, 7),
(33, 'Echoes of Destiny', 'looking for a publisher', 65, NULL, '2023-12-17 17:59:30', NULL, 'Echoes reverberate through time, revealing the threads of destiny.', 2300, 'pictures/book/Echoes-of-Destiny', '', 36, 7, 300, 1, '0987654321', 3, 3, 9),
(34, 'Harry Potter és a titkok kamrája', 'published by', 9, 32, '2023-12-18 21:03:13', NULL, 'A \"Harry Potter és a Titkok Kamrája\" az ifjúsági fantasy író, J.K. Rowling által írt második kötet a híres Harry Potter sorozatban. A történet továbbviszi Harry, Ron és Hermione kalandjait a Roxfort Boszorkány- és Varázslóképző Szakiskolában.\r\n\r\nEbben a könyvben Harry visszatér Roxfortba, ahol rejtélyes események kezdődnek. Egy titokzatos erő elkezdi fenyegetni a diákokat, ráadásul furcsa dolgok történnek a varázslóiskolában. Harrynek és barátainak fel kell fedezniük a titokzatos Kamrát, hogy megmentsék a diákokat és Roxfortot a veszélytől.\r\n\r\nA regény tele van izgalommal, fordulatokkal és varázslattal, miközben Harry és társai küzdenek az iskolát fenyegető rejtélyes erővel, miközben az ifjú varázsló egyre többet tud meg saját múltjáról és a Roxfortot fenyegető sötét erőkről. Ez a történet tele van kalanddal és izgalommal, amelyeket minden varázslat iránt érdeklődő olvasó élvezni fog.', 5200, 'pictures/book/harry-potter-es-a-titkok-kamraja', '', 18, 4, 294, 0, 'HU1234562935687', 1, 3, 5),
(35, 'Negyedik könyv', 'looking for a publisher', 1, NULL, '2023-12-20 00:11:25', NULL, 'Ez a negyedik könyv leírása.', 0, 'Ez a kép elérési útja', 'Ez a könyv elérési útja', 10, 2, 0, 1, NULL, 1, 1, 1),
(36, 'Negyedik könyv', 'looking for a publisher', 1, NULL, '2023-12-20 00:11:40', NULL, 'Ez a negyedik könyv leírása.', 0, 'Ez a kép elérési útja', 'Ez a könyv elérési útja', 0, 0, 0, 1, NULL, 1, 1, 1),
(37, 'Negyedik könyv', 'looking for a publisher', 1, NULL, '2023-12-20 00:11:48', NULL, 'Ez a negyedik könyv leírása.', 0, 'Ez a kép elérési útja', 'Ez a könyv elérési útja', 0, 0, 0, 1, NULL, 1, 1, 1),
(38, 'Negyedik könyv', 'looking for a publisher', 1, NULL, '2023-12-20 00:12:19', NULL, 'Ez a negyedik könyv leírása.', 0, 'Ez a kép elérési útja', 'Ez a könyv elérési útja', 0, 0, 0, 1, NULL, 1, 1, 1),
(39, 'Negyedik könyv', 'looking for a publisher', 1, NULL, '2023-12-20 00:13:57', NULL, 'Ez a negyedik könyv leírása.', 0, 'Ez a kép elérési útja', 'Ez a könyv elérési útja', 0, 0, 0, 1, NULL, 1, 1, 1),
(40, 'Negyedik könyv', 'looking for a publisher', 1, NULL, '2023-12-20 00:13:59', NULL, 'Ez a negyedik könyv leírása.', 0, 'Ez a kép elérési útja', 'Ez a könyv elérési útja', 0, 0, 0, 1, NULL, 1, 1, 1),
(41, 'Negyedik könyv', 'looking for a publisher', 1, NULL, '2023-12-20 00:14:50', NULL, 'Ez a negyedik könyv leírása.', 0, 'Ez a kép elérési útja', 'Ez a könyv elérési útja', 100, 20, 0, 1, NULL, 1, 1, 1),
(42, 'Negyedik könyv', 'looking for a publisher', 1, NULL, '2023-12-20 08:08:20', NULL, 'Ez a negyedik könyv leírása.', 0, 'Ez a kép elérési útja', 'Ez a könyv elérési útja', 0, 0, 0, 1, NULL, 1, 1, 1),
(43, 'Negyedik könyv', 'looking for a publisher', 1, NULL, '2023-12-20 08:09:22', NULL, 'Ez a negyedik könyv leírása.', 0, 'Ez a kép elérési útja', 'Ez a könyv elérési útja', 0, 0, 0, 1, NULL, 1, 1, 1),
(45, 'Negyedik könyv', 'published by', 3, 9, '2023-12-20 08:18:09', NULL, 'Ez a negyedik könyv leírása.', 1250, 'Ez a kép elérési útja', 'Ez a könyv elérési útja', 0, 0, 0, 1, '12345678', 1, 1, 1);

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

--
-- A tábla adatainak kiíratása `bookrating`
--

INSERT INTO `bookrating` (`id`, `ratingerId`, `bookId`, `rating`, `ratingTime`) VALUES
(1, 1, 1, 4, '2023-12-19 21:16:48'),
(2, 4, 1, 3, '2023-12-19 21:16:48'),
(3, 1, 2, 5, '2023-12-19 21:16:48'),
(4, 5, 1, 1, '2023-12-19 21:16:48'),
(5, 16, 1, 5, '2023-12-19 21:16:48'),
(6, 1, 3, 5, '2023-12-19 21:16:48'),
(7, 21, 3, 2, '2023-12-19 21:16:48'),
(8, 10, 2, 3, '2023-12-19 21:16:48'),
(9, 10, 21, 4, '2023-12-19 21:16:48'),
(10, 11, 21, 4, '2023-12-19 21:16:48');

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

--
-- A tábla adatainak kiíratása `category`
--

INSERT INTO `category` (`id`, `name`, `image`) VALUES
(1, 'Fine Literature', 'pictures/category/fine-literature.jpg'),
(2, 'Gastronomy', 'pictures/category/gastronomy.jpg'),
(3, 'Social Sciences', 'pictures/category/social-siences.jpg'),
(4, 'Lifestyle, Health', 'pictures/category/lifestyle_health.jpg'),
(5, 'Language Books, Dictionaries', 'pictures/category/language_dictionaries.jpg'),
(6, 'Children and Young Adult', 'pictures/category/children_young-adult.jpg'),
(7, 'Lexicon, Encyclopedia', 'pictures/category/lexicon_encyclopedia.jpg'),
(8, 'Sports', 'pictures/category/sports.jpg'),
(9, 'Comics', 'pictures/category/comics.jpg'),
(10, 'Biographies', 'pictures/category/biographies.jpg'),
(11, 'Textbooks, Study Guides', 'pictures/category/textbook_study-guides.jpg'),
(12, 'Arts, Architecture', 'pictures/category/arts_architectures.jpg'),
(13, 'Novel', 'pictures/category/novel.jpg'),
(14, 'Maps', 'pictures/category/maps.jpg'),
(15, 'Travel', 'pictures/category/travel.jpg'),
(16, 'Religion', 'pictures/category/religion.jpg'),
(17, 'Educational', 'pictures/category/educational.jpg'),
(18, 'Hobbies, Leisure', 'pictures/category/hobbies_leisure.jpg'),
(19, 'Journals, Magazines', 'pictures/category/journals_magazines.jpg'),
(20, '18+', 'pictures/category/18+.jpg'),
(21, 'Action, Sci-Fi, Crime, Adventure', 'pictures/category/actions_sci-fi_crime_adventure.jpg'),
(22, 'Family', 'pictures/category/family.jpg'),
(23, 'Romantic', 'pictures/category/romantic.jpg'),
(24, 'TV Series', 'pictures/category/tv-series.jpg'),
(25, 'Horror, Thriller', 'pictures/category/horror_thriller.jpg'),
(26, 'Comedy', ''),
(27, 'Poetry Collection', '');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `categoryinterest`
--

CREATE TABLE `categoryinterest` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `categoryinterest`
--

INSERT INTO `categoryinterest` (`id`, `userId`, `categoryId`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 5),
(4, 1, 10),
(5, 2, 1),
(6, 2, 6),
(7, 2, 4),
(8, 3, 4),
(9, 3, 9),
(10, 3, 11),
(11, 4, 12),
(12, 4, 2),
(13, 4, 10),
(14, 5, 1),
(15, 5, 8),
(16, 5, 6),
(17, 5, 15),
(18, 6, 20),
(19, 6, 10),
(20, 6, 2),
(21, 7, 10),
(22, 7, 5),
(23, 7, 2),
(24, 8, 2),
(25, 8, 12),
(26, 8, 3),
(27, 9, 1),
(28, 9, 16),
(29, 9, 4),
(30, 10, 2),
(31, 10, 1),
(32, 10, 7),
(33, 11, 1),
(34, 11, 9),
(35, 11, 15),
(36, 12, 17),
(37, 12, 16),
(38, 12, 20),
(39, 13, 19),
(40, 13, 18),
(41, 13, 1),
(42, 14, 2),
(43, 14, 14),
(44, 14, 3),
(45, 15, 4),
(46, 15, 5),
(47, 15, 6),
(48, 16, 7),
(49, 16, 8),
(50, 16, 9),
(51, 17, 10),
(52, 17, 11),
(53, 17, 12),
(54, 18, 13),
(55, 18, 14),
(56, 18, 15),
(57, 19, 16),
(58, 19, 17),
(59, 19, 18),
(60, 20, 19),
(61, 20, 20),
(62, 20, 1),
(63, 21, 2),
(64, 21, 5),
(65, 21, 3),
(66, 22, 4),
(67, 22, 6),
(68, 22, 9),
(69, 23, 1),
(70, 23, 8),
(71, 1, 20),
(72, 1, 3),
(73, 1, 4),
(74, 38, 1),
(75, 38, 2),
(76, 38, 3),
(77, 38, 4),
(78, 38, 5),
(79, 32, 1),
(80, 32, 2),
(81, 32, 3),
(82, 32, 4),
(83, 32, 5),
(84, 32, 6),
(85, 32, 7),
(86, 32, 8),
(87, 32, 9),
(88, 32, 10),
(89, 32, 11),
(90, 32, 12);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `color`
--

CREATE TABLE `color` (
  `id` int(11) NOT NULL,
  `code` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `color`
--

INSERT INTO `color` (`id`, `code`) VALUES
(1, '#E8B5A0'),
(2, '#00FF00'),
(3, '#0000FF'),
(4, '#FFFF00'),
(5, '#FF00FF'),
(6, '#00FFFF'),
(7, '#800000'),
(8, '#008000'),
(9, '#000080'),
(10, '#808000'),
(11, '#800080'),
(12, '#008080'),
(13, '#C0C0C0'),
(14, '#808080'),
(15, '#FFA500'),
(16, '#A52A2A'),
(17, '#800080'),
(18, '#800000'),
(19, '#2F4F4F'),
(20, '#4B0082'),
(21, 'FFFFFF');

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

--
-- A tábla adatainak kiíratása `follow`
--

INSERT INTO `follow` (`id`, `followerId`, `followedId`, `followingTime`) VALUES
(1, 1, 2, '2023-12-19 22:25:59'),
(2, 1, 4, '2023-12-19 22:25:59'),
(3, 1, 10, '2023-12-19 22:25:59'),
(4, 2, 3, '2023-12-19 22:25:59'),
(5, 2, 1, '2023-12-19 22:25:59'),
(6, 6, 2, '2023-12-19 22:25:59'),
(7, 6, 1, '2023-12-19 22:25:59'),
(8, 1, 6, '2023-12-19 22:25:59'),
(9, 1, 4, '2023-12-19 22:25:59'),
(10, 1, 20, '2023-12-19 22:25:59'),
(11, 6, 2, '2023-12-19 22:25:59'),
(12, 6, 9, '2023-12-19 22:25:59'),
(13, 7, 1, '2023-12-19 22:25:59'),
(14, 11, 13, '2023-12-19 22:25:59'),
(15, 11, 6, '2023-12-19 22:25:59'),
(16, 21, 9, '2023-12-19 22:25:59'),
(17, 24, 10, '2023-12-19 22:25:59'),
(18, 16, 12, '2023-12-19 22:25:59'),
(19, 27, 2, '2023-12-19 22:25:59'),
(20, 27, 4, '2023-12-19 22:25:59'),
(23, 1, 32, '2024-01-08 22:18:57');

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

--
-- A tábla adatainak kiíratása `general`
--

INSERT INTO `general` (`id`, `authorName`, `birthdate`, `publishedBookCount`, `selfPublishedBookCount`) VALUES
(1, 'John Doe', '2000-11-12', 0, 0),
(2, 'Emily Smith', '2004-01-02', 0, 0),
(3, NULL, '2002-10-22', 0, 0),
(4, NULL, '2002-04-21', 0, 0),
(5, 'Sophia Brown', '2002-07-13', 0, 0),
(6, NULL, '2002-07-13', 0, 0),
(7, 'Lucas Johnson', '2002-12-24', 0, 0),
(8, NULL, '2005-03-04', 0, 0),
(9, 'Olivia Clark', '2005-03-04', 0, 0),
(10, NULL, '2005-03-04', 0, 0),
(11, NULL, '2005-03-04', 0, 0),
(12, 'Daniel Williams', '2005-03-04', 0, 0),
(13, 'Ethan Martinez', '2005-03-04', 0, 0),
(14, NULL, '2005-03-04', 0, 0),
(15, 'Ava Taylor', '2005-03-04', 0, 0),
(16, NULL, '2005-03-04', 0, 0),
(17, NULL, '2005-03-04', 0, 0),
(18, NULL, '2005-03-04', 0, 0),
(19, NULL, '2005-03-04', 0, 0),
(20, NULL, '2006-09-24', 0, 0),
(21, 'Isabella Wilson', '2007-12-17', 0, 0),
(22, NULL, '2007-12-17', 0, 0),
(23, NULL, '2002-10-07', 0, 0),
(24, NULL, '2003-10-07', 0, 0),
(25, NULL, '1992-04-19', 0, 0),
(26, NULL, '1992-04-19', 0, 0),
(27, NULL, '1992-04-19', 0, 0),
(28, NULL, '1992-04-19', 0, 0),
(29, NULL, '1990-05-29', 0, 0),
(30, NULL, '1990-05-29', 0, 0),
(31, NULL, '2000-11-10', 0, 0),
(32, NULL, '2002-02-10', 0, 0),
(33, NULL, '2002-11-14', 0, 0),
(34, NULL, '2002-11-14', 0, 0),
(35, NULL, '2002-11-14', 0, 0),
(36, NULL, '2002-12-12', 0, 0);

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

--
-- A tábla adatainak kiíratása `helpcenter`
--

INSERT INTO `helpcenter` (`id`, `question`, `answer`, `active`) VALUES
(1, 'How do I publish a book as an author?', 'Authors can publish their books by creating an account and following the steps under \"Publish Your Book\" section.', 1),
(2, 'What options do publishers have to list their books?', 'Publishers can register on the platform and list their books under their account by providing necessary details about the book.', 1),
(3, 'Can authors self-publish their books?', 'Yes, authors have the option to self-publish their books through their account by following the self-publishing guidelines.', 1),
(4, 'How can users purchase books?', 'Users can buy books by navigating to the book page, selecting the desired format (eBook, paperback, etc.), and proceeding to checkout.', 1),
(5, 'Are there any fees for publishing books?', 'There might be nominal fees associated with publishing depending on the type of publishing (traditional, self-publishing) chosen by the author.', 0),
(6, 'What formats are available for publishing?', 'Authors can publish their books in various formats such as eBooks, paperbacks, hardcovers, and audiobooks.', 0),
(7, 'How long does it take for a book to be published?', 'The time taken for publishing varies based on the publishing process, editing, formatting, and other factors, typically ranging from a few weeks to months.', 0),
(8, 'Do publishers have to approve author-submitted books?', 'Publishers may review and approve books submitted by authors before they are listed on the platform.', 0),
(9, 'How can I contact customer support?', 'You can reach our customer support team through the \"Contact Us\" section or via email at support@example.com.', 1),
(10, 'What payment methods are accepted?', 'We accept various payment methods including credit/debit cards, PayPal, and other secure online payment gateways.', 1),
(11, 'Is there a limit to the number of books an author can publish?', 'There is no fixed limit for the number of books an author can publish; however, certain guidelines might apply.', 0),
(12, 'Can publishers edit book details after listing?', 'Yes, publishers can edit book details such as descriptions, prices, and covers after listing them on the platform.', 1),
(13, 'How are royalties calculated for authors?', 'Royalties for authors are typically calculated based on book sales and are outlined in the publishing agreement.', 0),
(14, 'What happens after a user purchases a book?', 'After purchase, users can access their purchased books in their account and download or read them online.', 1),
(15, 'Is there a review process for submitted books?', 'Yes, submitted books might undergo a review process to ensure they meet the platform\'s guidelines and standards.', 0),
(16, 'Are there discounts for bulk purchases?', 'Bulk purchase discounts might be available for certain books or as part of promotional offers. Check the book details for more information.', 1),
(17, 'Can authors schedule book releases?', 'Authors have the option to schedule the release date for their books during the publishing process.', 1),
(18, 'How can I reset my password?', 'You can reset your password by clicking on the \"Forgot Password\" link on the login page and following the instructions sent to your registered email.', 1),
(19, 'Are there genre restrictions for published books?', 'As long as the content adheres to the platform\'s content guidelines, books of various genres can be published.', 0),
(20, 'Is there an age restriction for purchasing books?', 'There might be age restrictions for certain books based on their content. Parental guidance might be recommended for some content.', 0),
(21, 'Can users leave reviews for books?', 'Yes, users can leave reviews and ratings for books they have purchased and read.', 1),
(22, 'What happens if a book is out of stock?', 'If a book is temporarily out of stock, users can add it to their wishlist and receive notifications when it becomes available.', 1),
(23, 'Are there any limitations on international sales?', 'Books can generally be purchased internationally; however, shipping and regional restrictions might apply in some cases.', 0),
(24, 'Can authors track book sales and earnings?', 'Yes, authors can track their book sales and earnings through their account dashboard.', 1),
(25, 'Is there a limit to the book\'s file size for uploading?', 'There might be limitations on file size for book uploads to ensure smooth processing and download for users.', 0),
(26, 'Are there copyright guidelines for submitted content?', 'Authors and publishers are responsible for ensuring that they have the necessary rights and permissions for the content they upload.', 1),
(27, 'Can users gift books to others?', 'Yes, users have the option to purchase books as gifts and send them directly to recipients.', 1),
(28, 'How can I report an issue with a book or account?', 'You can report any issues related to books or your account through the \"Report a Problem\" feature or by contacting customer support.', 1),
(29, 'Do authors need an ISBN to publish?', 'Having an ISBN is recommended for certain types of publications; authors can acquire an ISBN during the publishing process if needed.', 0),
(30, 'Can books be pre-ordered before release?', 'Yes, certain books might be available for pre-order before their official release date.', 1),
(31, 'How often are new books added to the platform?', 'New books are added regularly; the frequency of additions depends on submissions and publisher activity.', 0),
(32, 'Are there language restrictions for published books?', 'Books published in various languages are welcome, provided they comply with the platform\'s guidelines.', 0),
(33, 'What are the refund policies for purchased books?', 'Refund policies might vary based on specific circumstances; refer to the refund policy section for more details.', 1),
(34, 'Are there requirements for book cover designs?', 'Book cover designs should meet specific requirements outlined in the platform\'s design guidelines.', 0),
(35, 'Can authors collaborate with other authors on a single book?', 'Yes, authors can collaborate and co-author books by following the collaborative publishing process.', 1),
(36, 'Is there a limit to the book\'s page count for publishing?', 'There might be recommendations or limitations on the page count for different book formats.', 0),
(37, 'Are there age recommendations for certain books?', 'Some books might have age recommendations or suitability notes based on their content.', 1),
(38, 'What are the supported file formats for book uploads?', 'Commonly supported file formats include PDF, ePub, MOBI, and others for different types of books.', 1),
(39, 'Can users access purchased books on multiple devices?', 'Yes, users can access their purchased books across multiple devices by logging into their account.', 1),
(40, 'Do authors retain the rights to their published books?', 'Authors usually retain the rights to their books as outlined in the publishing agreement.', 0),
(41, 'How are shipping fees calculated for physical books?', 'Shipping fees for physical books might vary based on location, weight, and shipping method selected during checkout.', 1),
(42, 'Are there guidelines for book pricing?', 'There might be suggested pricing guidelines to help authors and publishers set competitive prices for their books.', 0),
(43, 'Can books be translated after publishing?', 'Authors may translate their books post-publishing, but it involves a separate process and permissions for the translated version.', 1),
(44, 'What happens if there is an error in a published book?', 'Authors or publishers can address errors in published books by uploading revised editions or contacting support for assistance.', 1),
(45, 'Are there restrictions on explicit content in books?', 'There might be content guidelines regarding explicit or sensitive content to ensure suitability for all audiences.', 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `language`
--

CREATE TABLE `language` (
  `id` int(11) NOT NULL,
  `code` char(2) NOT NULL,
  `language` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `language`
--

INSERT INTO `language` (`id`, `code`, `language`) VALUES
(1, 'HU', 'Hungarian'),
(2, 'EN', 'English'),
(3, 'DE', 'German'),
(4, 'FR', 'French'),
(5, 'IT', 'Italian');

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

--
-- A tábla adatainak kiíratása `post`
--

INSERT INTO `post` (`id`, `userId`, `description`, `postTime`) VALUES
(1, 34, 'Hey fellow bookworms! Just finished reading an amazing thriller - The Silent Observer by Jane Doe. Gripping plot, couldn\'t put it down!', '2023-10-24 19:45:00'),
(2, 35, 'The plot is a rollercoaster of emotions, and there are unexpected twists that kept me turning the pages well into the night. What I appreciated most about this book is how it explores the complexities of relationships and how people cope with tragedy. It\'s a story that will stay with me for a long time.', '2023-10-15 11:56:00'),
(3, 36, 'I recently finished a captivating novel that I couldn\'t put down! It\'s a gripping mystery by a talented new author. The character development and intricate plot had me hooked from the first page. Can\'t wait to dive into more of their work. What\'s everyone else reading right now? I\'m also on the lookout for recommendations for my next read, so if you\'ve come across something that you couldn\'t get enough of, please share!', '2023-12-19 22:44:20'),
(5, 2, 'Az xy könyvnek a folytatása valamikor várható, valójába nmég én sem tudom mikor, de majd lesz valami.', '2023-12-19 22:46:45'),
(6, 7, 'xd', '2023-12-19 22:46:45'),
(7, 1, '0', '2023-01-01 07:00:00'),
(8, 2, 'Das ist ein deutscher Beitrag. Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2023-01-02 09:30:00'),
(9, 3, 'Questa è una pubblicazione in italiano. Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2023-01-03 10:45:00'),
(10, 4, 'Ez egy magyar poszt. Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2023-01-04 13:20:00'),
(11, 5, 'Ceci est une publication en français. Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2023-01-05 15:10:00'),
(12, 6, 'Another English post. Sed ut perspiciatis unde omnis iste natus error sit voluptatem.', '2023-01-06 17:00:00'),
(13, 7, 'Ein weiterer deutscher Beitrag. Sed ut perspiciatis unde omnis iste natus error sit voluptatem.', '2023-01-07 19:05:00'),
(14, 8, 'Un altro post italiano. Sed ut perspiciatis unde omnis iste natus error sit voluptatem.', '2023-01-08 21:30:00'),
(15, 9, 'Még egy magyar poszt. Sed ut perspiciatis unde omnis iste natus error sit voluptatem.', '2023-01-09 08:45:00'),
(16, 10, 'Encore une publication en français. Sed ut perspiciatis unde omnis iste natus error sit voluptatem.', '2023-01-10 11:00:00'),
(17, 11, 'English post here. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.', '2023-01-11 14:20:00'),
(18, 12, 'Deutscher Beitrag hier. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.', '2023-01-12 17:40:00'),
(19, 13, 'Pubblicazione italiana qui. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.', '2023-01-13 20:00:00'),
(20, 14, 'Magyar poszt itt. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.', '2023-01-14 09:10:00'),
(21, 15, 'Publication en français ici. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.', '2023-01-15 11:30:00'),
(22, 16, 'Another English post. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.', '2023-01-16 13:45:00'),
(23, 17, 'Ein weiterer deutscher Beitrag. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.', '2023-01-17 15:55:00'),
(24, 18, 'Un altro post italiano. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.', '2023-01-18 18:00:00'),
(25, 19, 'Még egy magyar poszt. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.', '2023-01-19 20:15:00'),
(26, 20, 'Encore une publication en français. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.', '2023-01-20 08:20:00');

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

--
-- A tábla adatainak kiíratása `postlike`
--

INSERT INTO `postlike` (`id`, `userId`, `postId`, `likeTime`) VALUES
(1, 1, 1, '2023-12-19 22:47:55'),
(2, 1, 2, '2023-12-19 22:47:55'),
(3, 1, 3, '2023-12-19 22:47:55'),
(4, 7, 2, '2023-12-19 22:47:55'),
(5, 9, 3, '2023-12-19 22:47:55'),
(6, 10, 1, '2023-12-19 22:47:55'),
(7, 20, 4, '2023-12-19 22:47:55'),
(8, 12, 5, '2023-12-19 22:47:55'),
(10, 11, 2, '2023-12-19 22:47:55');

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

--
-- A tábla adatainak kiíratása `publisher`
--

INSERT INTO `publisher` (`id`, `companyName`, `publishedBookCount`, `publishedBookCountOnPage`) VALUES
(1, 'Mesék Kiadója Kft.', 20, 0),
(2, 'Tündérmese Kiadások', 19, 0),
(3, 'Kalandvilág Könyvkiadó', 12, 0),
(4, 'Varázslatos Olvasmányok', 7, 0),
(5, 'Varázslatos Olvasmányok', 0, 0),
(6, 'Fantáziavilág Kiadóház', 9, 0),
(7, 'Kreatív Könyvműhely', 0, 0),
(8, 'Történetek Tárháza Kiadó', 2, 0),
(9, 'Mesevilág Kiadóház', 3, 0),
(10, 'Mesekönyv Birodalom', 1, 0),
(11, 'Ifjúsági regények kft.', 34, 0);

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

--
-- A tábla adatainak kiíratása `saved`
--

INSERT INTO `saved` (`id`, `userId`, `bookId`, `savedTime`) VALUES
(1, 1, 4, '2023-12-19 21:32:03'),
(2, 1, 10, '2023-12-19 21:32:03'),
(3, 2, 10, '2023-12-19 21:39:24'),
(4, 12, 21, '2023-12-19 21:39:24'),
(5, 1, 21, '2023-12-19 21:39:24'),
(6, 7, 9, '2023-12-19 21:39:24'),
(7, 5, 9, '2023-12-19 21:39:24'),
(8, 5, 1, '2023-12-19 21:39:24'),
(9, 5, 4, '2023-12-19 21:39:24'),
(10, 3, 10, '2023-12-19 21:39:24'),
(11, 17, 10, '2023-12-19 21:39:24'),
(12, 1, 19, '2023-12-19 21:39:24'),
(13, 1, 38, '2023-12-21 01:38:36');

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

--
-- A tábla adatainak kiíratása `targetaudience`
--

INSERT INTO `targetaudience` (`id`, `name`, `minAge`, `maxAge`) VALUES
(1, 'Children', 5, 10),
(2, 'Teenagers', 13, 19),
(3, 'Young Adults', 18, 25),
(4, 'Adults', 21, 60),
(5, 'Elderly', 60, 100),
(6, 'General Audience', 0, 100);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL COMMENT 'Alma123*',
  `rank` enum('general','publisher','admin','') NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `phoneNumber` varchar(15) DEFAULT NULL,
  `publicEmail` tinyint(1) NOT NULL DEFAULT 0,
  `publicPhoneNumber` tinyint(1) NOT NULL DEFAULT 0,
  `introDescription` varchar(1000) DEFAULT NULL,
  `website` varchar(100) DEFAULT NULL,
  `image` varchar(100) DEFAULT 'pictures/default-profile-pic-man.png',
  `registrationTime` timestamp NOT NULL DEFAULT current_timestamp(),
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `coverColorId` int(11) NOT NULL DEFAULT 1,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`, `rank`, `firstName`, `lastName`, `phoneNumber`, `publicEmail`, `publicPhoneNumber`, `introDescription`, `website`, `image`, `registrationTime`, `active`, `coverColorId`, `userId`) VALUES
(1, 'lilapapucs', 'nagybeni@gmail.com', '754532304a272553d11bcc2b24d223ec7f51dfd9', 'general', 'Nagy', 'Benedek', '06201234567', 1, 0, '', 'a.hu', 'pictures/default-profile-pic-man.png', '2023-12-16 01:53:24', 0, 21, 1),
(2, 'PenInkWriter', 'peninkwriter@gmail.com', '754532304a272553d11bcc2b24d223ec7f51dfd9', 'general', 'Kenderes', 'Amanda', '+36017249461', 0, 0, NULL, NULL, 'pictures/default-profile-pic-man.png', '2023-12-16 01:54:39', 0, 20, 2),
(3, 'StoryCraftPro', 'angyalka@gmail.com', '754532304a272553d11bcc2b24d223ec7f51dfd9', 'general', 'Angyal', 'Kristóf', '+361802680023', 0, 0, 'Kedves Olvasó! Örülök, hogy meglátogattad az oldalamat.', 'www.3a982c449f.com', 'pictures/default-profile-pic-man.png', '2023-12-16 01:55:13', 1, 1, 3),
(4, 'NovelWordsmith', 'petike@gmail.com', '754532304a272553d11bcc2b24d223ec7f51dfd9', 'general', 'Kis', 'Péter', '+361581621029', 0, 0, 'Kedves Olvasó! Örülök, hogy meglátogattad az oldalamat.', 'www.3061560356.com', 'pictures/default-profile-pic-man.png', '2023-12-16 01:55:45', 1, 11, 4),
(6, 'ChapterVerseAuthor', 'peterffynora@gmail.com', '754532304a272553d11bcc2b24d223ec7f51dfd9', 'general', 'Péterffy', 'Nóra', '06202784951', 0, 1, NULL, NULL, 'pictures/default-profile-pic-man.png', '2023-12-16 01:58:43', 0, 2, 6),
(7, 'PlotTwistWizard', 'sari@freemail.com', '754532304a272553d11bcc2b24d223ec7f51dfd9', 'general', 'Németh', 'Sára', NULL, 1, 0, NULL, NULL, 'pictures/default-profile-pic-man.png', '2023-12-16 01:59:44', 1, 1, 7),
(8, 'ProseJourneyer', 'kovemi@gmail.com', '754532304a272553d11bcc2b24d223ec7f51dfd9', 'general', 'Kovács', 'Emese', '+361964919275', 1, 0, 'Kedves Olvasó! Örülök, hogy meglátogattad az oldalamat.', 'www.883faa1b88.com', 'pictures/default-profile-pic-man.png', '2023-12-16 02:00:44', 1, 1, 8),
(9, 'VarazsloAdam', 'kovacsadam@gmail.com', '754532304a272553d11bcc2b24d223ec7f51dfd9', 'publisher', 'Kovács', 'Ádám', '+361608969096', 1, 1, 'Kedves Olvasó! Örülök, hogy meglátogattad az oldalamat.', 'www.004d97d4f8.com', 'pictures/default-profile-pic-man.png', '2023-12-16 02:05:40', 0, 18, 1),
(10, 'KonyvMesekAnna', 'tothanna@gmail.com', '754532304a272553d11bcc2b24d223ec7f51dfd9', 'publisher', 'Anna', 'Tóth', '+36701873692', 1, 0, NULL, NULL, 'pictures/default-profile-pic-man.png', '2023-12-16 02:07:24', 1, 1, 2),
(11, 'KreativBence', 'szabobeni@gmail.com', '754532304a272553d11bcc2b24d223ec7f51dfd9', 'publisher', 'Bence', 'Szabó', '+3672982563', 0, 0, NULL, 'www.hezfnwsko.com', 'pictures/default-profile-pic-man.png', '2023-12-16 02:08:07', 1, 6, 3),
(12, 'OldalforgatoCsilla', 'molncsill@gmail.com', '754532304a272553d11bcc2b24d223ec7f51dfd9', 'publisher', 'Molnár', 'Csilla', '+361025808899', 0, 0, 'Kedves Olvasó! Örülök, hogy meglátogattad az oldalamat.', 'www.2e66bd14c8.com', 'pictures/default-profile-pic-man.png', '2023-12-16 02:09:07', 1, 7, 4),
(25, 'KalandDaniel', 'nagydaniel@gmail.com', '754532304a272553d11bcc2b24d223ec7f51dfd9', 'publisher', 'Nagy', 'Dániel', '+36201374892', 0, 0, 'Kedves Olvasó! Örülök, hogy meglátogattad az oldalamat.', NULL, 'pictures/default-profile-pic-man.png', '2023-12-17 15:50:25', 0, 13, 6),
(26, 'WriterEmese', 'varga@citromail.com', '754532304a272553d11bcc2b24d223ec7f51dfd9', 'publisher', 'Emese', 'Varga', '+36019832674', 0, 0, 'Kedves Olvasó! Örülök, hogy meglátogattad az oldalamat.', NULL, 'pictures/default-profile-pic-man.png', '2023-12-17 15:51:21', 1, 8, 7),
(27, 'MeseloGergo', 'gergo@freemail.com', '754532304a272553d11bcc2b24d223ec7f51dfd9', 'publisher', 'Kiss', 'Gergő', NULL, 0, 0, NULL, NULL, 'pictures/default-profile-pic-man.png', '2023-12-17 15:52:13', 1, 4, 8),
(28, 'TortenetHanna', 'tortenethanna@gmail.com', '754532304a272553d11bcc2b24d223ec7f51dfd9', 'publisher', 'Hanna', 'Horváth', NULL, 1, 0, NULL, NULL, 'pictures/default-profile-pic-man.png', '2023-12-17 15:54:36', 1, 1, 9),
(29, 'OlvasoJani', 'piroskaesafarkas@gmail.com', '754532304a272553d11bcc2b24d223ec7f51dfd9', 'publisher', 'János', 'Farkas', '06303729165', 0, 1, NULL, NULL, 'pictures/default-profile-pic-man.png', '2023-12-17 15:55:38', 1, 1, 10),
(30, 'olvasnijo', 'olvasnijo@freemail.com', '754532304a272553d11bcc2b24d223ec7f51dfd9', 'general', 'Nagy', 'Ferenc', '+36019835627', 0, 1, NULL, NULL, 'pictures/default-profile-pic-man.png', '2023-12-17 15:56:19', 1, 1, 20),
(31, 'szeretemazoszt', 'nagyhatielemer@gmail.com', '754532304a272553d11bcc2b24d223ec7f51dfd9', 'general', 'Elemér', 'Nagyháti', '0672359862', 0, 0, NULL, 'www.hetpsh.com', 'pictures/default-profile-pic-man.png', '2023-12-17 15:57:34', 1, 4, 21),
(32, 'ifj_regenyek', 'ifjregenyek@gmail.com', '754532304a272553d11bcc2b24d223ec7f51dfd9', 'publisher', 'Laufer', 'Péter', '06703696146', 1, 0, NULL, NULL, 'pictures/default-profile-pic-man.png', '2023-12-17 15:58:58', 0, 15, 11),
(34, 'macAndCheese23', 'macandcheese@gmail.com', '754532304a272553d11bcc2b24d223ec7f51dfd9', 'general', 'mac', 'cheese', NULL, 0, 0, NULL, NULL, 'pictures/default-profile-pic-man.png', '2023-12-19 22:37:56', 1, 1, 23),
(35, 'ehesVagyok15', 'ehesvagyok@gmail.com', '754532304a272553d11bcc2b24d223ec7f51dfd9', 'general', 'ehes', 'vagyok', NULL, 0, 0, NULL, NULL, 'pictures/default-profile-pic-astronaut.png', '2023-12-19 22:40:47', 1, 1, 24),
(36, 'theMandalorian89', 'mandalorian@gmail.com', '754532304a272553d11bcc2b24d223ec7f51dfd9', 'general', 'the', 'mandalorian', NULL, 0, 0, NULL, NULL, 'pictures/default-profile-pic-mandalorian.png', '2023-12-19 22:42:21', 1, 1, 25),
(38, 'egy_almafa', 'egy.almafa@gmail.com', '754532304a272553d11bcc2b24d223ec7f51dfd9', 'general', 'egy', 'almafa', NULL, 0, 0, NULL, NULL, 'pictures/default-profile-pic-man.png', '2023-12-20 14:01:13', 0, 1, 27),
(40, 'egy.almafa', 'egy.alma.fa@gmail.com', '754532304a272553d11bcc2b24d223ec7f51dfd9', 'general', 'egy', 'almafa', NULL, 0, 0, NULL, NULL, 'pictures/default-profile-pic-man.png', '2023-12-20 14:18:34', 1, 1, 29),
(42, 'username', 'user@gmail.com', '754532304a272553d11bcc2b24d223ec7f51dfd9', 'general', 'first', 'last', NULL, 0, 0, NULL, NULL, 'pictures/default-profile-pic-man.png', '2023-12-20 19:08:40', 1, 1, 31),
(43, 'john.smith', 'john.smith@gmail.com', '754532304a272553d11bcc2b24d223ec7f51dfd9', 'general', 'John', 'Smith', NULL, 0, 0, NULL, NULL, 'pictures/default-profile-pic-man.png', '2023-12-22 02:26:45', 1, 1, 32),
(44, 'mayerhedda', 'mayer.hedda@gmail.com', '754532304a272553d11bcc2b24d223ec7f51dfd9', 'general', 'Mayer', 'Hedda', NULL, 0, 0, NULL, NULL, 'pictures/default-profile-pic-man.png', '2024-02-16 11:52:06', 0, 1, 33),
(46, 'heddo', 'mayer.hedda2002@gmail.com', '754532304a272553d11bcc2b24d223ec7f51dfd9', 'general', 'Mayer', 'Hedda', NULL, 0, 0, NULL, NULL, 'pictures/default-profile-pic-man.png', '2024-02-16 12:01:42', 1, 1, 35),
(47, 'hedda', 'mayer@gmail.com', '754532304a272553d11bcc2b24d223ec7f51dfd9', 'general', 'Mayer', 'Hedda', NULL, 0, 0, NULL, NULL, 'pictures/default-profile-pic-man.png', '2024-02-16 12:08:37', 1, 1, 36);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT a táblához `bookrating`
--
ALTER TABLE `bookrating`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT a táblához `categoryinterest`
--
ALTER TABLE `categoryinterest`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- AUTO_INCREMENT a táblához `color`
--
ALTER TABLE `color`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT a táblához `follow`
--
ALTER TABLE `follow`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT a táblához `forgotpassword`
--
ALTER TABLE `forgotpassword`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `general`
--
ALTER TABLE `general`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT a táblához `helpcenter`
--
ALTER TABLE `helpcenter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT a táblához `language`
--
ALTER TABLE `language`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `payment`
--
ALTER TABLE `payment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT a táblához `postlike`
--
ALTER TABLE `postlike`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `publisher`
--
ALTER TABLE `publisher`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT a táblához `saved`
--
ALTER TABLE `saved`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT a táblához `targetaudience`
--
ALTER TABLE `targetaudience`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT a táblához `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT a táblához `userrating`
--
ALTER TABLE `userrating`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
