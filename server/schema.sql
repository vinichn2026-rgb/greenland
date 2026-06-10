-- ============================================================
--  Greenland Real Estate — MySQL Database Schema
-- ============================================================

CREATE DATABASE IF NOT EXISTS greenland_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE greenland_db;

-- --------------------------------------------------------
-- Table: plots
-- Stores all property / land listings
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS plots (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  title        VARCHAR(255)  NOT NULL,
  location     VARCHAR(255)  NOT NULL,
  price        VARCHAR(100)  NOT NULL,
  price_val    BIGINT        NOT NULL DEFAULT 0,
  area         VARCHAR(100)  NOT NULL,
  area_val     INT           NOT NULL DEFAULT 0,
  road         VARCHAR(100)  NOT NULL DEFAULT '30ft Road',
  facing       VARCHAR(100)  NOT NULL DEFAULT 'East Facing',
  tag          VARCHAR(100)  NOT NULL DEFAULT 'DTCP Approved',
  tag_class    VARCHAR(50)   NOT NULL DEFAULT 'approved',
  land_type    VARCHAR(100)  NOT NULL DEFAULT 'Residential Plot',
  feat_dtcp    TINYINT(1)    NOT NULL DEFAULT 0,
  feat_rera    TINYINT(1)    NOT NULL DEFAULT 0,
  feat_corner  TINYINT(1)    NOT NULL DEFAULT 0,
  feat_gated   TINYINT(1)    NOT NULL DEFAULT 0,
  feat_road30  TINYINT(1)    NOT NULL DEFAULT 0,
  created_at   DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- --------------------------------------------------------
-- Table: plot_images
-- One-to-many images per plot (max 5 enforced in app layer)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS plot_images (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  plot_id    INT          NOT NULL,
  image_url  VARCHAR(500) NOT NULL,
  sort_order INT          NOT NULL DEFAULT 0,
  CONSTRAINT fk_plot FOREIGN KEY (plot_id) REFERENCES plots(id) ON DELETE CASCADE
);

-- --------------------------------------------------------
-- Table: users
-- Registered user accounts
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(150)  NOT NULL,
  email         VARCHAR(255)  NOT NULL UNIQUE,
  password_hash VARCHAR(255)  NOT NULL,
  created_at    DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- --------------------------------------------------------
-- Table: contacts
-- Contact form submissions
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS contacts (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(150)  NOT NULL,
  email      VARCHAR(255)  NOT NULL,
  mobile     VARCHAR(20)   NOT NULL,
  subject    VARCHAR(255)  NOT NULL,
  message    TEXT          NOT NULL,
  created_at DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- --------------------------------------------------------
-- Seed Data: initial 4 property listings
-- --------------------------------------------------------
INSERT INTO plots
  (title, location, price, price_val, area, area_val, road, facing, tag, tag_class, land_type, feat_dtcp, feat_rera, feat_corner, feat_gated, feat_road30)
VALUES
  ('1200 Sq.ft Plot', 'Keelakarai, Ramnad',   '₹ 18,00,000', 1800000, '1200', 1200, '30ft Road', 'East Facing',  'DTCP Approved',   'approved', 'Residential Plot', 1, 0, 0, 0, 1),
  ('2400 Sq.ft Plot', 'Rameswaram, Ramnad',   '₹ 32,00,000', 3200000, '2400', 2400, '24ft Road', 'North Facing', 'Corner Plot',     'corner',   'Residential Plot', 1, 0, 1, 0, 0),
  ('1500 Sq.ft Plot', 'Paramakudi, Ramnad',   '₹ 22,50,000', 2250000, '1500', 1500, '30ft Road', 'East Facing',  'Premium Location', 'premium',  'Residential Plot', 1, 1, 0, 1, 1),
  ('2000 Sq.ft Plot', 'Devipattinam, Ramnad', '₹ 28,50,000', 2850000, '2000', 2000, '24ft Road', 'North Facing', 'Hot Deal',        'hot',      'Residential Plot', 1, 0, 0, 0, 0);

-- Seed images for each plot (uses static public paths)
INSERT INTO plot_images (plot_id, image_url, sort_order) VALUES
  (1, '/images/plot1.png', 0),
  (2, '/images/plot2.png', 0),
  (3, '/images/plot3.png', 0),
  (4, '/images/plot4.png', 0);
