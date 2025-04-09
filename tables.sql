CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    email VARCHAR(100) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) CHECK (role IN ('customer','admin','manager')) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('active', 'inactive', 'banned', 'suspended')) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone_number VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INTEGER NOT NULL,
    category VARCHAR(100),
    status VARCHAR(20) CHECK (status IN ('available','out of stock','discontinued')) DEFAULT 'available',
    image_urls TEXT [],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    customer_id UUID REFERENCES customers (id) ON DELETE CASCADE,
    total_price DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('pending','confirmed','shipped','delivered','canceled')) DEFAULT 'pending',
    shipping_address TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE order_items (
    order_id UUID REFERENCES orders (id) ON DELETE CASCADE,
    product_id UUID REFERENCES products (id),
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (order_id, product_id)
);



CREATE TABLE shipments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    order_id UUID REFERENCES orders (id) ON DELETE CASCADE,
    status VARCHAR(20) CHECK (status IN ('pending','in transit','delivered','failed')) DEFAULT 'pending',
    tracking_number VARCHAR(100),
    estimated_delivery DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

INSERT INTO users (email, username, password, role, status) VALUES 
('admin@example.com', 'admin_user', 'hashedpassword123', 'admin', 'active'),
('customer1@example.com', 'customer_one', 'hashedpassword456', 'customer', 'active'),
('customer2@example.com', 'customer_two', 'hashedpassword789', 'customer', 'banned'),
('manager@example.com', 'manager_user', 'hashedpassword999', 'manager', 'inactive'),
('support@example.com', 'support_team', 'hashedpassword000', 'manager', 'suspended');


INSERT INTO customers (first_name, last_name, email, phone_number, address) VALUES
('John', 'Doe', 'john.doe@example.com', '+998901234567', '123 Main St, Tashkent, Uzbekistan'),
('Jane', 'Smith', 'jane.smith@example.com', '+998931234567', '45 Elm St, Samarkand, Uzbekistan'),
('Alice', 'Johnson', 'alice.johnson@example.com', NULL, '78 Oak St, Bukhara, Uzbekistan'),
('Bob', 'Brown', 'bob.brown@example.com', '+998977654321', NULL),
('Charlie', 'Williams', 'charlie.williams@example.com', '+998951112233', '99 Pine St, Andijan, Uzbekistan');


INSERT INTO products (name, description, price, stock, category, status, image_urls) VALUES
('iPhone 15', 'Latest Apple iPhone with A16 chip', 999.99, 50, 'Smartphones', 'available', ARRAY['https://example.com/iphone15.jpg']),
('Samsung Galaxy S23', 'Flagship Samsung phone with Snapdragon 8 Gen 2', 899.99, 30, 'Smartphones', 'available', ARRAY['https://example.com/s23.jpg']),
('MacBook Pro 16"', 'Apple laptop with M3 Pro chip', 2499.99, 15, 'Laptops', 'available', ARRAY['https://example.com/macbook.jpg']),
('Sony WH-1000XM5', 'Noise-canceling headphones', 399.99, 20, 'Accessories', 'out of stock', ARRAY['https://example.com/sonywh1000xm5.jpg']),
('Logitech MX Master 3', 'Ergonomic wireless mouse', 99.99, 10, 'Accessories', 'discontinued', ARRAY['https://example.com/mxmaster3.jpg']);



INSERT INTO orders (customer_id, total_price, status, shipping_address) VALUES
((SELECT id FROM customers WHERE email = 'john.doe@example.com'), 999.99, 'pending', '123 Main St, Tashkent, Uzbekistan'),
((SELECT id FROM customers WHERE email = 'jane.smith@example.com'), 1899.98, 'confirmed', '45 Elm St, Samarkand, Uzbekistan'),
((SELECT id FROM customers WHERE email = 'alice.johnson@example.com'), 2499.99, 'shipped', '78 Oak St, Bukhara, Uzbekistan'),
((SELECT id FROM customers WHERE email = 'bob.brown@example.com'), 399.99, 'delivered', '99 Pine St, Andijan, Uzbekistan'),
((SELECT id FROM customers WHERE email = 'charlie.williams@example.com'), 99.99, 'canceled', 'Unknown');


INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'john.doe@example.com')), 
 (SELECT id FROM products WHERE name = 'iPhone 15'), 1, 999.99),

((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'jane.smith@example.com')), 
 (SELECT id FROM products WHERE name = 'Samsung Galaxy S23'), 2, 1899.98),

((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'alice.johnson@example.com')), 
 (SELECT id FROM products WHERE name = 'MacBook Pro 16"'), 1, 2499.99),

((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'bob.brown@example.com')), 
 (SELECT id FROM products WHERE name = 'Sony WH-1000XM5'), 1, 399.99),

((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'charlie.williams@example.com')), 
 (SELECT id FROM products WHERE name = 'Logitech MX Master 3'), 1, 99.99);



INSERT INTO shipments (order_id, status, tracking_number, estimated_delivery) VALUES
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'john.doe@example.com')), 'pending', 'TRACK123456', '2025-04-10'),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'jane.smith@example.com')), 'in transit', 'TRACK654321', '2025-04-12'),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'alice.johnson@example.com')), 'delivered', 'TRACK789012', '2025-04-08'),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'bob.brown@example.com')), 'delivered', 'TRACK345678', '2025-04-06'),
((SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE email = 'charlie.williams@example.com')), 'failed', 'TRACK987654', '2025-04-15');
