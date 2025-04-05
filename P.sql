CREATE DATABASE MY_PROJECT;


CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    email VARCHAR(100) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) CHECK (role IN ('customer','admin','manager')) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('active', 'inactive')) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO users (email, username, password, role, status) VALUES
('admin@example.com', 'admin', 'hashedpassword123', 'admin', 'active'),
('user1@example.com', 'john_doe', 'hashedpassword456', 'customer', 'active'),
('user2@example.com', 'jane_doe', 'hashedpassword789', 'customer', 'banned'),
('seller@example.com', 'shop_owner', 'hashedpassword999', 'seller', 'active'),
('support@example.com', 'helpdesk', 'hashedpassword000', 'support', 'active');


