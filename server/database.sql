-- CREATE DATABASE
CREATE DATABASE tournamence;

-- CREATE TABLES
CREATE TABLE tournament(
  tour_id SERIAL PRIMARY KEY,
  tour_name VARCHAR(100) NOT NULL
);

CREATE TABLE player(
  p_id SERIAL PRIMARY KEY,
  p_name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE participates_on(
  p_id INTEGER,
  t_id INTEGER,
  p_point INTEGER DEFAULT 0,
  PRIMARY KEY (p_id, t_id),
  CONSTRAINT fk_player
    FOREIGN KEY(p_id) 
	    REFERENCES player(p_id),
  CONSTRAINT fk_tournament
    FOREIGN KEY(t_id) 
	    REFERENCES tournament(tour_id)
);

CREATE TABLE match(
  match_id SERIAL PRIMARY KEY,
  t_id INTEGER NOT NULL,
  p1_id INTEGER NOT NULL,
  p2_id INTEGER NOT NULL,
  score_p1 INTEGER,
  score_p2 INTEGER,
  CONSTRAINT fk_tournament
    FOREIGN KEY(t_id) 
	    REFERENCES tournament(tour_id),
  CONSTRAINT fk_player1
    FOREIGN KEY (p1_id) 
      REFERENCES player(p_id),
  CONSTRAINT fk_player2
    FOREIGN KEY (p2_id) 
      REFERENCES player(p_id)
);

-- INSERT DATAS
INSERT INTO tournament(tour_name) VALUES('eFCS Super League');
INSERT INTO player(p_name) VALUES('Tanlee'), ('Gytzero'), ('Prawnpaste');
INSERT INTO participates_on(p_id, t_id) VALUES(1, 1), (2, 1), (3, 1);
INSERT INTO match(t_id, p1_id, p2_id) VALUES(1, 1, 2), (1, 1, 3), (1, 2, 3);


-- CHEATSHEET:
-- ALTER TABLE distributors ADD COLUMN address varchar(30);
-- ALTER TABLE distributors DROP COLUMN address RESTRICT;
-- ALTER TABLE distributors
--   ALTER COLUMN address TYPE varchar(80),
--   ALTER COLUMN name TYPE varchar(100);
-- DROP TABLE tournament;

-- SELECT t.tournament_name FROM player as p, tournament as t WHERE p.tournament_id = t.tournament_id AND p_id = 1;
-- DELETE FROM tournament WHERE tournament_id = 2;