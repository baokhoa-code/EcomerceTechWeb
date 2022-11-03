-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.6.7-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.1.0.6545
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for ct313h_labs
DROP DATABASE IF EXISTS `ct313h_labs`;
CREATE DATABASE IF NOT EXISTS `ct313h_labs` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `ct313h_labs`;

-- Dumping structure for table ct313h_labs.contacts
DROP TABLE IF EXISTS `contacts`;
CREATE TABLE IF NOT EXISTS `contacts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` text DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` tinytext NOT NULL,
  `favorite` tinyint(1) unsigned NOT NULL DEFAULT 0,
  `owner_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table ct313h_labs.contacts: ~3 rows (approximately)
INSERT INTO `contacts` (`id`, `name`, `email`, `address`, `phone`, `favorite`, `owner_id`) VALUES
	(1, 'Bùi Võ Quốc Bảo', 'baobui@example.com', '27 Vĩnh Long', '0987645331', 1, 1),
	(2, 'Nguyễn Ngọc Trung', 'trung@gmail.com', '65/6 Hồ Chí Minh', '0967908345', 0, 1),
	(3, 'Trần Ngọc Giang', 'gtrung@gmail.com', '85 Đại Ngãi, Sóc Trăng', '0987645126', 0, 1);

-- Dumping structure for table ct313h_labs.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` char(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table ct313h_labs.users: ~0 rows (approximately)
INSERT INTO `users` (`id`, `username`, `email`, `password`) VALUES
	(1, 'baobui', 'baobui@example.com', '$2a$08$te1ZxSAMZWn62gM6BjkHJOH5e/kyVloWcYHo3dKXtQ6wKbbHbRACi');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
