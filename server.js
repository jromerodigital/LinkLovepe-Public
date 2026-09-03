import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Endpoint para entregar configuración en runtime (Railway env variables)
app.get('/api/config', (req, res) => {
  res.json({
    geminiApiKey: process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || ''
  });
});

app.use(express.static(__dirname, {
  maxAge: '1d',
  index: 'index.html'
}));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`LinkLove server running on port ${PORT}`);
});
