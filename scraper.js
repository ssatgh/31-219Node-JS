const Parser = require('rss-parser');
const Telegraf = require('telegraf');
const translate = require('google-translate-api');

// Конфигурация RSS-ленты и Telegram-бота
const rssFeedUrl = 'https://www.mediapart.fr/articles/feed'; // подставьте URL своей RSS-ленты
const telegramBotToken = '6889555770:AAH2SQr6NkNiP_0nVmeCgwUOw0B1ESSe6_Y'; // подставьте токен вашего Telegram-бота
const telegramChannelId = '@1002142768610'; // подставьте ID вашего Telegram-канала

// Создаем экземпляр парсера RSS
const parser = new Parser();

// Создаем экземпляр Telegram-бота
const bot = new Telegraf(telegramBotToken);

// Обработчик для получения новых постов из RSS-ленты
const checkNewPosts = async () => {
  try {
    const feed = await parser.parseURL(rssFeedUrl);

    // Инвертируем массив постов, чтобы отправлять новые посты сверху
    const newPosts = feed.items.reverse();

    // Обрабатываем каждый новый пост
    for (const post of newPosts) {
      // Переводим заголовок и содержимое поста
      const { text: translatedTitle } = await translate(post.title, { to: 'ru' });
      const { text: translatedContent } = await translate(post.contentSnippet, { to: 'ru' });
