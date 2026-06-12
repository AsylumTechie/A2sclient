import express from 'express';
import Service from '../models/Service.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { category, featured } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (featured === 'true') filter.isFeatured = true;

    const services = await Service.find(filter).sort({ order: 1, title: 1 });
    res.json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/categories', async (req, res) => {
  try {
    const categories = await Service.distinct('category');
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

const slugAliases = {
  'ecommerce-product-listing': 'ecommerce-account-management',
};

router.get('/:slug', async (req, res) => {
  try {
    const slug = slugAliases[req.params.slug] || req.params.slug;
    const service = await Service.findOne({ slug });
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    res.json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
