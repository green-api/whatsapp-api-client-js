# whatsapp-api-client library for javascript
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/green-api/whatsapp-api-client/blob/master/LICENSE)
[![GitHub release](https://img.shields.io/github/v/release/green-api/whatsapp-api-client.svg)](https://github.com/green-api/whatsapp-api-client/releases)

Javascript библиотека для интеграции с мессенджером WhatsAPP через API сервиса [green-api.com](https://green-api.com). Чтобы воспользоваться библиотекой нужно получить регистрационный токен и id аккаунта в [личном кабинете](https://cabinet.green-api.com).

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

## Авторизация 

Чтобы отправить сообщение или выполнить другой метод Green-API, аккаунт WhatsApp в приложении телефона должен быть в авторизованном состоянии. Для авторизации аккаунта перейдите в [личный кабинет](https://cabinet.green-api.com) и сканируйте QR-код с использованием прилоения WhatsApp.

## Примеры

### Отправка сообщения на номер WhatsApp
Используя common js
``` js
const whatsAppClient = require('@green-api/whatsapp-api-client')

const restAPI = whatsAppClient.restAPI(({
    idInstance: YOUR_ID_INSTANCE,
    apiTokenInstance: YOUR_API_TOKEN_INSTANCE
}))

restAPI.message.sendMessage(null, 79999999999, "hello world")
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
    restAPI.message.sendMessage(null, 79999999999, "hello world")
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
    const response = await restAPI.message.sendMessage(null, 79999999999, "hello world");
})();
```

### Отправка соообщения на номер WhatsApp его получение через webhook service REST API

``` js
import whatsAppClient from '@green-api/whatsapp-api-client'

(async () => {

    const restAPI = whatsAppClient.restAPI(({
        idInstance: YOUR_ID_INSTANCE, 
        apiTokenInstance: YOUR_API_TOKEN_INSTANCE
    }))

    try {
        // Send WhatsApp message
        const respSendMessage = await restAPI.message.sendMessage(null, 79167266138, "hello world");

        // Receive WhatsApp message. Method waits for 20 sec and returns empty string if there were no sent messages
        const respReceiveMessage = await restAPI.webhookService.receiveNotification(); 

        if (respReceiveMessage.receiptId) {
            // Confirm WhatsApp message. Each received message must be confirmed to be able to consume next message
            const respConfirmMessage = await restAPI.webhookService.deleteNotification(respReceiveMessage.receiptId);
        }
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
    const response = await restAPI.file.sendFileByUrl(null, 79999999999, 'https://avatars.mds.yandex.net/get-pdb/477388/77f64197-87d2-42cf-9305-14f49c65f1da/s375', 'horse.png', 'horse');
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
            const response = await restAPI.message.sendMessage(null, 79999999999, "hello world");
    
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();

```

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
