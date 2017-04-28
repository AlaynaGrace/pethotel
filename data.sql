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

INSERT INTO puppy (owner_first, owner_last, pet_name, breed, color) VALUES ('Charlie', 'Garnaas', 'Gizmo', 'Shi-tzu', 'white/tan');
INSERT INTO puppy (owner_first, owner_last, pet_name, breed, color) VALUES ('Alayna', 'Buysse', 'Ember', 'Tabby', 'Calico');
