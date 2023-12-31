## Web-приложение "Месенджер"

- Vite
- Handlebars
- Typescript
- eslint
- stylelint
- scss

### Макет:
https://www.figma.com/file/jF5fFFzgGOxQeB4CmKWTiE/Chat_external_link?type=design&node-id=0-1&mode=design&t=K2yF4ULfnR0RSR7f-0

### Проект в netlify
https://cerulean-kleicha-704c2b.netlify.app

### Установка и запуск проекта
— Установка стабильной версии:
```
npm i
```

— Сборка:
```
npm run build
```

— Запуск версии для разработчика:
```
npm run dev
```

— Запуск версии на Express (http://localhost:3000):
```
npm run start
```

— предпросмотр:
```
npm run preview
```


## Навигация:
1. Страница "Вход":
  - "Войти" ведет на страницу чатов
  - "Нет аккаунта?"ведет на страницу регистрации

2. Страница "Регистрация":
  - "Зарегистрироваться" ведет на страницу чатов
  - "Войти" ведет на страницу "Вход"

3. Страница "Чаты":
  - "Профиль ведет на страницу профиля

4. Страница "Профиль":
  - "Изменить данные" ведет на страницу редактирования профиля
  - "Изменить пароль" ведет на страницу смены пароля
  - "Выйти" ведет на страницу входа 
  - Кнопка с левой стороны ведет на странцу чатов

## Добавлена маршрутизация

## Добавлено взаимодействие с API:
1. Логин
2. Регистрация
3. Изменение профиля
4. Создание чатов
5. Отправление и получение сообщений в чатах

## Реализовано управление чатом: 
1. Добавление пользователя
2. Удаление пользователя
3. Смена аватара чата
4. Удаление чата
