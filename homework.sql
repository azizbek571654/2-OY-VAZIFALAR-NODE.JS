CREATE DATABASE vazifa_32_dars

\c vazifa_32_dars


 CREATE TABLE tournaments(
     tournament_id SERIAL PRIMARY KEY,
     tournament_name VARCHAR(30),
     start_date DATE,
     end_date DATE,
     status VARCHAR(20)
 );
INSERT INTO tournaments (tournament_name,start_date,end_date,status)
VALUES ('Champions League','2024-09-01','2025-06-01','ongoing'),
    ('Europa League','2024-10-01','2025-05-15','scheduled'),
    ('World Cup','2026-06-10','2026-07-10','upcoming');



 CREATE TABLE tournament_groups(
    group_id SERIAL PRIMARY KEY,
    group_name VARCHAR(30),
    tournament_id INT REFERENCES tournaments(tournament_id) ON DELETE CASCADE,
    crted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 );
INSERT INTO tournament_groups (group_name, tournament_id)
VALUES ('Group A', 1),
    ('Group B', 1),
    ('Group C', 2),
    ('Group D', 2),
    ('Group E', 3),
    ('Group F', 3);



 CREATE TABLE football_clubs (
    club_id SERIAL PRIMARY KEY,
    club_name VARCHAR(30),
    city VARCHAR(30),
    country VARCHAR(30),
    founded_year INT,
 );
INSERT INTO football_clubs (club_name,city,country,founded_year)
VALUES ('FC Barcelona','Barcelona','Spain',1899),
    ('Manchester United','Manchester','England',1878),
    ('Bayern Munich','Munich','Germany',1900),
    ('Juventus','Turin','Italy',1897),
    ('Real Madrid','Madrid','Spain',1902),
    ('PSG','Paris','France',1970);



CREATE TABLE teams (
    team_id SERIAL PRIMARY KEY,
    team_name VARCHAR(30),
    club_id INT REFERENCES football_clubs(club_id) ON DELETE CASCADE,
    group_id INT REFERENCES tournament_groups(group_id) ON DELETE CASCADE,
    coach_name VARCHAR(30)
);
INSERT INTO teams (team_name,club_id,group_id,coach_name)
VALUES ('Barcelona',1,1,'Xavi Hernandez'),
    ('Man United',2,2,'Erik ten Hag'),
    ('Bayern Munich',3,3,'Thomas Tuchel'),
    ('Juventus',4,4,'Massimiliano Allegri'),
    ('Real Madrid',5,5,'Carlo Ancelotti'),
    ('PSG', 6, 6, 'Luis Enrique');



CREATE TABLE players (
    player_id SERIAL PRIMARY KEY,
    full_name VARCHAR(30),
    date_of_birth DATE,
    team_id INT REFERENCES teams(team_id) ON DELETE CASCADE,
    jersey_number INT
);
INSERT INTO players (full_name,date_of_birth,position,team_id,jersey_number)
VALUES ('Lionel Messi','1987-06-24','Forward',1,10),
    ('Cristiano Ronaldo','1985-02-05','Forward',2,7),
    ('Robert Lewandowski','1988-08-21','Forward',3,9),
    ('Dusan Vlahovic','2000-01-28','Forward',4,9),
    ('Vinicius Jr','2000-07-12','Winger',5,7),
    ('Kylian Mbappe','1998-12-20','Forward',6,10);



CREATE TABLE match_fixtures (
    match_id SERIAL PRIMARY KEY,
    match_date DATE,
    venue VARCHAR(30),
    home_team_id INT REFERENCES teams(team_id) ON DELETE CASCADE,
    away_team_id INT REFERENCES teams(team_id) ON DELETE CASCADE
    home_score INT,
    away_score INT,
    tournament_id INT REFERENCES tournaments(tournament_id)ON DELETE CASCADE,
    match_status VARCHAR(20)
)
INSERT INTO match_fixtures (match_date,venue,home_team_id,away_team_id,home_score,away_score,tournament_id,match_status)
VALUES ('2024-10-10 20:00:00','Camp Nou',1,2,3,2,1,'completed'),
    ('2024-10-12 21:00:00','Old Trafford',2,3,1,1,1,'completed'),
    ('2024-11-05 19:00:00','Allianz Arena',3,4,2,0,2,'scheduled'),
    ('2024-11-15 18:30:00','Juventus Stadium',4,5,NULL,NULL,2,'upcoming'),
    ('2026-06-15 16:00:00','Lusail Stadium',5,6,NULL,NULL,3,'upcoming');