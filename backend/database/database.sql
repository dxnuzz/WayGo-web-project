-- Host: localhost    Database: waygo_db

SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` enum('Active','Suspended') DEFAULT 'Active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `admin` (
  `admin_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `username` (`username`),
  CONSTRAINT `fk_admin_user` FOREIGN KEY (`admin_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `customer` (
  `customer_id` int(11) NOT NULL,
  `f_name` varchar(50) NOT NULL,
  `l_name` varchar(50) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `joined_date` date DEFAULT curdate(),
  PRIMARY KEY (`customer_id`),
  CONSTRAINT `fk_customer_user` FOREIGN KEY (`customer_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `vehicle` (
  `vehicle_id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_id` int(11) NOT NULL,
  `licence_number` varchar(50) NOT NULL,
  `vehicle_name` varchar(100) NOT NULL,
  `type` varchar(50) NOT NULL,
  `brand` varchar(50) NOT NULL,
  `color` varchar(30) NOT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `availability` enum('Available','Rented','Maintenance') DEFAULT 'Available',
  `rental_price_per_day` decimal(10,2) NOT NULL,
  `seats` int(11) NOT NULL,
  `fuel_type` varchar(30) NOT NULL,
  `transmission` enum('Auto','Manual') NOT NULL,
  `description` text DEFAULT NULL,
  PRIMARY KEY (`vehicle_id`),
  UNIQUE KEY `licence_number` (`licence_number`),
  CONSTRAINT `fk_vehicle_admin` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`admin_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `booking` (
  `booking_id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL,
  `vehicle_id` int(11) NOT NULL,
  `pickup_date` date NOT NULL,
  `return_date` date NOT NULL,
  `actual_return_date` date DEFAULT NULL,
  `per_day_amount` decimal(10,2) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `additional_price` decimal(10,2) DEFAULT 0.00,
  `status` enum('Pending','Confirmed','Completed','Cancelled') DEFAULT 'Pending',
  `is_deleted_by_admin` tinyint(1) DEFAULT 0,
  `is_deleted_by_customer` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`booking_id`),
  CONSTRAINT `fk_booking_customer` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_booking_vehicle` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicle` (`vehicle_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `feedbacks` (
  `feedback_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `rating` int(11) NOT NULL DEFAULT 5,
  `message` text NOT NULL,
  `show_on_home` tinyint(1) NOT NULL DEFAULT 0,
  `is_deleted_by_admin` tinyint(1) DEFAULT 0,
  `is_deleted_by_customer` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`feedback_id`),
  CONSTRAINT `fk_feedbacks_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `contact_messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `message` text NOT NULL,
  `reply` text DEFAULT NULL,
  `status` enum('Pending','Replied') DEFAULT 'Pending',
  `is_deleted_by_admin` tinyint(1) DEFAULT 0,
  `is_deleted_by_customer` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_contact_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

-- Adding dummy data for testing purposes

INSERT INTO `user` (`user_id`, `email`, `password`, `status`) VALUES
(1, 'admin@waygo.com', '$2y$10$QEINZrMHatKswQB2UmGrjO9TeGLzK3JsoP159IioiMtNIBbCy1ZdG', 'Active'),
(2, 'customer@waygo.com', '$2y$10$QHJotnGALr.yYtn2Ql6g8O9NgnCqECETXhv2j2ja//gLZczatVNu6', 'Active')
ON DUPLICATE KEY UPDATE `email`=VALUES(`email`), `password`=VALUES(`password`), `status`=VALUES(`status`);

INSERT INTO `admin` (`admin_id`, `username`) VALUES 
(1, 'admin') 
ON DUPLICATE KEY UPDATE `username`=VALUES(`username`);

INSERT INTO `customer` (`customer_id`, `f_name`, `l_name`, `phone_number`) VALUES 
(2, 'Nimal', 'Perera', '0771234567') 
ON DUPLICATE KEY UPDATE `f_name`=VALUES(`f_name`), `l_name`=VALUES(`l_name`), `phone_number`=VALUES(`phone_number`);

INSERT INTO `feedbacks` (`feedback_id`, `user_id`, `rating`, `message`, `show_on_home`) VALUES 
(1, 2, 5, 'Excellent rental service in Badulla! Clean vehicles and fast service.', 1) 
ON DUPLICATE KEY UPDATE `message`=VALUES(`message`), `rating`=VALUES(`rating`);

-- Inserting vehicle details into database

INSERT INTO `vehicle` (`vehicle_id`, `admin_id`, `licence_number`, `vehicle_name`, `type`, `brand`, `color`, `image_path`, `availability`, `rental_price_per_day`, `seats`, `fuel_type`, `transmission`, `description`) VALUES
(20, 1, 'WP-CAR-0020', 'Honda Civic 2004', 'Car', 'Honda', 'White', 'http://localhost/WayGo-web/backend/uploads/vehicles/CAR/honda/honda-civic-2004.jpeg', 'Available', 18100.0, 5, 'Petrol', 'Auto', 'Honda Civic 2004 ready for rent in Badulla.'),
(21, 1, 'WP-CAR-0021', 'Honda Civic', 'Car', 'Honda', 'White', 'http://localhost/WayGo-web/backend/uploads/vehicles/CAR/honda/honda-civic.jpeg', 'Available', 6700.0, 5, 'Petrol', 'Auto', 'Honda Civic ready for rent in Badulla.'),
(22, 1, 'WP-CAR-0022', 'Honda Grace', 'Car', 'Honda', 'Maroon', 'http://localhost/WayGo-web/backend/uploads/vehicles/CAR/honda/honda-grace.jpg', 'Available', 5600.0, 5, 'Petrol', 'Auto', 'Honda Grace ready for rent in Badulla.'),
(23, 1, 'WP-CAR-0023', 'Honda Jazz', 'Car', 'Honda', 'White', 'http://localhost/WayGo-web/backend/uploads/vehicles/CAR/honda/honda_jazz.jpeg', 'Available', 17300.0, 5, 'Petrol', 'Auto', 'Honda Jazz ready for rent in Badulla.'),
(24, 1, 'WP-CAR-0024', '2025 Nissan Almera', 'Car', 'Nissan', 'Silver', 'http://localhost/WayGo-web/backend/uploads/vehicles/CAR/nissan/2025 Nissan Almera.jpeg', 'Available', 15100.0, 5, 'Petrol', 'Auto', '2025 Nissan Almera ready for rent in Badulla.'),
(25, 1, 'WP-CAR-0025', '2025 Nissan Magnite', 'Car', 'Nissan', 'Orange', 'http://localhost/WayGo-web/backend/uploads/vehicles/CAR/nissan/2025 Nissan Magnite.jpeg', 'Available', 19600.0, 5, 'Petrol', 'Auto', '2025 Nissan Magnite ready for rent in Badulla.'),
(26, 1, 'WP-CAR-0026', 'Nissan Note 2019', 'Car', 'Nissan', 'Silver', 'http://localhost/WayGo-web/backend/uploads/vehicles/CAR/nissan/Nissan Note 2019.jpeg', 'Available', 4000.0, 5, 'Petrol', 'Auto', 'Nissan Note 2019 ready for rent in Badulla.'),
(27, 1, 'WP-CAR-0027', 'Nissan Hatchback', 'Car', 'Nissan', 'White', 'http://localhost/WayGo-web/backend/uploads/vehicles/CAR/nissan/nissan_hatchback.jpeg', 'Available', 13900.0, 5, 'Petrol', 'Auto', 'Nissan Hatchback ready for rent in Badulla.'),
(28, 1, 'WP-CAR-0028', 'Nissan N16', 'Car', 'Nissan', 'Maroon', 'http://localhost/WayGo-web/backend/uploads/vehicles/CAR/nissan/Nissan_N16.jpeg', 'Available', 12900.0, 5, 'Petrol', 'Auto', 'Nissan N16 ready for rent in Badulla.'),
(29, 1, 'WP-CAR-0029', '2010 Suzuki A Star', 'Car', 'Suzuki', 'White', 'http://localhost/WayGo-web/backend/uploads/vehicles/CAR/suzuki/2010 Suzuki A-Star.jpeg', 'Available', 9500.0, 5, 'Petrol', 'Auto', '2010 Suzuki A Star ready for rent in Badulla.'),
(30, 1, 'WP-CAR-0030', 'Fronx Auto', 'Car', 'Suzuki', 'Blue', 'http://localhost/WayGo-web/backend/uploads/vehicles/CAR/suzuki/fronx-auto.jpeg', 'Available', 16200.0, 5, 'Petrol', 'Auto', 'Fronx Auto ready for rent in Badulla.'),
(31, 1, 'WP-CAR-0031', 'Maruti Suzuki', 'Car', 'Suzuki', 'Red', 'http://localhost/WayGo-web/backend/uploads/vehicles/CAR/suzuki/maruti-suzuki.jpeg', 'Available', 10700.0, 5, 'Petrol', 'Auto', 'Maruti Suzuki ready for rent in Badulla.'),
(32, 1, 'WP-CAR-0032', 'Suzuki Wagon R', 'Car', 'Suzuki', 'Pink', 'http://localhost/WayGo-web/backend/uploads/vehicles/CAR/suzuki/Suzuki Wagon R.jpeg', 'Available', 13400.0, 5, 'Petrol', 'Auto', 'Suzuki Wagon R ready for rent in Badulla.'),
(33, 1, 'WP-CAR-0033', 'Suzuki Ertiga Glx', 'Car', 'Suzuki', 'Blue', 'http://localhost/WayGo-web/backend/uploads/vehicles/CAR/suzuki/suzuki-ertiga-glx.jpeg', 'Available', 5100.0, 5, 'Petrol', 'Auto', 'Suzuki Ertiga Glx ready for rent in Badulla.'),
(34, 1, 'WP-CAR-0034', 'Suzuki Baleno 2017', 'Car', 'Suzuki', 'White', 'http://localhost/WayGo-web/backend/uploads/vehicles/CAR/suzuki/suzuki_baleno_2017.jpeg', 'Available', 19100.0, 5, 'Petrol', 'Auto', 'Suzuki Baleno 2017 ready for rent in Badulla.'),
(35, 1, 'WP-CAR-0035', 'Allion', 'Car', 'Toyota', 'White', 'http://localhost/WayGo-web/backend/uploads/vehicles/CAR/toyota/Allion.jpeg', 'Available', 17700.0, 5, 'Petrol', 'Auto', 'Allion ready for rent in Badulla.'),
(36, 1, 'WP-CAR-0036', 'Axio', 'Car', 'Toyota', 'White', 'http://localhost/WayGo-web/backend/uploads/vehicles/CAR/toyota/Axio.jpeg', 'Available', 18900.0, 5, 'Hybrid', 'Auto', 'Axio ready for rent in Badulla.'),
(37, 1, 'WP-CAR-0037', 'Medium Toyota Aqua', 'Car', 'Toyota', 'White', 'http://localhost/WayGo-web/backend/uploads/vehicles/CAR/toyota/medium_Toyota_Aqua.webp', 'Available', 5600.0, 5, 'Hybrid', 'Auto', 'Medium Toyota Aqua ready for rent in Badulla.'),
(38, 1, 'WP-CAR-0038', 'Toyota Corolla', 'Car', 'Toyota', 'White', 'http://localhost/WayGo-web/backend/uploads/vehicles/CAR/toyota/Toyota_Corolla.png', 'Available', 6400.0, 5, 'Petrol', 'Auto', 'Toyota Corolla ready for rent in Badulla.'),
(39, 1, 'WP-CAR-0039', 'Toyota Prius', 'Car', 'Toyota', 'Silver', 'http://localhost/WayGo-web/backend/uploads/vehicles/CAR/toyota/Toyota_Prius.jpeg', 'Available', 17800.0, 5, 'Hybrid', 'Auto', 'Toyota Prius ready for rent in Badulla.'),
(40, 1, 'WP-CAR-0040', 'Vitz (Yaris)', 'Car', 'Toyota', 'White', 'http://localhost/WayGo-web/backend/uploads/vehicles/CAR/toyota/Vitz (Yaris).jpeg', 'Available', 18500.0, 5, 'Petrol', 'Auto', 'Vitz (Yaris) ready for rent in Badulla.'),
(41, 1, 'WP-SUV-0041', '2026 Kia Sorento', 'SUV', 'Kia', 'Grey', 'http://localhost/WayGo-web/backend/uploads/vehicles/SUV/2026_kia_sorento.avif', 'Available', 7100.0, 7, 'Diesel', 'Auto', '2026 Kia Sorento ready for rent in Badulla.'),
(42, 1, 'WP-SUV-0042', 'Honda CR V', 'SUV', 'Honda', 'Grey', 'http://localhost/WayGo-web/backend/uploads/vehicles/SUV/Honda CR-V.avif', 'Available', 15500.0, 7, 'Diesel', 'Auto', 'Honda CR V ready for rent in Badulla.'),
(43, 1, 'WP-SUV-0043', 'Honda Vezel Urban Suv', 'SUV', 'Honda', 'Black', 'http://localhost/WayGo-web/backend/uploads/vehicles/SUV/honda-vezel-urban-suv.jpg', 'Available', 13700.0, 7, 'Diesel', 'Auto', 'Honda Vezel Urban Suv ready for rent in Badulla.'),
(44, 1, 'WP-SUV-0044', 'Honda WR V', 'SUV', 'Honda', 'White', 'http://localhost/WayGo-web/backend/uploads/vehicles/SUV/honda_WR-V.avif', 'Available', 12800.0, 7, 'Diesel', 'Auto', 'Honda WR V ready for rent in Badulla.'),
(45, 1, 'WP-SUV-0045', 'Hyundai Tucson', 'SUV', 'Hyundai', 'Black', 'http://localhost/WayGo-web/backend/uploads/vehicles/SUV/Hyundai Tucson.avif', 'Available', 8000.0, 7, 'Diesel', 'Auto', 'Hyundai Tucson ready for rent in Badulla.'),
(46, 1, 'WP-SUV-0046', 'Mazda Cx 5 2015 Jeep', 'SUV', 'Mazda', 'Grey', 'http://localhost/WayGo-web/backend/uploads/vehicles/SUV/mazda-cx-5-2015-jeep.jpg', 'Available', 6000.0, 7, 'Diesel', 'Auto', 'Mazda Cx 5 2015 Jeep ready for rent in Badulla.'),
(47, 1, 'WP-SUV-0047', 'Mitsubishi Montero', 'SUV', 'Mitsubishi', 'Black', 'http://localhost/WayGo-web/backend/uploads/vehicles/SUV/Mitsubishi Montero.avif', 'Available', 16400.0, 7, 'Diesel', 'Auto', 'Mitsubishi Montero ready for rent in Badulla.'),
(48, 1, 'WP-SUV-0048', 'Mitsubishi Outlander', 'SUV', 'Mitsubishi', 'Grey', 'http://localhost/WayGo-web/backend/uploads/vehicles/SUV/mitsubishi-outlander.webp', 'Available', 6500.0, 7, 'Diesel', 'Auto', 'Mitsubishi Outlander ready for rent in Badulla.'),
(49, 1, 'WP-SUV-0049', 'Mitsubishi Pajero', 'SUV', 'Mitsubishi', 'Red', 'http://localhost/WayGo-web/backend/uploads/vehicles/SUV/mitsubishi_pajero.jpg', 'Available', 6000.0, 7, 'Diesel', 'Auto', 'Mitsubishi Pajero ready for rent in Badulla.'),
(50, 1, 'WP-SUV-0050', 'Nissan X Trail', 'SUV', 'Nissan', 'Black', 'http://localhost/WayGo-web/backend/uploads/vehicles/SUV/Nissan X-Trail.jpg', 'Available', 15700.0, 7, 'Diesel', 'Auto', 'Nissan X Trail ready for rent in Badulla.'),
(51, 1, 'WP-SUV-0051', 'Nissan Juke 2020', 'SUV', 'Nissan', 'Beige', 'http://localhost/WayGo-web/backend/uploads/vehicles/SUV/nissan-juke-2020.jpg', 'Available', 15200.0, 7, 'Diesel', 'Auto', 'Nissan Juke 2020 ready for rent in Badulla.'),
(52, 1, 'WP-SUV-0052', 'Nissan Patrol', 'SUV', 'Nissan', 'Blue', 'http://localhost/WayGo-web/backend/uploads/vehicles/SUV/nissan-patrol.avif', 'Available', 10000.0, 7, 'Diesel', 'Auto', 'Nissan Patrol ready for rent in Badulla.'),
(53, 1, 'WP-SUV-0053', 'Suzuki Escudo', 'SUV', 'Suzuki', 'Silver', 'http://localhost/WayGo-web/backend/uploads/vehicles/SUV/Suzuki Escudo.jpg', 'Available', 18800.0, 7, 'Diesel', 'Auto', 'Suzuki Escudo ready for rent in Badulla.'),
(54, 1, 'WP-SUV-0054', 'Suzuki Jimny', 'SUV', 'Suzuki', 'Green', 'http://localhost/WayGo-web/backend/uploads/vehicles/SUV/suzuki-jimny.jpeg', 'Available', 14400.0, 7, 'Diesel', 'Auto', 'Suzuki Jimny ready for rent in Badulla.'),
(55, 1, 'WP-SUV-0055', 'SUZUKI VITARA', 'SUV', 'Suzuki', 'Black', 'http://localhost/WayGo-web/backend/uploads/vehicles/SUV/SUZUKI-VITARA.jpg', 'Available', 13700.0, 7, 'Diesel', 'Auto', 'SUZUKI VITARA ready for rent in Badulla.'),
(56, 1, 'WP-SUV-0056', 'Toyota Prado Vx', 'SUV', 'Toyota', 'Red', 'http://localhost/WayGo-web/backend/uploads/vehicles/SUV/toyota-prado-vx.webp', 'Available', 7800.0, 7, 'Diesel', 'Auto', 'Toyota Prado Vx ready for rent in Badulla.'),
(57, 1, 'WP-SUV-0057', 'Toyota Fortuner', 'SUV', 'Toyota', 'White', 'http://localhost/WayGo-web/backend/uploads/vehicles/SUV/Toyota_Fortuner.jpg', 'Available', 8700.0, 7, 'Diesel', 'Auto', 'Toyota Fortuner ready for rent in Badulla.'),
(58, 1, 'WP-SUV-0058', 'Toyota Land Cruiser Prado', 'SUV', 'Toyota', 'White', 'http://localhost/WayGo-web/backend/uploads/vehicles/SUV/Toyota_Land_Cruiser_Prado.jpg', 'Available', 9600.0, 7, 'Diesel', 'Auto', 'Toyota Land Cruiser Prado ready for rent in Badulla.'),
(59, 1, 'WP-TUK-0059', 'Bajaj RE 4 Stroke', 'Tuk Tuk', 'Bajaj', 'Black', 'http://localhost/WayGo-web/backend/uploads/vehicles/TUKTUK/Bajaj RE 4-stroke.webp', 'Available', 5800.0, 3, 'Petrol', 'Manual', 'Bajaj RE 4 Stroke ready for rent in Badulla.'),
(60, 1, 'WP-TUK-0060', 'Bajaj Maxima Auto', 'Tuk Tuk', 'Bajaj', 'Green', 'http://localhost/WayGo-web/backend/uploads/vehicles/TUKTUK/bajaj-maxima-auto.jpg', 'Available', 4400.0, 3, 'Petrol', 'Manual', 'Bajaj Maxima Auto ready for rent in Badulla.'),
(61, 1, 'WP-TUK-0061', 'Mahindra Alfa Dx', 'Tuk Tuk', 'Mahindra', 'Black', 'http://localhost/WayGo-web/backend/uploads/vehicles/TUKTUK/mahindra-alfa-dx.avif', 'Available', 5600.0, 3, 'Petrol', 'Manual', 'Mahindra Alfa Dx ready for rent in Badulla.'),
(62, 1, 'WP-TUK-0062', 'Piaggio Three Wheeler   Ape Auto DX Passenger Diesel', 'Tuk Tuk', 'Piaggio', 'Black', 'http://localhost/WayGo-web/backend/uploads/vehicles/TUKTUK/Piaggio Three-Wheeler - Ape Auto DX Passenger Diesel.jpg', 'Available', 4000.0, 3, 'Diesel', 'Manual', 'Piaggio Three Wheeler   Ape Auto DX Passenger Diesel ready for rent in Badulla.'),
(63, 1, 'WP-TUK-0063', 'TVS King EV Max', 'Tuk Tuk', 'TVS', 'Blue', 'http://localhost/WayGo-web/backend/uploads/vehicles/TUKTUK/TVS King EV Max.webp', 'Available', 4200.0, 3, 'Electric', 'Manual', 'TVS King EV Max ready for rent in Badulla.'),
(64, 1, 'WP-VAN-0064', 'DAIHATSU HIJET CARG', 'Van', 'Daihatsu', 'White', 'http://localhost/WayGo-web/backend/uploads/vehicles/VAN/DAIHATSU__HIJET_CARG.jpg', 'Available', 8100.0, 10, 'Diesel', 'Manual', 'DAIHATSU HIJET CARG ready for rent in Badulla.'),
(65, 1, 'WP-VAN-0065', 'Mazda Bongo', 'Van', 'Mazda', 'White', 'http://localhost/WayGo-web/backend/uploads/vehicles/VAN/mazda-bongo.jpeg', 'Available', 12600.0, 10, 'Diesel', 'Manual', 'Mazda Bongo ready for rent in Badulla.'),
(66, 1, 'WP-VAN-0066', 'Micro Mpv Junior Van', 'Van', 'Micro', 'Grey', 'http://localhost/WayGo-web/backend/uploads/vehicles/VAN/micro-mpv-junior-van.jpeg', 'Available', 15000.0, 10, 'Diesel', 'Manual', 'Micro Mpv Junior Van ready for rent in Badulla.'),
(67, 1, 'WP-VAN-0067', 'Mitsubishi Po15', 'Van', 'Mitsubishi', 'Beige', 'http://localhost/WayGo-web/backend/uploads/vehicles/VAN/mitsubishi-po15.jpg', 'Available', 15600.0, 10, 'Diesel', 'Manual', 'Mitsubishi Po15 ready for rent in Badulla.'),
(68, 1, 'WP-VAN-0068', 'Mitsubishi L300', 'Van', 'Mitsubishi', 'White', 'http://localhost/WayGo-web/backend/uploads/vehicles/VAN/mitsubishi_l300.jpeg', 'Available', 6100.0, 10, 'Diesel', 'Manual', 'Mitsubishi L300 ready for rent in Badulla.'),
(69, 1, 'WP-VAN-0069', 'Nissan CARAVAN VAN', 'Van', 'Nissan', 'Silver', 'http://localhost/WayGo-web/backend/uploads/vehicles/VAN/Nissan_CARAVAN_VAN.jpeg', 'Available', 12500.0, 10, 'Diesel', 'Manual', 'Nissan CARAVAN VAN ready for rent in Badulla.'),
(70, 1, 'WP-VAN-0070', 'Nissan Vanette', 'Van', 'Nissan', 'White', 'http://localhost/WayGo-web/backend/uploads/vehicles/VAN/nissan_vanette.jpg', 'Available', 11300.0, 10, 'Diesel', 'Manual', 'Nissan Vanette ready for rent in Badulla.'),
(71, 1, 'WP-VAN-0071', 'Suzuki Every 2014', 'Van', 'Suzuki', 'Black', 'http://localhost/WayGo-web/backend/uploads/vehicles/VAN/suzuki-every-2014.jpeg', 'Available', 13100.0, 10, 'Diesel', 'Manual', 'Suzuki Every 2014 ready for rent in Badulla.'),
(72, 1, 'WP-VAN-0072', 'Suzuki Carry Van', 'Van', 'Suzuki', 'Silver', 'http://localhost/WayGo-web/backend/uploads/vehicles/VAN/Suzuki_Carry_Van.jpeg', 'Available', 6100.0, 10, 'Diesel', 'Manual', 'Suzuki Carry Van ready for rent in Badulla.'),
(73, 1, 'WP-VAN-0073', 'Toyota Hiace KDH', 'Van', 'Toyota', 'Black', 'http://localhost/WayGo-web/backend/uploads/vehicles/VAN/Toyota Hiace KDH.jpeg', 'Available', 6800.0, 10, 'Diesel', 'Manual', 'Toyota Hiace KDH ready for rent in Badulla.'),
(74, 1, 'WP-VAN-0074', 'Toyota Townace', 'Van', 'Toyota', 'White', 'http://localhost/WayGo-web/backend/uploads/vehicles/VAN/toyota_townace.jpeg', 'Available', 3800.0, 10, 'Diesel', 'Manual', 'Toyota Townace ready for rent in Badulla.'),
(75, 1, 'WP-BIK-0001', 'Aprilia Dorsoduro 750', 'Bike', 'Aprilia', 'Black', 'http://localhost/WayGo-web/backend/uploads/vehicles/BIKE/motrorcycle/Aprilia Dorsoduro 750.jpeg', 'Available', 4200.0, 2, 'Petrol', 'Manual', 'Aprilia Dorsoduro 750 ready for rent in Badulla.'),
(76, 1, 'WP-BIK-0002', 'Honda Navi 110', 'Bike', 'Honda', 'Red', 'http://localhost/WayGo-web/backend/uploads/vehicles/BIKE/motrorcycle/Honda Navi 110.webp', 'Available', 2800.0, 2, 'Petrol', 'Manual', 'Honda Navi 110 ready for rent in Badulla.'),
(77, 1, 'WP-BIK-0004', 'Kawasaki D Tracker 250', 'Bike', 'Kawasaki', 'Blue', 'http://localhost/WayGo-web/backend/uploads/vehicles/BIKE/motrorcycle/Kawasaki D-Tracker 250.jpg', 'Available', 2600.0, 2, 'Petrol', 'Manual', 'Kawasaki D Tracker 250 ready for rent in Badulla.'),
(78, 1, 'WP-BIK-0008', 'Senaro GN 125 2025', 'Bike', 'Senaro', 'Black', 'http://localhost/WayGo-web/backend/uploads/vehicles/BIKE/motrorcycle/Senaro GN 125 2025.webp', 'Available', 3400.0, 2, 'Petrol', 'Manual', 'Senaro GN 125 2025 ready for rent in Badulla.'),
(79, 1, 'WP-BIK-0007', 'Senaro GN 125 2025', 'Bike', 'Senaro', 'Red', 'http://localhost/WayGo-web/backend/uploads/vehicles/BIKE/motrorcycle/Senaro GN 125 2025.jpeg', 'Available', 3600.0, 2, 'Petrol', 'Manual', 'Senaro GN 125 2025 ready for rent in Badulla.'),
(80, 1, 'WP-BIK-0009', 'Singer Safari 4S 72CC', 'Bike', 'Singer', 'Black', 'http://localhost/WayGo-web/backend/uploads/vehicles/BIKE/motrorcycle/Singer Safari 4S 72CC.webp', 'Available', 3800.0, 2, 'Petrol', 'Manual', 'Singer Safari 4S 72CC ready for rent in Badulla.'),
(81, 1, 'WP-BIK-0003', 'Honda Hornet Special Edition', 'Bike', 'Honda', 'Black', 'http://localhost/WayGo-web/backend/uploads/vehicles/BIKE/motrorcycle/honda_hornet-special-edition.jpeg', 'Available', 3200.0, 2, 'Petrol', 'Manual', 'Honda Hornet Special Edition ready for rent in Badulla.'),
(82, 1, 'WP-BIK-0006', 'Pulsar Ns400z', 'Bike', 'Bajaj', 'Red', 'http://localhost/WayGo-web/backend/uploads/vehicles/BIKE/motrorcycle/pulsar-ns400z.jpeg', 'Available', 4800.0, 2, 'Petrol', 'Manual', 'Pulsar Ns400z ready for rent in Badulla.'),
(83, 1, 'WP-BIK-0005', 'Pulsar Ns 400 Z', 'Bike', 'Bajaj', 'Black', 'http://localhost/WayGo-web/backend/uploads/vehicles/BIKE/motrorcycle/pulsar-ns-400-z.jpeg', 'Available', 3900.0, 2, 'Petrol', 'Manual', 'Pulsar Ns 400 Z ready for rent in Badulla.'),
(84, 1, 'WP-BIK-0010', 'Yamaha Fz V2', 'Bike', 'Yamaha', 'Blue', 'http://localhost/WayGo-web/backend/uploads/vehicles/BIKE/motrorcycle/yamaha-fz-v2.jpeg', 'Available', 4600.0, 2, 'Petrol', 'Manual', 'Yamaha Fz V2 ready for rent in Badulla.'),
(85, 1, 'WP-BIK-0015', 'Yamaha Fascino 110', 'Bike', 'Yamaha', 'Red', 'http://localhost/WayGo-web/backend/uploads/vehicles/BIKE/scooter/Yamaha Fascino 110.jpeg', 'Available', 4200.0, 2, 'Petrol', 'Auto', 'Yamaha Fascino 110 ready for rent in Badulla.'),
(86, 1, 'WP-BIK-0011', 'ERc 80 Electric Bike', 'Bike', 'eRc', 'White', 'http://localhost/WayGo-web/backend/uploads/vehicles/BIKE/scooter/eRc 80 electric bike.jpeg', 'Available', 4700.0, 2, 'Electric', 'Auto', 'ERc 80 Electric Bike ready for rent in Badulla.'),
(87, 1, 'WP-BIK-0012', 'Hero Xoom 110', 'Bike', 'Hero', 'Red', 'http://localhost/WayGo-web/backend/uploads/vehicles/BIKE/scooter/hero-xoom-110.jpg', 'Available', 4800.0, 2, 'Petrol', 'Auto', 'Hero Xoom 110 ready for rent in Badulla.'),
(88, 1, 'WP-BIK-0013', 'Honda AVD 160', 'Bike', 'Honda', 'Yellow', 'http://localhost/WayGo-web/backend/uploads/vehicles/BIKE/scooter/honda_AVD_160.jpeg', 'Available', 2800.0, 2, 'Petrol', 'Auto', 'Honda AVD 160 ready for rent in Badulla.'),
(89, 1, 'WP-BIK-0014', 'Yadea Rs20 Electric Scooter', 'Bike', 'Yadea', 'Silver', 'http://localhost/WayGo-web/backend/uploads/vehicles/BIKE/scooter/yadea-rs20-electric-scooter.jpeg', 'Available', 3600.0, 2, 'Electric', 'Auto', 'Yadea Rs20 Electric Scooter ready for rent in Badulla.'),
(90, 1, 'WP-BIK-0016', 'Yamaha Ray ZR', 'Bike', 'Yamaha', 'Black', 'http://localhost/WayGo-web/backend/uploads/vehicles/BIKE/scooter/yamaha-Ray-ZR.jpeg', 'Available', 3900.0, 2, 'Petrol', 'Auto', 'Yamaha Ray ZR ready for rent in Badulla.'),
(91, 1, 'WP-BIK-0017', 'Honda CRF 250', 'Bike', 'Honda', 'Red', 'http://localhost/WayGo-web/backend/uploads/vehicles/BIKE/trailbike/Honda CRF 250.jpeg', 'Available', 2300.0, 2, 'Petrol', 'Manual', 'Honda CRF 250 ready for rent in Badulla.'),
(92, 1, 'WP-BIK-0018', 'Yamaha Ttr 250', 'Bike', 'Yamaha', 'Blue', 'http://localhost/WayGo-web/backend/uploads/vehicles/BIKE/trailbike/yamaha-ttr-250.webp', 'Available', 3200.0, 2, 'Petrol', 'Manual', 'Yamaha Ttr 250 ready for rent in Badulla.'),
(93, 1, 'WP-BIK-0019', 'Yamaha Wrx 250', 'Bike', 'Yamaha', 'Blue', 'http://localhost/WayGo-web/backend/uploads/vehicles/BIKE/trailbike/yamaha-wrx-250.jpeg', 'Available', 3700.0, 2, 'Petrol', 'Manual', 'Yamaha Wrx 250 ready for rent in Badulla.')
ON DUPLICATE KEY UPDATE `licence_number`=VALUES(`licence_number`), `rental_price_per_day`=VALUES(`rental_price_per_day`), `availability`=VALUES(`availability`);

SET FOREIGN_KEY_CHECKS = 1;