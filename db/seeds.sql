\c dnd_auth_db

DROP TABLE IF EXISTS spells;
DROP TABLE IF EXISTS characters;

CREATE TABLE characters(
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255),
  race VARCHAR(255),
  class VARCHAR(255),
  str_mod VARCHAR(4),
  dex_mod VARCHAR(4),
  con_mod VARCHAR(4),
  int_mod VARCHAR(4),
  wis_mod VARCHAR(4),
  cha_mod VARCHAR(4),
  proficiency VARCHAR(5)
);

CREATE TABLE spells(
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255),
  effect TEXT,
  character_id INTEGER REFERENCES characters(id)
);

-- TODO: find a way of segmenting what prem sees vs what we see as players

INSERT INTO characters(name, race, class, str_mod, dex_mod, con_mod, int_mod, wis_mod, cha_mod, proficiency) VALUES(
  'sylvan', 'wood elf', 'monk', '+0', '+4', '+1', '+1', '+2', '-1', '+3'
);

INSERT INTO spells(title, effect, character_id) VALUES(
  'ORAORAORAORA aka Flurry of Blows', 'On a successful attack, spend a ki point to make two extra attacks', 1
)
