CREATE TABLE books (
    title VARCHAR(100),
    author VARCHAR(100),
    total_pages integer,
    type VARCHAR(50),
    summary VARCHAR(255),
    id SERIAL PRIMARY KEY
);