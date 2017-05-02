CREATE TABLE puppy(
  id SERIAL PRIMARY KEY NOT NULL,
  owner_first VARCHAR(120),
  owner_last VARCHAR(120),
  pet_name VARCHAR(100),
  breed VARCHAR(100),
  color VARCHAR(50),
  check_in TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  check_out TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);

CREATE TABLE puppy_owners(
  pet_id INT REFERENCES puppy(id) ON DELETE CASCADE,
  owner_id INT REFERENCES owners(id) ON DELETE CASCADE
);

CREATE TABLE visits(
  pet_id INT REFERENCES puppy(id) ON DELETE CASCADE,
  date VARCHAR(120)
);

CREATE TABLE owners(
  id SERIAL PRIMARY KEY NOT NULL,
  owner_first VARCHAR(120),
  owner_last VARCHAR(120)
);



INSERT INTO puppy (owner_first, owner_last, pet_name, breed, color) VALUES ('Charlie', 'Garnaas', 'Gizmo', 'Shi-tzu', 'white/tan');
INSERT INTO puppy (owner_first, owner_last, pet_name, breed, color) VALUES ('Alayna', 'Buysse', 'Ember', 'Tabby', 'Calico');
