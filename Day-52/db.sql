-- request 1: create table users, categories, products, orders, order_items
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
                                     id SERIAL PRIMARY KEY,
                                     full_name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    gender VARCHAR(10),
    date_of_birth DATE,
    country_code VARCHAR(2),
    created_at TIMESTAMP DEFAULT NOW()
    );

DROP TABLE IF EXISTS categories;
CREATE TABLE IF NOT EXISTS categories(
                                         id SERIAL PRIMARY KEY,
                                         category_name VARCHAR(100) UNIQUE,
    parent_category_id INTEGER REFERENCES categories(id)
    );

DROP TABLE IF EXISTS products;
CREATE TABLE IF NOT EXISTS products(
                                       id SERIAL PRIMARY KEY,
                                       product_name VARCHAR(255),
    price DECIMAL(10,2),
    category_id INTEGER REFERENCES categories(id),
    created_at TIMESTAMP DEFAULT NOW()
    );

DROP TABLE IF EXISTS orders;
CREATE TABLE IF NOT EXISTS orders(
                                     id SERIAL PRIMARY KEY,
                                     user_id INTEGER REFERENCES users(id),
    status VARCHAR(20), -- e.g.  'pending', 'completed', 'cancelled'
    created_at TIMESTAMP DEFAULT NOW()
    );

DROP TABLE IF EXISTS order_items;
CREATE TABLE IF NOT EXISTS order_items(
                                          order_id INTEGER REFERENCES orders(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER,
    price_at_purchase DECIMAL(10,2),
    PRIMARY KEY (order_id, product_id)
    );

-- request 2: create random big data
-- 10000 users, 10 categories, 1000 products, 20000 orders, 50000 order_items
-- 2.1 Tạo 10,000 người dùng
INSERT INTO users (full_name, email, gender, date_of_birth, country_code)
SELECT
    'User ' || s,
    'user' || s || '@example.com',
    CASE WHEN random() < 0.5 THEN 'male' ELSE 'female' END,
    '1990-01-01'::date + (random() * 365 * 20)::int,
    (ARRAY['VN', 'US', 'SG', 'JP', 'KR'])[floor(random() * 5 + 1)]
FROM generate_series(1, 10000) s;

-- 2.2 Tạo 10 danh mục sản phẩm
INSERT INTO categories (category_name)
SELECT 'Category ' || s FROM generate_series(1, 10) s;

-- 2.3 Tạo 1,000 sản phẩm
INSERT INTO products (product_name, price, category_id)
SELECT
    'Product ' || s,
    (random() * 1000)::DECIMAL(10, 2),
    floor(random() * 10 + 1)
FROM generate_series(1, 1000) s;

-- 2.4 Tạo 20,000 đơn hàng
INSERT INTO orders (user_id, status, created_at)
SELECT
    floor(random() * 10000 + 1),
    (ARRAY['completed', 'pending', 'cancelled'])[floor(random() * 3 + 1)],
    '2022-01-01'::timestamp + (random() * 730 * 86400) * interval '1 second'
FROM generate_series(1, 20000) s;

-- 2.5 Tạo 50,000 chi tiết đơn hàng
INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase)
SELECT
    floor(random() * 20000 + 1),
    floor(random() * 1000 + 1),
    floor(random() * 5 + 1),
    (random() * 1000)::DECIMAL(10, 2)
FROM generate_series(1, 50000) s
    ON CONFLICT (order_id, product_id) DO NOTHING;

-- request 3: Total revenue statistics by product, only display products with revenue > 500,000
SELECT products.id, products.product_name,
       SUM(quantity * price_at_purchase) AS revenue
FROM products
         JOIN order_items ON products.id = order_items.product_id
GROUP BY products.id, products.product_name
HAVING SUM(quantity * price_at_purchase) > 500000
ORDER BY revenue DESC;

-- request 4: find customers in 'VN' who have placed more than 5 'complete' orders
SELECT users.id, users.full_name, COUNT(*) AS orders_count
FROM users
         JOIN orders ON users.id = orders.user_id
WHERE orders.status = 'completed' AND users.country_code = 'VN'
GROUP BY users.id, users.full_name
HAVING COUNT(*) > 5
ORDER BY orders_count DESC;

-- request 5: count numbers of products in each category, order by categories' name
SELECT categories.id, categories.category_name, COUNT(*) AS products_count
FROM categories
         JOIN products ON categories.id = products.category_id
GROUP BY categories.id, categories.category_name
ORDER BY categories.category_name;

-- request 6: Find products which have never been sold (subquery)
SELECT * FROM products
WHERE id NOT IN (
    SELECT DISTINCT product_id FROM order_items
);

-- request 7: Find the top 10 customers who spent the most in 2024
WITH orders_view AS (
    SELECT orders.id, orders.user_id,
           price_at_purchase * quantity AS order_value
    FROM orders
             JOIN order_items ON orders.id = order_items.order_id
    WHERE orders.status = 'completed' AND EXTRACT(YEAR FROM orders.created_at) = 2024
)
SELECT users.id, users.full_name,
       SUM(order_value) AS total_spent
FROM users
         JOIN orders_view ON users.id = orders_view.user_id
GROUP BY users.id, users.full_name
ORDER BY total_spent DESC
    LIMIT 10;

-- request 8: create indexes including email & country_code from table users
-- query only columns which are in the indexes
CREATE INDEX users_email_country_code_idx ON users (email, country_code);
EXPLAIN ANALYZE
SELECT email, country_code FROM users
WHERE email LIKE 'user1%' AND country_code = 'JP';

-- request 9: create 2 single indexes on gender and country_code
-- create another composite index on (country_code, gender)
-- compare the query to filter by 2 conditions
CREATE INDEX gender_idx ON users (gender);
CREATE INDEX country_code_idx ON users (country_code);
CREATE INDEX country_code_gender_idx ON users(country_code, gender);
EXPLAIN ANALYZE
SELECT * FROM users WHERE gender = 'male' AND country_code = 'VN';

-- request 10: find the order by user_id and status, explain analyze, create a composite index
CREATE INDEX user_id_status_idx ON orders (user_id, status);

EXPLAIN ANALYZE
SELECT * FROM orders WHERE user_id = 10 AND status = 'completed';

-- request 11: create an index on column created_at in table orders
CREATE INDEX orders_created_at_idx ON orders (created_at);

-- filter by time, explain analyze
EXPLAIN ANALYZE
SELECT * FROM orders
WHERE created_at BETWEEN '2023-01-01 00:00:00' AND '2023-01-10 23:59:59';
