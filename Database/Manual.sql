DROP DATABASE ecomerce;
CREATE DATABASE ecomerce;
USE ecomerce;

CREATE TABLE user(
	id           		INT 	     		AUTO_INCREMENT,
	name    			VARCHAR(100)   		NOT NULL,
	email    			VARCHAR(200)   		UNIQUE NOT NULL,
	pass				VARCHAR(255)		NOT NULL,
	address				VARCHAR(400)		NOT NULL,
	phone		  		VARCHAR(100)   		NOT NULL,
	CONSTRAINT pk_user PRIMARY KEY(id)
);
INSERT INTO user(name, email, pass, address, phone) 
	VALUES('user1', 'user1@GMAIL.COM','$2a$07$FV3mi8L77vJicsjDD8AL9uJs1dymh6Kb6VVoMxUVR4PzOLm2OhO6.','2, TAN AN, CHAU THANH A, TINH HAU GIANG','0372753988');
INSERT INTO user(name, email, pass, address, phone) 
	VALUES('user2', 'user2@GMAIL.COM','$2a$07$/QAbGFbvombziGUKjknN7eEUiwauPou5r67HUhfL7pWg.Db3VxRHy','2, TAN AN, CHAU THANH A, TINH HAU GIANG','0372753989');

CREATE TABLE admin(
	id           		INT 	     		AUTO_INCREMENT,
	name    			VARCHAR(100)   		NOT NULL,
	email    			VARCHAR(200)   		UNIQUE NOT NULL,
	pass				VARCHAR(255)		NOT NULL,
	address				VARCHAR(400)		NOT NULL,
	phone		  		VARCHAR(100)   		NOT NULL,
	CONSTRAINT pk_admin PRIMARY KEY(id)
);
INSERT INTO admin(name, email, pass, address, phone) 
	VALUES('admin1', 'admin1@GMAIL.COM','$2a$07$noIoWpwEGmH72.2Rb6YEu.QvTwZWmnQ4b1zcc1oyiPqB67JIQSvlm','2, TAN AN, CHAU THANH A, TINH HAU GIANG','0372753988');
INSERT INTO admin(name, email, pass, address, phone) 
	VALUES('admin2', 'admin2@GMAIL.COM','$2a$07$7QtPbfOIMGdHiXSgKtoHVO6Ifi6w7bSHCwbJx4ES/B6olCOspOFFa','2, TAN AN, CHAU THANH A, TINH HAU GIANG','0372753989');

CREATE TABLE products(
	id           		INT 	     		AUTO_INCREMENT,
	name    			VARCHAR(100)   		NOT NULL,
	brand    			VARCHAR(100)   		NOT NULL,
	price				INT					NOT NULL,
	image				VARCHAR(200)			NOT NULL,
	description  		VARCHAR(600)   		NOT NULL,
	CONSTRAINT pk_products PRIMARY KEY(id)
);
INSERT INTO products(name, brand, price, image, description) 
	VALUES('IPhone 14 Pro 128GB', 'Apple',1200,'1.png','Hiệu năng hàng đầu thế giới - Apple A16 Bionic xử lí nhanh, ổn định mọi tác vụ
,Camera chuẩn nhiếp ảnh chuyên nghiệp - Camera sau 48MP trang bị nhiều công nghệ chụp đa dạng');
INSERT INTO products(name, brand, price, image, description) 
	VALUES('IPhone 14 Pro Max 128GB', 'Apple',1300,'1.png','Màn hình Dynamic Island - Sự biến mất của màn hình tai thỏ thay thế bằng thiết kế viên thuốc, OLED 6,7 inch, hỗ trợ always-on display,Làm chủ công nghệ nhiếp ảnh - Camera sau 48MP, cảm biến TOF sống động');
INSERT INTO products(name, brand, price, image, description) 
	VALUES('IPhone 14 Pro Max 1TB', 'Apple',1600,'1.png','Màn hình Dynamic Island - Sự biến mất của màn hình tai thỏ thay thế bằng thiết kế viên thuốc, OLED 6,7 inch, hỗ trợ always-on display,Làm chủ công nghệ nhiếp ảnh - Camera sau 48MP, cảm biến TOF sống động');
INSERT INTO products(name, brand, price, image, description) 
	VALUES('IPhone 11 128GB', 'Apple',1070,'2.jpg','Hiệu năng mượt mà, ổn định - Chip A13, RAM 4GB, Bắt trọn khung hình - Camera kép hỗ trợ góc rộng, chế độ Night Mode, Yên tâm sử dụng - Kháng nước, kháng bụi IP68, kính cường lực Gorilla Glass');
INSERT INTO products(name, brand, price, image, description) 
	VALUES('Samsung Galaxy Z Fold4', 'Samsung',1860,'1.jpg','Camera mắt thần bóng đêm cho trải nghiệm chụp ảnh ấn tượng - Camera chính: 50MP , Khai mở trải nghiệm di động linh hoạt biến hóa - Màn hình ngoài 6.2"" cùng màn hình chính 7.6"" độc đáo , Hiệu năng mạnh mẽ đến từ dòng chip cao cấp của Qualcomm - Snapdragon 8 Plus Gen 1');
INSERT INTO products(name, brand, price, image, description) 
	VALUES('Samsung Galaxy Z Flip4 128GB', 'Samsung',980,'3.jpg','Công nghệ màn hình hàng đầu đến từ Samsung - 6.7 inch, tấm nền Dynamic AMOLED 2X, Trang bị camera chất lượng - Bộ đôi camera có cùng độ phân giải 12 MP, chống rung, chụp đêm, Hiệu năng mạnh mẽ đến từ dòng chip cao cấp của Qualcomm - Snapdragon 8+ Gen 1');
INSERT INTO products(name, brand, price, image, description) 
	VALUES('Xiaomi 12T', 'Xiaomi',620,'4.jpg','Làm chủ tốc độ, bứt phá hiệu năng - MediaTek Dimensity 8100-Ultra, RAM 8GB,Năng lượng bất tận, khám phá cả ngày - Dung lượng pin 5000mAh, sạc siêu nhanh HyperCharge 120W,Trải nghiệm siêu chân thực - Màn hình lớn CrystalRes AMOLED cùng hệ thống âm thanh SOUND BY Harman Kardon');
INSERT INTO products(name, brand, price, image, description) 
	VALUES('Samsung Galaxy Note 20 Ultra', 'Samsung',800,'5.jpg','Chụp ảnh chuyên nghiệp - Bộ 3 camera hỗ trợ Zoom xa đến 30X, Ghi chú nhanh chóng, chính xác với bút S- Pen thế hệ mới, Chơi game đỉnh cao - Exynos 990 7nm mạnh mẽ, hiệu năng xử lý vượt trội');


CREATE TABLE carts(
	id           		INT 	     	AUTO_INCREMENT,
	uid					INT				NOT NULL,
	user_name    		VARCHAR(200)   	NOT NULL,
	user_address    	VARCHAR(400)   	NOT NULL,
	user_phone    		VARCHAR(100)   	NOT NULL,
	created_date		VARCHAR(200) 	NOT NULL,
	cart 				LONGTEXT	   	NOT NULL,
	total				INT 			NOT NULL,
	valid				BOOLEAN  		NOT NULL,
	CONSTRAINT fk_cart_uid FOREIGN KEY (uid) REFERENCES user(id),
	CONSTRAINT pk_cart PRIMARY KEY(id)
);
