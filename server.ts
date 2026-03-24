import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from dist folder
app.use(express.static(path.join(__dirname, 'dist')));

// Load version data
const versionDataPath = path.join(__dirname, 'version-data.json');
let versionData: any = {};

try {
  const data = fs.readFileSync(versionDataPath, 'utf-8');
  versionData = JSON.parse(data);
} catch (error) {
  console.error('Failed to load version data:', error);
}

// API Routes

// BoundaryEQ version endpoint
app.get('/api/boundary-eq/version', (req, res) => {
  const boundaryEqData = versionData['boundary-eq'];
  
  if (!boundaryEqData) {
    return res.status(404).json({ error: 'Version data not found' });
  }
  
  res.json(boundaryEqData);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Catch-all route - serve index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api/boundary-eq/version`);
});
