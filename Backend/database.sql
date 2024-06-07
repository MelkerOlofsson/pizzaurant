Denna filen finns endast till för att hålla koll på mina tabeller.

CREATE TABLE foods (
  id serial PRIMARY KEY,
  menu_name TEXT NOT NULL UNIQUE CHECK (length(menu_name) > 0),
  price INTEGER NOT NULL,
  vegetarian INTEGER NOT NULL DEFAULT 0 CHECK (vegetarian IN (0, 1)),
  vegan INTEGER NOT NULL DEFAULT 0 CHECK (vegan IN (0, 1)),
  gluten_free INTEGER NOT NULL DEFAULT 0 CHECK (gluten_free IN (0, 1))
);

INSERT INTO foods (menu_name, price, vegetarian, vegan, gluten_free) VALUES ('salladspizza', 121, 1, 1, 1);

CREATE TABLE drinks (
  id serial PRIMARY KEY,
  drink_name TEXT NOT NULL UNIQUE CHECK (length(drink_name) > 0),
  price INTEGER NOT NULL,
  alcohol INTEGER NOT NULL CHECK (alcohol IN (0, 1))
);

INSERT INTO drinks (drink_name, price, alcohol) VALUES ('guldkällan', 59, 1);

CREATE TABLE accounts (id serial PRIMARY KEY, email TEXT UNIQUE NOT NULL, password TEXT NOT NULL CHECK(length(password) >= 6), created TEXT NOT NULL DEFAULT CURRENT_DATE);

CREATE TABLE tokens (
  account_id INTEGER,
  token TEXT NOT NULL UNIQUE,
  FOREIGN KEY(account_id) REFERENCES accounts(id)
);

CREATE TABLE orders (
  id serial PRIMARY KEY,
  takeaway INTEGER NOT NULL CHECK (takeaway IN (0,1)),
  table_number INTEGER CHECK (table_number IS NULL OR (table_number IS NOT NULL AND takeaway = 0)),
  customer_id INTEGER,
  FOREIGN KEY (customer_id) REFERENCES accounts(id)
);

CREATE TABLE food_ordered (
  order_id INTEGER,
  food_item INTEGER,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (food_item) REFERENCES foods(id)
);

CREATE TABLE drink_ordered (
  order_id INTEGER,
  drink_item INTEGER,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (drink_item) REFERENCES foods(id)
);
