# whatsapp-api-client library for javascript
* [![build](https://github.com/green-api/whatsapp-api-client/workflows/build_library/badge.svg)](https://github.com/green-api/whatsapp-api-client/actions/workflows/build_library.yml)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/green-api/whatsapp-api-client/blob/master/LICENSE)
[![GitHub release](https://img.shields.io/github/v/release/green-api/whatsapp-api-client.svg)](https://github.com/green-api/whatsapp-api-client/releases)

- [English documentation](README.md)
- [Документация на русском языке](README_RUS.md)

Javascript библиотека для интеграции с мессенджером WhatsAPP через API сервиса [green-api.com](https://green-api.com)ю Чтобы воспользоваться библиотекой нужно получить регистрационный токен и id аккаунта в [личном кабинете](https://console.green-api.com/). Есть бесплатный тариф аккаунта разработчика.

## API

Документация к REST API находится по [ссылке](https://green-api.com/docs/api/). Библиотека является оберткой к REST API, поэтому документация по ссылке выше применима и к самой библиотеке.

## Установка

Билиотека работает как на node >=10, так и на современных версиях браузеров chrome, firefox и др. Для приложений на webpack и npm установка выполняется через команду:
```
npm i @green-api/whatsapp-api-client
```
Для чистого html js сайта либу можно подключить в index.html
``` html
<script type="text/javascript" src="https://unpkg.com/@green-api/whatsapp-api-client/lib/whatsapp-api-client.min.js"></script>
```

## ИМпорт 

Есть несколько способов импортировать библиотеку в проект

Используя классический javascript 
```
const whatsAppClient = require("@green-api/whatsapp-api-client");
```
Используя ES6 javascript 
```
import whatsAppClient from "@green-api/whatsapp-api-client";
```
Используя typescript 
```
import * as whatsAppClient from "@green-api/whatsapp-api-client";
```
Используя браузерный javascript 
```
<script src="https://unpkg.com/@green-api/whatsapp-api-client/lib/whatsapp-api-client.min.js"></script>
```

## Авторизация 

Чтобы отправить сообщение или выполнить другой метод Green-API, аккаунт WhatsApp в приложении телефона должен быть в авторизованном состоянии. Для авторизации аккаунта перейдите в [личный кабинет](https://console.green-api.com/) и сканируйте QR-код с использованием прилоения WhatsApp.

## Примеры

Не испольуйте параметр 'phoneNumber' при вызове методов. Он устарел. Примеры ниже используют параметр 'chatId'

### Отправка сообщения на номер WhatsApp
Используя common js
``` js
const whatsAppClient = require('@green-api/whatsapp-api-client')

const restAPI = whatsAppClient.restAPI(({
    idInstance: YOUR_ID_INSTANCE,
    apiTokenInstance: YOUR_API_TOKEN_INSTANCE
}))

restAPI.message.sendMessage("79999999999@c.us", null, "hello world")
.then((data) => {
    console.log(data);
}) ;

```
или используя js script
``` html
<script src="https://unpkg.com/@green-api/whatsapp-api-client/lib/whatsapp-api-client.min.js"></script>
<script>
    const restAPI = whatsAppClient.restAPI(({
        idInstance: "YOUR_ID_INSTANCE",
        apiTokenInstance: "YOUR_API_TOKEN_INSTANCE"
    }))
    restAPI.message.sendMessage("79999999999@c.us", null, "hello world")
    .then((data) => {
        console.log(data);
    }).catch((reason) =>{
        console.error(reason);
    });
</script>
```
Или можно воспользоваться синтаксисом ES6. Для того, чтобы этот синтаксис сработал в приложении на nodejs, нужно в package.json прописать ключ ``"type": "module"``. Далее все примеры будут на ES6 синтаксисе.

``` js
import whatsAppClient from '@green-api/whatsapp-api-client'

(async () => {
    const restAPI = whatsAppClient.restAPI(({
        idInstance: YOUR_ID_INSTANCE, 
        apiTokenInstance: YOUR_API_TOKEN_INSTANCE
    }))
    const response = await restAPI.message.sendMessage("79999999999@c.us", null, "hello world");
})();
```

### Использование credentials файла для ключей `ID_INSTANCE` или `API_TOKEN_INSTANCE` (только для nodejs)

Вы можете сохранить Ваши авторизационные данные отдельно от кода.. Библиотека позволяет создать  файл с произвольным именем и местом в следующем формате: 
```
API_TOKEN_INSTANCE = "MY_API_TOKEN_INSTANCE"
ID_INSTANCE = "MY_ID_INSTANCE"
```
А затем Вы можете передать ключи как показано в коде ниже:
``` js
const restAPI = whatsAppClient.restAPI(({
    credentialsPath: "examples\\credentials"
}))
```

### Получение уведомления через webhook service REST API

``` js
import whatsAppClient from '@green-api/whatsapp-api-client'

(async () => {

    let restAPI = whatsAppClient.restAPI(({
        idInstance: process.env.ID_INSTANCE,
        apiTokenInstance: process.env.API_TOKEN_INSTANCE
    }))

    try {
        // Receive WhatsApp notifications.
        console.log( "Waiting incoming notifications...")
        await restAPI.webhookService.startReceivingNotifications()
        restAPI.webhookService.onReceivingMessageText((body) => {
            console.log(body)
            restAPI.webhookService.stopReceivingNotifications();
            //console.log("Notifications is about to stop in 20 sec if no messages will be queued...")
        })
        restAPI.webhookService.onReceivingDeviceStatus((body) => {
            console.log(body)
        })
        restAPI.webhookService.onReceivingAccountStatus((body) => {
            console.log(body)
        })
    } catch (ex) {
        console.error(ex.toString())
    }

})();
```

### Отправка файла на номер WhatsApp
``` js
import whatsAppClient from '@green-api/whatsapp-api-client'

(async () => {
    const restAPI = whatsAppClient.restAPI(({
        idInstance: YOUR_ID_INSTANCE,
        apiTokenInstance: YOUR_API_TOKEN_INSTANCE
    }))
    const response = await restAPI.file.sendFileByUrl("79999999999@c.us", null, 'https://avatars.mds.yandex.net/get-pdb/477388/77f64197-87d2-42cf-9305-14f49c65f1da/s375', 'horse.png', 'horse');
})();
```

### Пример использования вебхука

Вебхуки работают только в node js с на базе express

``` js
import whatsAppClient from '@green-api/whatsapp-api-client'
import express from "express";
import bodyParser from 'body-parser';

(async () => {
    try {

        // Устанавливаем http url ссылку, куда будут отправляться вебхуки. 
        // Ссылка должна иметь публичный адрес.
        await restAPI.settings.setSettings({
            webhookUrl: 'MY_HTTP_SERVER:3000/webhooks'
        });

        const app = express();
        app.use(bodyParser.json());
        const webHookAPI = whatsAppClient.webhookAPI(app, '/webhooks')

        // Подписываемся на событие вебхука при получении сообщения
        webHookAPI.onIncomingMessageText((data, idInstance, idMessage, sender, typeMessage, textMessage) => {
            console.log(`outgoingMessageStatus data ${data.toString()}`)
        });

        // Запускаем веб сервер, имеющий публичный адрес
        app.listen(3000, async () => {
            console.log(`Started. App listening on port 3000!`)

            const restAPI = whatsAppClient.restAPI(({
                idInstance: MY_ID_INSTANCE,
                apiTokenInstance: MY_API_TOKEN_INSTANCE
            }));
            // Отправляем тестовое сообщение, для того чтобы сработали события вебхуков
            const response = await restAPI.message.sendMessage("79999999999@c.us", null, "hello world");
    
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();

```

Полный список примеров [здесь](examples/).

## Разворачивание окружения разработки

Помощь в доработке и в исправлении ошибок приветствуется. Шаги для разворачивания:

1. Склонируйте репозиторий через git clone
2. Установите зависимости через npm install
3. Установите глобально библиотеку ``rollup`` для сборки.
4. Для вебхуков добавьте `express` как новую зависимость через npm
5. Создайте файл `.env` в рутовом каталоге и пропишите переменные окружения. Образец переменных в файле [env.example](env.example)

## Сборка
Скомпилировать как browser, так и node/webpack версии либы можно одной командой
```
npm run build
```

## Сторонние продукты

* [axios](https://github.com/axios/axios) - для http запросов
* [express](https://www.npmjs.com/package/express) - сервер приложений для вебхуков

## Лицензия

Лицензировано на условиях MIT. Смотрите файл [LICENSE](LICENSE)
