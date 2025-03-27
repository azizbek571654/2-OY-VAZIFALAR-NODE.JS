CREATE DATABASE vazifa_31_dars;

CREATE TABLE users (
    id VARCHAR PRIMARY KEY,
    first_name VARCHAR,
    last_name VARCHAR,
    email VARCHAR UNIQUE,
    password VARCHAR,
    phone_number VARCHAR,
    address VARCHAR
);

CREATE TABLE posts (
    id VARCHAR PRIMARY KEY,
    title VARCHAR,
    content TEXT,
    slug VARCHAR UNIQUE,
    user_id VARCHAR,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE comments (
    id VARCHAR PRIMARY KEY,
    content TEXT,
    post_id VARCHAR,
    user_id VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


INSERT INTO users (id,first_name,last_name,email,password,phone_number,address)
VALUES ('1','Ali','Valiyev','ali@example.com','pass123','998901234567','Tashkent'),
    ('2','Olim','Karimov','olim@example.com','secure456','998902345678','Samarkand'),
    ('3','Zuhra','Nazarova','zuhra@example.com','zuhra789','998903456789','Bukhara'),
    ('4','Anvar','Rasulov','anvar@example.com','anvar000','998904567890','Andijan'),
    ('5','Madina','Xasanova','madina@example.com','madina999','998905678901','Namangan');

INSERT INTO posts (id,title,content,slug,user_id)
VALUES ('101','Dasturlashning Asoslari','Dasturlashga yangi boshlovchilar uchun qo‘llanma.','dasturlash-asoslari','1'),
    ('102','SQL bo‘yicha maslahatlar','SQL so‘rovlarini samarali yozish bo‘yicha maslahatlar.','sql-maslahatlar','2'),
    ('103','Python o‘rganish','Python dasturlash tili bo‘yicha boshlang‘ich kurs.','python-o-rganish','3'),
    ('104','Sun’iy intellekt nima?','AI haqida batafsil tushuncha.','suniy-intellekt','4'),
    ('105','Web dasturlash','Frontend va Backend haqida ma’lumot.','web-dasturlash','5');

INSERT INTO comments (id,content,post_id,user_id,created_at)
VALUES ('1001','Juda foydali maqola!','101','2','2024-03-27 10:00:00'),
    ('1002','Men SQL haqida ko‘proq bilishni xohlayman.','102','3','2024-03-27 10:15:00'),
    ('1003','Pythonning qaysi framework-lari yaxshi?','103','4','2024-03-27 10:30:00'),
    ('1004','AI kelajagi haqida nima deb o‘ylaysiz?','104','5','2024-03-27 10:45:00'),
    ('1005','Web dasturlashni qayerdan boshlash kerak?','105','1','2024-03-27 11:00:00'),
    ('1006','Dasturlashni o‘rganish qiyinmi?','101','3','2024-03-27 11:15:00'),
    ('1007','SQL ni amaliyotda ishlatish haqida yozing.','102','1','2024-03-27 11:30:00'),
    ('1008','Pythonda qanday loyihalar qilish mumkin?','103','2','2024-03-27 11:45:00'),
    ('1009','AI inson hayotini o‘zgartiradimi?','104','3','2024-03-27 12:00:00'),
    ('1010','Frontend va Backend farqi nimada?','105','4','2024-03-27 12:15:00');




