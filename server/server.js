import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import contactRoutes from './routes/contact.js';
import inquiryRoutes from './routes/inquiries.js';
import serviceRoutes from './routes/services.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === 'production';

const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'https://a2secomsolutions.com',
  'https://www.a2secomsolutions.com',
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {












        
        callback(null, true);
      }
    },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'A2S API is running' });
});

app.get('/api/stats', (req, res) => {
  res.json({
    success: true,
    data: {
      projects: 500,
      happyClients: 450,
      clientSatisfaction: 99,
      teamMembers: 50,
    },
  });
});

app.use('/api/contact', contactRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/services', serviceRoutes);

// NOTE:
// - On Render we deploy ONLY the API (no built React app in ../client/dist)
// - The frontend is hosted separately (Vercel/Hostinger)
// Serving static files here causes ENOENT when client/dist is missing.
// If you later co-host the frontend on the same server, re-enable this block.
// if (isProduction) {
//   const clientDist = path.join(__dirname, '../client/dist');
//   app.use(express.static(clientDist));
//   app.get('*', (req, res) => {
//     if (!req.path.startsWith('/api')) {
//       res.sendFile(path.join(clientDist, 'index.html'));
//     }
//   });
// }

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
