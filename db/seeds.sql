-- \c dnd_auth_db

-- DROP TABLE IF EXISTS users CASCADE;
-- DROP TABLE IF EXISTS characters;
-- DROP TABLE IF EXISTS admins;

CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  password_digest VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS characters(
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255),
  race VARCHAR(255),
  class VARCHAR(255),
  ac VARCHAR(2),
  health VARCHAR(3),
  str_mod VARCHAR(4),
  dex_mod VARCHAR(4),
  con_mod VARCHAR(4),
  int_mod VARCHAR(4),
  wis_mod VARCHAR(4),
  cha_mod VARCHAR(4),
  proficiency VARCHAR(5),
  user_id INTEGER REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS admins(
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255),
  password_digest VARCHAR(255) NOT NULL
);

INSERT INTO characters(name, race, class, ac, health, str_mod, dex_mod, con_mod, int_mod, wis_mod, cha_mod, proficiency, user_id) VALUES
('sylvan', 'wood elf', 'monk', '16', '45', '+0', '+4', '+1', '+1', '+2', '-1', '+3', 1),
('ranathar', 'drow', 'rogue', '14', '32', '+1', '+4', '+0', '+1', '-1', '+2', '+3', 2),
('algol', 'wood elf', 'barbarian', '14', '68', '+3', '+2', '+2', '-1', '+1', '+0', '+3', 3),
('yaris', 'human', 'rogue', '14', '38', '+1', '+4', '+0', '+1', '-1', '+2', '+3', 4),
('xerox', 'aasimar', 'bard', '13', '31', '-1', '+0', '+1', '+1', '+3', '+5', '+3', 5)
