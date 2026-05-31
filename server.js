const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const PORT = process.env.PORT || 3000;

// Telegram бот
const BOT_TOKEN = '8771620993:AAHqL47V6g40BoLEwfPdP9CbT9Ba8o0YI3I';
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

app.use(express.json());

// Обработка команды /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, '👋 Добро пожаловать в Powerratt!\n\nДоступные команды:\n/status - статус сервиса\n/help - справка');
});

// Обработка команды /status
bot.onText(/\/status/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `✅ Сервис онлайн\n⏱️ Время: ${new Date().toLocaleString('ru-RU')}`);
});

// Обработка команды /help
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, '📖 Справка:\n/start - начало\n/status - статус\n/help - эта справка');
});

// Обработка всех остальных сообщений
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  if (!msg.text.startsWith('/')) {
    bot.sendMessage(chatId, `Вы написали: ${msg.text}\n\nИспользуйте /help для справки`);
  }
});

// REST API endpoints
app.get('/', (req, res) => {
  res.json({
    message: 'Добро пожаловать в Powerratt!',
    status: 'online',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/status', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Powerratt',
    uptime: process.uptime()
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint не найден' });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
  console.log('Telegram бот активен!');
});

