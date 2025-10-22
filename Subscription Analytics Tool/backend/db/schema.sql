-- MySQL schema for SubTrack (reference)
CREATE TABLE users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE subscriptions (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NOT NULL,
  name VARCHAR(255) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  frequency VARCHAR(50) NOT NULL,
  currency VARCHAR(10) DEFAULT 'USD',
  platform VARCHAR(100),
  type VARCHAR(50),
  start_date DATE,
  next_payment_date DATE,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE transactions (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  subscription_id INT UNSIGNED NOT NULL,
  date DATE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (subscription_id) REFERENCES subscriptions(id)
);
