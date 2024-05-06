CREATE TABLE blog_posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name_circuit VARCHAR(255) NOT NULL,
  country_circuit VARCHAR(255) NOT NULL,
  name_winner VARCHAR(255) NOT NULL,
  team VARCHAR(255) NOT NULL,
  date DATE,
  year INT,
  time_fastest_lap VARCHAR(255), 
  highlights TEXT, 
  image_base64 TEXT
);

CREATE TABLE IF NOT EXISTS users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255)
);