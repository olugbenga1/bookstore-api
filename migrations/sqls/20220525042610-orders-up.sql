CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    order_status VARCHAR(64) NOT NULL,
    userId bigint REFERENCES users(id) NOT NULL
);