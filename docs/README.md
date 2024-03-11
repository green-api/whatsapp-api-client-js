# whatsapp-api-client library for javascript

![](https://img.shields.io/badge/license-CC%20BY--ND%204.0-green)
![](https://img.shields.io/npm/v/%40green-api%2Fwhatsapp-api-client)
![](https://img.shields.io/github/actions/workflow/status/green-api/whatsapp-api-client-js/build.yml)
![](https://img.shields.io/npm/dm/%40green-api%2Fwhatsapp-api-client)

## Поддержка

[![Support](https://img.shields.io/badge/support@green--api.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:support@green-api.com)
[![Support](https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/greenapi_support_ru_bot)
[![Support](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/79993331223)

## Руководства и новости

[![Guides](https://img.shields.io/badge/YouTube-%23FF0000.svg?style=for-the-badge&logo=YouTube&logoColor=white)](https://www.youtube.com/@green-api)
[![News](https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/green_api)
[![News](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://whatsapp.com/channel/0029VaHUM5TBA1f7cG29nO1C)

Javascript библиотека для интеграции с мессенджером WhatsAPP через API сервиса [green-api.com](https://green-api.com).
Чтобы воспользоваться библиотекой, нужно получить регистрационный токен и id аккаунта
в [личном кабинете](https://console.green-api.com/). Есть бесплатный тариф аккаунта разработчика.

## API

Документация к REST API находится по [ссылке](https://green-api.com/docs/api/). Библиотека является оберткой к REST API,
поэтому документация по ссылке выше применима и к самой библиотеке.

## Установка

Библиотека работает как на node >=10, так и на современных версиях браузеров chrome, firefox и др. Для приложений на
webpack и npm установка выполняется через команду:

```
npm i @green-api/whatsapp-api-client
```

Для чистого html js сайта библиотеку можно подключить в index.html

``` html
<script type="text/javascript" src="https://unpkg.com/@green-api/whatsapp-api-client/lib/whatsapp-api-client.min.js"></script>
```

## Импорт

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

Чтобы отправить сообщение или выполнить другой метод Green-API, аккаунт WhatsApp в приложении телефона должен быть в
авторизованном состоянии. Для авторизации аккаунта перейдите в [личный кабинет](https://console.green-api.com/) и
сканируйте QR-код с использованием приложения WhatsApp.

## Примеры

Не используйте параметр 'phoneNumber' при вызове методов. Он устарел. Примеры ниже используют параметр 'chatId'

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

Или можно воспользоваться синтаксисом ES6. Для того чтобы этот синтаксис сработал в приложении на nodejs, нужно в
package.json прописать ключ ``"type": "module"``. Далее все примеры будут на ES6 синтаксисе.

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

Вы можете сохранить Ваши авторизационные данные отдельно от кода. Библиотека позволяет создать файл с произвольным
именем и местом в следующем формате:

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

### Пример использования веб-хука

Веб-хуки работают только в node js на базе express

``` js
import whatsAppClient from '@green-api/whatsapp-api-client'
import express from "express";
import bodyParser from 'body-parser';

(async () => {
    try {

        // Устанавливаем http url ссылку, куда будут отправляться веб-хуки. 
        // Ссылка должна иметь публичный адрес.
        await restAPI.settings.setSettings({
            webhookUrl: 'MY_HTTP_SERVER:3000/webhooks'
        });

        const app = express();
        app.use(bodyParser.json());
        const webHookAPI = whatsAppClient.webhookAPI(app, '/webhooks')

        // Подписываемся на событие веб-хука при получении сообщения
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
            // Отправляем тестовое сообщение, для того чтобы сработали события веб-хуков
            const response = await restAPI.message.sendMessage("79999999999@c.us", null, "hello world");
    
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();

```

Полный список примеров [здесь](../examples).

## Разворачивание окружения разработки

Помощь в доработке и в исправлении ошибок приветствуется. Шаги для разворачивания:

1. Склонируйте репозиторий через git clone
2. Установите зависимости через npm install
3. Установите глобально библиотеку ``rollup`` для сборки.
4. Для веб-хуков добавьте `express` как новую зависимость через npm
5. Создайте файл `.env` в рутовом каталоге и пропишите переменные окружения. Образец переменных в
   файле [env.example](../env.example)

## Сборка

Скомпилировать как browser, так и node/webpack версии библиотеки можно одной командой

```
npm run build
```

## Сторонние продукты

* [axios](https://github.com/axios/axios) - для http запросов
* [express](https://www.npmjs.com/package/express) - сервер приложений для веб-хуков

## Лицензия

Лицензировано на условиях MIT. Смотрите файл [LICENSE](../LICENSE)
