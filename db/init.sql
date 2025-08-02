CREATE TABLE IF NOT EXISTS flight_booking (
    id SERIAL PRIMARY KEY,
    flight_name VARCHAR(100) NOT NULL,
    destination VARCHAR(100) NOT NULL
);
