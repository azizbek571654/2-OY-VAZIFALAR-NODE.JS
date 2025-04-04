CREATE TABLE Telefonlar (
    telefon_id INT PRIMARY KEY,
    model VARCHAR(100),
    narxi FLOAT,
    ishlab_chiqaruvchi VARCHAR(50),
    xotira INT
);

CREATE TABLE Mijozlar (
    mijoz_id INT PRIMARY KEY,
    ism VARCHAR(50),
    familiya VARCHAR(50),
    telefon VARCHAR(15) UNIQUE NOT NULL
);

CREATE TABLE Xodimlar (
    xodim_id INT PRIMARY KEY,
    ism VARCHAR(50),
    familiya VARCHAR(50),
    lavozimi VARCHAR(50)
);

CREATE TABLE Sotuvlar (
    sotuv_id INT PRIMARY KEY,
    telefon_id INT,
    mijoz_id INT,
    xodim_id INT,
    sotuv_sanasi TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    miqdori INT,
    umumiy_narx FLOAT,
    FOREIGN KEY (telefon_id) REFERENCES Telefonlar (telefon_id),
    FOREIGN KEY (mijoz_id) REFERENCES Mijozlar (mijoz_id),
    FOREIGN KEY (xodim_id) REFERENCES Xodimlar (xodim_id)
);

INSERT INTO Telefonlar (telefon_id,model,narxi,ishlab_chiqaruvchi,xotira)
VALUES (1,'Galaxy S23',799.99,'Samsung',128),
    (2,'iPhone 14',999.99,'Apple',128),
    (3,'Mi 13',649.99,'Xiaomi',256),
    (4,'OnePlus 11',799.00,'OnePlus',128),
    (5,'Pixel 7',599.00,'Google',128),
    (6,'Galaxy Z Flip 4',999.99,'Samsung',256),
    (7,'iPhone 13 Pro',999.99,'Apple',256),
    (8,'Redmi Note 11',249.99,'Xiaomi',64),
    (9,'Oppo Find X5 Pro',1099.00,'Oppo',256),
    (10,'Sony Xperia 1 IV',1399.99,'Sony',256),
    (11,'iPhone SE 3',429.99,'Apple',64),
    (12,'Nokia G50',199.99,'Nokia',64),
    (13,'Realme GT 2 Pro',749.00,'Realme',256),
    (14,'Vivo X80',799.99,'Vivo',256),
    (15,'Asus ROG Phone 6',999.00,'Asus',512),
    (16,'Huawei P50 Pro',1199.00,'Huawei',256),
    (17,'Motorola Edge 30 Pro',799.00,'Motorola',256),
    (18,'Poco F4',349.99,'Poco',128),
    (19,'Xiaomi 12 Pro',999.00,'Xiaomi',256),
    (20,'Samsung Galaxy A54',449.99,'Samsung',128),
    (21,'iPhone 12',799.00,'Apple',128),
    (22,'OnePlus Nord 2T',399.00,'OnePlus',128),
    (23,'Realme 9 Pro+',379.00,'Realme',128),
    (24,'Oppo Reno 8 Pro',899.00,'Oppo',256),
    (25,'Xiaomi Mi 11 Ultra',999.99,'Xiaomi',256),
    (26,'Google Pixel 6',599.00,'Google',128),
    (27,'iPhone 13 Mini',699.99,'Apple',128),
    (28,'Samsung Galaxy A73',549.99,'Samsung',128),
    (29,'Vivo V23 5G',499.00,'Vivo',128),
    (30,'OnePlus 9 Pro',1069.00,'OnePlus',256),
    (31,'Honor Magic 4 Pro',1099.00,'Honor',256),
    (32,'Nokia X100',249.99,'Nokia',128),
    (33,'Redmi Note 10 Pro',299.00,'Xiaomi',128),
    (34,'Realme GT',499.00,'Realme',128),
    (35,'Oppo A94',279.99,'Oppo',128),
    (36,'Asus Zenfone 9',699.00,'Asus',128),
    (37,'Motorola Moto G Power',179.99,'Motorola',64),
    (38,'Huawei Mate 50 Pro',1199.99,'Huawei',256),
    (39,'Poco X4 Pro',299.99,'Poco',128),
    (40,'iPhone 11',699.99,'Apple',64),
    (41,'OnePlus 10 Pro',899.00,'OnePlus',256),
    (42,'Google Pixel 6 Pro',899.00,'Google',128),
    (43,'Xiaomi 11T Pro',749.00,'Xiaomi',128),
    (44,'Samsung Galaxy S22',799.00,'Samsung',128),
    (45,'Redmi K40 Pro',499.99,'Xiaomi',256),
    (46,'Nokia 8.3 5G',599.00,'Nokia',128),
    (47,'iPhone 14 Pro Max',1099.00,'Apple',256),
    (48,'Oppo A54',229.99,'Oppo',64),
    (49,'Motorola Edge 20 Pro',699.00,'Motorola',256),
    (50,'Realme Narzo 50 Pro',229.00,'Realme',128);

INSERT INTO Mijozlar (mijoz_id,ism,familiya,telefon)
VALUES (1,'Ali','Toshpulatov','998901234567'),
    (2,'Dilorom','Sharipova','998901234568'),
    (3,'Bekzod','Xolmatov','998901234569'),
    (4,'Zarina','Mahmudova','998901234570'),
    (5,'Javlon','Ergashev','998901234571'),
    (6,'Munisa','Raximova','998901234572'),
    (7,'Anvar','Jalilov','998901234573'),
    (8,'Shahlo','Islomova','998901234574'),
    (9,'Sardor','Qodirov','998901234575'),
    (10,'Oybarchin','Abdullayeva','998901234576'),
    (11,'Nodir','Saidov','998901234577'),
    (12,'Zohra','Kamilova','998901234578'),
    (13,'Samiya','Jumaniyozova','998901234579'),
    (14,'Sherzod','Yuldashev','998901234580'),
    (15,'Shokhida','Rahmatova','998901234581'),
    (16,'Azizbek','Fayzullayev','998901234582'),
    (17,'Mukhammad','Sharafov','998901234583'),
    (18,'Shokhrukh','Valiyev','998901234584'),
    (19,'Farrukh','Salimov','998901234585'),
    (20,'Maftuna','Maxmudova','998901234586'),
    (21,'Dilshod','Jabborov','998901234587'),
    (22,'Nilufar','Baxramova','998901234588'),
    (23,'Otabek','Ravshanov','998901234589'),
    (24,'Kamola','Sayfutdinova','998901234590'),
    (25,'Rustam','Ismoilov','998901234591'),
    (26,'Maro','Sirojova','998901234592'),
    (27,'Bunyod','Sodiqov','998901234593'),
    (28,'Kamron','Nazarov','998901234594'),
    (29,'Gulbahor','Tursunova','998901234595'),
    (30,'Javohir','Mustafayev','998901234596'),
    (31,'Munira','Seyidova','998901234597'),
    (32,'Turob','Tursunov','998901234598'),
    (33,'Suhrob','Rasulov','998901234599'),
    (34,'Dilorom','Juraeva','998901234600'),
    (35,'Abdugani','Shamsiev','998901234601'),
    (36,'Lola','Zaynova','998901234602'),
    (37,'Ravshan','Tajiev','998901234603'),
    (38,'Yulduz','Khakimova','998901234604'),
    (39,'Aziza','Samatova','998901234605'),
    (40,'Zaynab','Ahmadova','998901234606');

INSERT INTO Xodimlar (xodim_id,ism,familiya,lavozimi)
VALUES (1,'Aziz','Shukurov','Direktor'),
    (2,'Gulnoza','Xudoyberganova','Hisobchi'),
    (3,'Shukur','Murodov','Marketing mutaxassisi'),
    (4,'Ravshan','Khamidov','Menejer'),
    (5,'Sardor','Soliyev','Dizayner');

INSERT INTO
    Sotuvlar (sotuv_id,telefon_id,mijoz_id,xodim_id,sotuv_sanasi,miqdori,umumiy_narx)
VALUES (1,1,2,3,'2025-04-02 10:15:00',2,1599.98),
    (2,3,5,1,'2025-04-02 11:00:00',1,649.99),
    (3,4,7,2,'2025-04-02 12:30:00',3,2397.00),
    (4,6,9,4,'2025-04-02 14:00:00',1,999.99),
    (5,2,4,5,'2025-04-02 15:30:00',1,999.99),
    (6,7,10,3,'2025-04-02 16:00:00',2,1999.98),
    (7,5,11,3,'2025-04-02 16:45:00',2,1198.00),
    (8,8,12,4,'2025-04-02 17:15:00',1,249.99),
    (9,10,13,2,'2025-04-02 18:00:00',1,799.00),
    (10,9,14,5,'2025-04-02 18:30:00',2,1398.00),
    (11,12,15,1,'2025-04-02 19:00:00',1,599.99),
    (12,13,16,3,'2025-04-02 19:30:00',1,2499.00),
    (13,14,17,4,'2025-04-02 20:00:00',3,3197.00),
    (14,16,18,5,'2025-04-02 20:30:00',1,1199.00),
    (15,15,19,1,'2025-04-02 21:00:00',2,649.99),
    (16,11,20,3,'2025-04-02 21:30:00',1,799.00),
    (17,17,21,2,'2025-04-02 22:00:00',3,1199.00),
    (18,19,22,4,'2025-04-02 22:30:00',1,499.99),
    (19,20,23,5,'2025-04-02 23:00:00',2,399.00),
    (20,21,24,1,'2025-04-02 23:30:00',1,999.00),
    (21,22,25,2,'2025-04-03 09:00:00',2,799.99),
    (22,24,26,3,'2025-04-03 09:30:00',2,449.99),
    (23,26,27,4,'2025-04-03 10:00:00',3,999.00),
    (24,23,28,5,'2025-04-03 10:30:00',1,649.99),
    (25,25,29,2,'2025-04-03 11:00:00',1,1999.00),
    (26,28,30,3,'2025-04-03 11:30:00',3,1398.00),
    (27,30,31,4,'2025-04-03 12:00:00',1,1299.00),
    (28,18,32,5,'2025-04-03 12:30:00',2,399.00),
    (29,29,33,3,'2025-04-03 13:00:00',1,249.99),
    (30,27,34,1,'2025-04-03 13:30:00',2,1399.00);

-- Telefonlarni ishlab chiqaruvchilar bo'yicha guruhlab, har bir ishlab chiqaruvchining o'rtacha telefon narxini hisoblang (GROUP BY, AVG).
SELECT ishlab_chiqaruvchi, AVG(narxi) AS ortacha_narx
FROM Telefonlar
GROUP BY ishlab_chiqaruvchi;

-- Xaridorlar tomonidan sotib olingan telefonlar sonini hisoblash, har bir mijoz va uning sotib olgan telefonlari soni ko'rsatiladi (GROUP BY, COUNT):
SELECT mijoz_id, COUNT(telefon_id) AS telefon_soni
FROM Sotuvlar
GROUP BY mijoz_id;

-- Eng ko'p sotuv amalga oshirgan xodim ma'lumotlarini topish (GROUP BY, ORDER BY, LIMIT):
SELECT xodim_id, COUNT(sotuv_id) AS sotuv_soni
FROM Sotuvlar
GROUP BY xodim_id
ORDER BY sotuv_soni DESC
LIMIT 1;

-- Telefon modellarini narxlar bo'yicha saralab, faqatgina 5-10-o'rinlardagi telefonlarni ko'rsatish (OFFSET, LIMIT):
SELECT model, narxi 
FROM Telefonlar 
ORDER BY narxi 
LIMIT 5 OFFSET 4;

-- Har bir ishlab chiqaruvchi uchun o'rtacha telefon narxini hisoblash va eng qimmat va eng arzon telefon modellarini topish (GROUP BY, MIN, MAX, AVG):
SELECT ishlab_chiqaruvchi, AVG(narxi) AS ortacha_narx, MIN(narxi) AS eng_arzon, MAX(narxi) AS eng_qimmat
FROM Telefonlar
GROUP BY ishlab_chiqaruvchi;

-- Ishlab chiqaruvchilar bo'yicha eng ko'p xotiraga ega telefon modellarini topish (GROUP BY, MAX):

SELECT ishlab_chiqaruvchi, MAX(xotira) AS eng_kop_xotira
FROM Telefonlar
GROUP BY ishlab_chiqaruvchi;

-- Telefonlarni sotuv guruhlab, sotilgan telefonlarning o'rtacha narxini hisoblash va eng ko'p sotilgan telefon modellarini ko'rsatish (GROUP BY, ORDER BY, JOIN):
SELECT T.model, COUNT(S.sotuv_id) AS sotilish_soni, AVG(T.narxi) AS ortacha_narx
FROM Sotuvlar S
JOIN Telefonlar T ON S.telefon_id = T.telefon_id
GROUP BY T.model
ORDER BY sotilish_soni DESC
LIMIT 1;