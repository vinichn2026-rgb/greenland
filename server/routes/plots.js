import express from 'express';
import pool from '../db.js';

const router = express.Router();

// ─────────────────────────────────────────────────────────
// GET /api/plots  —  list all plots with their images
// ─────────────────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    // Fetch all plots
    const [plots] = await pool.query(
      'SELECT * FROM plots ORDER BY created_at DESC'
    );

    // Fetch images for every plot in one query
    const [images] = await pool.query(
      'SELECT * FROM plot_images ORDER BY plot_id, sort_order'
    );

    // Build image map keyed by plot_id
    const imgMap = {};
    images.forEach(img => {
      if (!imgMap[img.plot_id]) imgMap[img.plot_id] = [];
      imgMap[img.plot_id].push(img.image_url);
    });

    // Merge images into plots and reshape for the frontend
    const result = plots.map(p => {
      const urls = imgMap[p.id] || [];
      const validUrls = urls.filter(url => url && !url.startsWith('blob:'));

      const getFallbackImage = () => {
        const loc = (p.location || '').toLowerCase();
        if (loc.includes('keelakarai')) return '/images/plot1.png';
        if (loc.includes('rameswaram')) return '/images/plot2.png';
        if (loc.includes('paramakudi')) return '/images/plot3.png';
        if (loc.includes('devipattinam')) return '/images/plot4.png';
        const index = ((p.id - 1) % 4) + 1;
        return `/images/plot${index}.png`;
      };

      const finalImage = validUrls[0] || getFallbackImage();
      const finalImagesList = validUrls.length ? validUrls : [finalImage];

      return {
        id:        p.id,
        title:     p.title,
        location:  p.location,
        price:     p.price,
        priceVal:  p.price_val,
        area:      p.area,
        areaVal:   p.area_val,
        road:      p.road,
        facing:    p.facing,
        tag:       p.tag,
        tagClass:  p.tag_class,
        landType:  p.land_type,
        image:     finalImage,
        images:    finalImagesList,
        features: {
          dtcp:   !!p.feat_dtcp,
          rera:   !!p.feat_rera,
          corner: !!p.feat_corner,
          gated:  !!p.feat_gated,
          road30: !!p.feat_road30,
        },
      };
    });

    res.json(result);
  } catch (err) {
    console.error('GET /api/plots error:', err);
    res.status(500).json({ error: 'Failed to fetch plots' });
  }
});

// ─────────────────────────────────────────────────────────
// GET /api/plots/:id  —  single plot detail
// ─────────────────────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const [[plot]] = await pool.query('SELECT * FROM plots WHERE id = ?', [req.params.id]);
    if (!plot) return res.status(404).json({ error: 'Plot not found' });

    const [images] = await pool.query(
      'SELECT image_url FROM plot_images WHERE plot_id = ? ORDER BY sort_order',
      [plot.id]
    );
    const imageUrls = images.map(i => i.image_url);
    const validUrls = imageUrls.filter(url => url && !url.startsWith('blob:'));

    const getFallbackImage = () => {
      const loc = (plot.location || '').toLowerCase();
      if (loc.includes('keelakarai')) return '/images/plot1.png';
      if (loc.includes('rameswaram')) return '/images/plot2.png';
      if (loc.includes('paramakudi')) return '/images/plot3.png';
      if (loc.includes('devipattinam')) return '/images/plot4.png';
      const index = ((plot.id - 1) % 4) + 1;
      return `/images/plot${index}.png`;
    };

    const finalImage = validUrls[0] || getFallbackImage();
    const finalImagesList = validUrls.length ? validUrls : [finalImage];

    res.json({
      id:       plot.id,
      title:    plot.title,
      location: plot.location,
      price:    plot.price,
      priceVal: plot.price_val,
      area:     plot.area,
      areaVal:  plot.area_val,
      road:     plot.road,
      facing:   plot.facing,
      tag:      plot.tag,
      tagClass: plot.tag_class,
      landType: plot.land_type,
      image:    finalImage,
      images:   finalImagesList,
      features: {
        dtcp:   !!plot.feat_dtcp,
        rera:   !!plot.feat_rera,
        corner: !!plot.feat_corner,
        gated:  !!plot.feat_gated,
        road30: !!plot.feat_road30,
      },
    });
  } catch (err) {
    console.error('GET /api/plots/:id error:', err);
    res.status(500).json({ error: 'Failed to fetch plot' });
  }
});

// ─────────────────────────────────────────────────────────
// POST /api/plots  —  create a new listing
// Body: { title, location, price, priceVal, area, areaVal,
//         road, facing, tag, tagClass, landType,
//         images: [url, ...], features: {...} }
// ─────────────────────────────────────────────────────────
router.post('/', async (req, res) => {
  const {
    title, location, price, priceVal = 0,
    area, areaVal = 0, road, facing, tag, tagClass, landType,
    images = [], features = {}
  } = req.body;

  if (!title || !location || !price || !area) {
    return res.status(400).json({ error: 'title, location, price and area are required' });
  }

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const [result] = await conn.query(
      `INSERT INTO plots
        (title, location, price, price_val, area, area_val, road, facing, tag, tag_class, land_type,
         feat_dtcp, feat_rera, feat_corner, feat_gated, feat_road30)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title, location, price, priceVal,
        area, areaVal, road || '30ft Road',
        facing || 'East Facing', tag || 'DTCP Approved',
        tagClass || 'approved', landType || 'Residential Plot',
        features.dtcp   ? 1 : 0,
        features.rera   ? 1 : 0,
        features.corner ? 1 : 0,
        features.gated  ? 1 : 0,
        features.road30 ? 1 : 0,
      ]
    );

    const plotId = result.insertId;

    // Insert up to 5 images
    const validImages = (Array.isArray(images) ? images : []).slice(0, 5);
    const filteredImages = validImages.filter(url => url && !url.startsWith('blob:'));
    if (filteredImages.length > 0) {
      const imgRows = filteredImages.map((url, i) => [plotId, url, i]);
      await conn.query(
        'INSERT INTO plot_images (plot_id, image_url, sort_order) VALUES ?',
        [imgRows]
      );
    } else {
      // Fallback default image based on location
      const loc = (location || '').toLowerCase();
      let defaultImg = '/images/plot1.png';
      if (loc.includes('keelakarai')) defaultImg = '/images/plot1.png';
      else if (loc.includes('rameswaram')) defaultImg = '/images/plot2.png';
      else if (loc.includes('paramakudi')) defaultImg = '/images/plot3.png';
      else if (loc.includes('devipattinam')) defaultImg = '/images/plot4.png';
      else {
        const index = ((plotId - 1) % 4) + 1;
        defaultImg = `/images/plot${index}.png`;
      }
      await conn.query(
        'INSERT INTO plot_images (plot_id, image_url, sort_order) VALUES (?, ?, ?)',
        [plotId, defaultImg, 0]
      );
    }

    await conn.commit();
    res.status(201).json({ id: plotId, message: 'Plot created successfully' });
  } catch (err) {
    await conn.rollback();
    console.error('POST /api/plots error:', err);
    res.status(500).json({ error: 'Failed to create plot' });
  } finally {
    conn.release();
  }
});

export default router;
