# Инструкции для запуска проекта

## Запуск docker-контейнеров

1. Перейти в корневую папку проекта и запустить файл start-dev.sh

   - `./start-dev.sh`

2. После старта контейнеров, клиент будет доступен в браузере по адресу [http://localhost:5000](http://localhost:5000)

3. При необходимости сменить БД Чатов с Mongo на Postgres
   или наоборот измените значение константы CHAT_CONTROLLER
   в файле server/src/constants.js, возможные значения:
   - 'chatController' - работа с БД MongoDB;
   - 'pgChatController' - работа с БД PostgresSQL;
4. При необходимости мигрировать данные Чата с Mongo на Postgres,
   удалите запись о выполнении сида из БД и запустите сидер:
   - DELETE FROM "SequelizeData" WHERE name='chat-data-migration-from-mongo.js'
   - sequelize db:seed --seed /server/src/seeders/chat-data-migration-from-mongo.js
     или
   - sequelize db:seed:all

## Примечания

- При работе приложения в dev-режиме понадобятся данные тестовых банковских карт:

  - для оплаты работы с карты buyer`а при создании контеста:

    - Card number: 4111111111111111
    - Expires end: 09/24
    - cvc/cvv: 505

  - для вывода средств на карту creator`а:

    - Card number: 4564654564564564
    - Expires end: 11/24
    - cvc/cvv: 453

  - для вывода средств на карту creator`а также предусмотрена возможность
    ввода любой валидной карты, на которую он желает вывести деньги

###

- Данные пользователей:

  - для роли buyer или creative необходимо пройти регистрацию:
  - для роли moderator создан пользователь:
    - email: moderator@gmail.com
    - password: moderator@gmail.com
