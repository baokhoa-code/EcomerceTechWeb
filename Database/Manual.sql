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
	description  		VARCHAR(300)   		NOT NULL,
	CONSTRAINT pk_products PRIMARY KEY(id)
);
INSERT INTO products(name, brand, price, image, description) 
	VALUES('CHUOT CO DAY1', 'LOGITECH',1000,'1.jpg','DAY LA MO TA CHUOT CO DAY1');
INSERT INTO products(name, brand, price, image, description) 
	VALUES('CHUOT CO DAY2', 'LOGITECH',2000,'2.jpg','DAY LA MO TA CHUOT CO DAY2');
INSERT INTO products(name, brand, price, image, description) 
	VALUES('CHUOT CO DAY3', 'LOGITECH',3000,'1.jpg','DAY LA MO TA CHUOT CO DAY3');
INSERT INTO products(name, brand, price, image, description) 
	VALUES('CHUOT CO DAY4', 'LOGITECH',4000,'2.jpg','DAY LA MO TA CHUOT CO DAY4');
INSERT INTO products(name, brand, price, image, description) 
	VALUES('CHUOT CO DAY5', 'LOGITECH',5000,'1.jpg','DAY LA MO TA CHUOT CO DAY5');
INSERT INTO products(name, brand, price, image, description) 
	VALUES('CHUOT CO DAY6', 'LOGITECH',6000,'2.jpg','DAY LA MO TA CHUOT CO DAY6');
INSERT INTO products(name, brand, price, image, description) 
	VALUES('CHUOT CO DAY7', 'LOGITECH',7000,'1.jpg','DAY LA MO TA CHUOT CO DAY7');
INSERT INTO products(name, brand, price, image, description) 
	VALUES('CHUOT CO DAY8', 'LOGITECH',8000,'2.jpg','DAY LA MO TA CHUOT CO DAY8');

CREATE TABLE carts(
	id           		INT 	     	AUTO_INCREMENT,
	uid					INT				NOT NULL,
	user_name    		VARCHAR(200)   	NOT NULL,
	user_address    	VARCHAR(400)   	NOT NULL,
	user_phone    		VARCHAR(100)   	NOT NULL,
	created_date		VARCHAR(200) 	NOT NULL,
	cart 				VARCHAR(800)   	NOT NULL,
	total				INT 			NOT NULL,
	valid				BOOLEAN  		NOT NULL,
	CONSTRAINT fk_cart_uid FOREIGN KEY (uid) REFERENCES user(id),
	CONSTRAINT pk_cart PRIMARY KEY(id)
);
INSERT INTO carts(uid, user_name, user_address, user_phone, created_date, cart, total, valid) 
	VALUES(1, 'user1', '2, TAN AN, CHAU THANH A, TINH HAU GIANG', '0372753988',  '11-08-2001', 'This is carts1',110000, TRUE);
INSERT INTO carts(uid, user_name, user_address, user_phone, created_date, cart, total, valid) 
	VALUES(1, 'user1', '2, TAN AN, CHAU THANH A, TINH HAU GIANG', '0372753988',  '11-08-2001', 'This is carts2',220000, TRUE);
INSERT INTO carts(uid, user_name, user_address, user_phone, created_date, cart, total, valid) 
	VALUES(2, 'user2', '2, TAN AN, CHAU THANH A, TINH HAU GIANG', '0372753988',  '12-08-2001', 'This is carts1',120000, TRUE);
INSERT INTO carts(uid, user_name, user_address, user_phone, created_date, cart, total, valid) 
	VALUES(2, 'user2', '2, TAN AN, CHAU THANH A, TINH HAU GIANG', '0372753988',  '12-08-2001', 'This is carts2',220000, TRUE);