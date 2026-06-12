import dotenv from 'dotenv';
import mongoose from 'mongoose';
import dns from 'dns';
import Service from '../models/Service.js';
import { services } from '../../shared/servicesContent.js';

dotenv.config();
dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Service.deleteMany({});
    await Service.insertMany(services);
    console.log(`Seeded ${services.length} services successfully`);
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error.message);
    process.exit(1);
  }
}

seed();
