const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Главная страница
app.get('/', (req, res) => {
  res.json({
    message: 'Добро пожаловать в Powerratt!',
    status: 'online',
    timestamp: new Date().toISOString()
  });
});

// API endpoint
app.get('/api/status', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Powerratt',
    uptime: process.uptime()
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Обработка ошибок 404
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint не найден' });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

