## Schema

-- drops database if it already exists
DROP DATABASE IF EXISTS burgers_db;
-- creates database called burgers_db
CREATE DATABASE burgers_db;

-- switches to the burgers_db
USE burgers_db;


-- creates a table for 'burgers' that has an id, burger_name, and devoured column
CREATE TABLE burgers(
  id INT NOT NULL AUTO_INCREMENT,
  burger_name VARCHAR(255),
  devoured BOOLEAN,
  PRIMARY KEY (id)
);

SELECT * FROM burgers;