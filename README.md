# BitByteCode Landing Page

Лендинговая страница команды разработчиков BitByteCode.

## Описание

Статический лендинг на чистом HTML/CSS/JavaScript без зависимостей. Можно открыть напрямую в браузере или развернуть через Nginx.

## Структура проекта

```
hiWork_landing/
├── index.html      # Основная HTML страница
├── styles.css      # Стили CSS
├── script.js       # JavaScript для интерактивности
└── README.md       # Документация
```

## Использование

### Локальный просмотр

Просто откройте `index.html` в браузере:

```bash
# macOS/Linux
open index.html

# Windows
start index.html
```

Или используйте простой HTTP-сервер:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (если установлен)
npx http-server
```

Затем откройте в браузере: `http://localhost:8000`

### Развертывание через Nginx

1. Скопируйте файлы в директорию веб-сервера:
```bash
sudo cp -r * /var/www/bitbytecode/
```

2. Настройте Nginx (пример конфигурации):
```nginx
server {
    listen 80;
    server_name bitbytecode.example.com;
    root /var/www/bitbytecode;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

3. Перезапустите Nginx:
```bash
sudo nginx -t
sudo systemctl restart nginx
```

## Разделы сайта

1. **Главная** - Визитка команды с логотипом и описанием
2. **Стек разработки** - Технологии по категориям (Backend, Frontend, DevOps)
3. **Об участниках** - Карточки участников команды с контактами
4. **Проект Hi.Work** - Описание проекта для T1 холдинга
5. **Контакты** - Контактная информация и местоположение

## Особенности

- ✅ Полностью статический (без сервера)
- ✅ Адаптивный дизайн (мобильные и десктопные устройства)
- ✅ Плавная прокрутка между разделами
- ✅ Фиксированная навигация
- ✅ Современный дизайн с градиентами и анимациями
- ✅ Легко кастомизировать (простой HTML/CSS/JS)

## Кастомизация

Все стили находятся в `styles.css`, логика в `script.js`. Для изменения контента редактируйте `index.html`.
