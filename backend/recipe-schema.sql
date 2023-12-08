CREATE TABLE users (
    username VARCHAR(25) PRIMARY KEY,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL
       CHECK (position('@' IN email) > 1),
    is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE recipes (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    url TEXT,
    ingredients TEXT NOT NULL,
    instructions TEXT,
    image TEXT,
    username VARCHAR(25)
      REFERENCES users ON DELETE CASCADE
);

CREATE TABLE favorites (
    username VARCHAR(25)
      REFERENCES users ON DELETE CASCADE,
    recipe_id INTEGER
      REFERENCES recipes ON DELETE CASCADE,
    PRIMARY KEY (username, recipe_id)
);
