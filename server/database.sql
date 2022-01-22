CREATE DATABASE tournamence;

CREATE TABLE match(
  match_id SERIAL PRIMARY KEY,
  player_1 VARCHAR(255),
  player_2 VARCHAR(255)
);