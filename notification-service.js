const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// In-memory storage for logs
let logs = [];

// Endpoint to receive notifications from Task Service
app.post('/notify', (req, res) => {
  const { type, message } = req.body;
  const logEntry = {
    id: Date.now(),
    type,
    message,
    timestamp: new Date().toISOString()
  };
  
  logs.push(logEntry);
  console.log(`[EVENT RECEIVED]: ${message}`);
  res.status(200).json({ success: true, log: logEntry });
});

// NEW: Endpoint to view recent logs (Great for demoing!)
app.get('/logs', (req, res) => {
  res.json({ success: true, data: logs });
});

app.listen(4000, () => console.log('Notification Service running on port 4000'));