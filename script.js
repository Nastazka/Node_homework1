const http = require('http');

const pageViews = {
  '/': 0,
  '/about': 0,
};

function generateHtml(path, pageTitle) {
  const pageViewsCount = pageViews[path]++;
  return `
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pageTitle}</title>
</head>
<body>
  <h1>${pageTitle}</h1>
  <p>Количество просмотров: ${pageViewsCount}</p>
  <a href="${path === '/' ? '/about' : '/'}" >Перейти на ${path === '/' ? 'About' : 'Главную'}</a>
</body>
</html>
`;
}

const server = http.createServer((req, res) => {
    console.log("Запрос получен!");

    if (req.url === '/') {
        res.writeHead(
            200,
            {'Content-Type': 'text/html; charset=UTF-8'},
        );

        res.end(generateHtml('/', 'Главная'));

    } else if (req.url === '/about') {
        res.writeHead(
            200,
            {'Content-Type': 'text/html; charset=UTF-8'},
        );

        res.end(generateHtml('/about', 'About'));
    } else {
        res.writeHead(
            404,
            {'Content-Type': 'text/html; charset=UTF-8'},
        );

        res.end(generateHtml('/404', 'Страница не найдена'));
    }
});

server.listen(3000, () => {
  console.log('Сервер запущен на http://localhost:3000');
});