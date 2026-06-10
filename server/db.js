import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Create a pool so multiple requests share connections efficiently
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'greenland_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true,   // needed to run the init script in one shot
});

// ── Auto-initialize tables on startup ──────────────────────────────────────
async function initSchema() {
  const conn = await pool.getConnection();
  try {
    // ── plots ──────────────────────────────────────────────────────────────
    await conn.query(`
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
      ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
    `);

    // ── plot_images ────────────────────────────────────────────────────────
    await conn.query(`
      CREATE TABLE IF NOT EXISTS plot_images (
        id         INT AUTO_INCREMENT PRIMARY KEY,
        plot_id    INT          NOT NULL,
        image_url  VARCHAR(500) NOT NULL,
        sort_order INT          NOT NULL DEFAULT 0,
        CONSTRAINT fk_plot FOREIGN KEY (plot_id) REFERENCES plots(id) ON DELETE CASCADE
      ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
    `);

    // ── users ──────────────────────────────────────────────────────────────
    await conn.query(`
      CREATE TABLE IF NOT EXISTS users (
        id            INT AUTO_INCREMENT PRIMARY KEY,
        name          VARCHAR(150)  NOT NULL,
        email         VARCHAR(255)  NOT NULL UNIQUE,
        password_hash VARCHAR(255)  NOT NULL,
        created_at    DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP
      ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
    `);

    // ── contacts ───────────────────────────────────────────────────────────
    await conn.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id         INT AUTO_INCREMENT PRIMARY KEY,
        name       VARCHAR(150)  NOT NULL,
        email      VARCHAR(255)  NOT NULL,
        mobile     VARCHAR(20)   NOT NULL,
        subject    VARCHAR(255)  NOT NULL,
        message    TEXT          NOT NULL,
        created_at DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP
      ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
    `);

    // ── Seed data (only if plots table is empty) ───────────────────────────
    const [[{ cnt }]] = await conn.query('SELECT COUNT(*) AS cnt FROM plots');
    if (cnt === 0) {
      console.log('📦  Seeding initial plot listings...');
      await conn.query(`
        INSERT INTO plots
          (title, location, price, price_val, area, area_val, road, facing, tag, tag_class, land_type,
           feat_dtcp, feat_rera, feat_corner, feat_gated, feat_road30)
        VALUES
          ('1200 Sq.ft Plot','Keelakarai, Ramnad',   '₹ 18,00,000',1800000,'1200',1200,'30ft Road','East Facing', 'DTCP Approved',   'approved','Residential Plot',1,0,0,0,1),
          ('2400 Sq.ft Plot','Rameswaram, Ramnad',   '₹ 32,00,000',3200000,'2400',2400,'24ft Road','North Facing','Corner Plot',     'corner',  'Residential Plot',1,0,1,0,0),
          ('1500 Sq.ft Plot','Paramakudi, Ramnad',   '₹ 22,50,000',2250000,'1500',1500,'30ft Road','East Facing', 'Premium Location','premium', 'Residential Plot',1,1,0,1,1),
          ('2000 Sq.ft Plot','Devipattinam, Ramnad', '₹ 28,50,000',2850000,'2000',2000,'24ft Road','North Facing','Hot Deal',        'hot',     'Residential Plot',1,0,0,0,0)
      `);

      // Seed default images
      const [{ insertId: firstId }] = await conn.query('SELECT LAST_INSERT_ID() AS insertId');
      // Get the 4 inserted IDs
      const [rows] = await conn.query('SELECT id FROM plots ORDER BY created_at ASC LIMIT 4');
      const imgData = rows.map((r, i) => [r.id, `/images/plot${i + 1}.png`, 0]);
      await conn.query(
        'INSERT INTO plot_images (plot_id, image_url, sort_order) VALUES ?',
        [imgData]
      );
      console.log('✅  Seed data inserted (4 plots).');
    }

    // Migration updates for existing database records (replace Chennai references with Ramnad)
    await conn.query("UPDATE plots SET location = 'Keelakarai, Ramnad' WHERE LOWER(location) LIKE '%chennai%'");
    await conn.query("UPDATE plots SET location = 'Paramakudi, Ramnad' WHERE LOWER(location) LIKE '%coimbatore%'");
    await conn.query("UPDATE plots SET location = REPLACE(location, 'Oragadam', 'Keelakarai')");
    await conn.query("UPDATE plots SET location = REPLACE(location, 'Vandalur', 'Rameswaram')");
    await conn.query("UPDATE plots SET location = REPLACE(location, 'Thiruporur', 'Paramakudi')");
    await conn.query("UPDATE plots SET location = REPLACE(location, 'Kelambakkam', 'Devipattinam')");

    console.log('🗄️   All database tables are ready and migrated.');
  } catch (err) {
    console.error('❌  Schema initialization failed:', err.message);
    process.exit(1);
  } finally {
    conn.release();
  }
}

// Quick connectivity check then run schema init
pool.getConnection()
  .then(conn => {
    console.log('✅  MySQL connected to', process.env.DB_NAME || 'greenland_db');
    conn.release();
    return initSchema();   // auto-create tables + seed
  })
  .catch(err => {
    console.error('❌  MySQL connection failed:', err.message);
    console.error('   → Check your .env file: DB_HOST, DB_USER, DB_PASS, DB_NAME');
    process.exit(1);
  });

export default pool;
