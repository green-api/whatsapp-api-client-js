# whatsapp-api-client js library
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/green-api/whatsapp-api-client/blob/master/LICENSE)
[![GitHub release](https://img.shields.io/github/release/green-api/whatsapp-api-client.svg)](https://github.com/green-api/whatsapp-api-client/releases)

This library helps you easily create a javascript application with WhatsAPP using service [green-api.com](https://green-api.com). You need to get token and instance id  in order to use library. 

## Для русскоязычных
Javascript библиотека для интеграции с мессенджером Whats APP через API сервиса [green-api.com](https://green-api.com). ЧТобы воспользоваться библиотекой нужно получить регистрационный токен и id инстанса через сервер.

## Авторизация 

Чтобы отправить сообщение или выполнить другой метод API, аккаунт WhatsApp в приложении теелфона должен быть в авторизованном состоянии. 

Это можно сделать двумя способами:
1. Через веб-интерфейс с помощью считывания QR кода по ссылке https://api.green-api.com/waInstance{{idInstance}}/{{apiTokenInstance}}, где ``idInstance`` и ``apiTokenInstance`` это параметры, полученные при регистрации на [green-api.com](https://green-api.com)

2. Программно. Выполняется с помощью считывания QR кода через websocket отдельным методом API scanqrcode, который пока не реализован в библиотеке. Описание этого метода доступно по ссылке [ instance.scanqrcode (websocket)](https://documenter.getpostman.com/view/11185176/Szme3xf1?version=latest#048e8f7c-5bf1-4655-a719-c2d2ee78c676) 

## Примеры

### Отправка сообщение на номер whats app

``` js
import whatsAppClient from 'whatsapp-api-client'

(async () => {
    const restAPI = whatsAppClient.restAPI(({
        idInstance: YOUR_ID_INSTANCE, 
        apiTokenInstance: YOUR_API_TOKEN_INSTANCE
    }))
    const response = await restAPI.message.sendMessage(null, 79999999999, "hello world");
})();
```

или используюя callbacks
``` js
const whatsAppClient = require('whatsapp-api-client')

const restAPI = whatsAppClient.restAPI(({
    idInstance: YOUR_ID_INSTANCE,
    apiTokenInstance: YOUR_API_TOKEN_INSTANCE
}))

restAPI.message.sendMessage(null, 79999999999, "hello world");
.then((data) => {
    console.log(data);
}) ;

```

### Отправка файла на номер whats app
``` js
import whatsAppClient from 'whatsapp-api-client'

(async () => {
    const restAPI = whatsAppClient.restAPI(({
        idInstance: YOUR_ID_INSTANCE,
        apiTokenInstance: YOUR_API_TOKEN_INSTANCE
    }))
    const response = await restAPI.file.sendFileByUrl(null, 79999999999, 'https://avatars.mds.yandex.net/get-pdb/477388/77f64197-87d2-42cf-9305-14f49c65f1da/s375', 'horse.png', 'horse');
})();
```

### Пример использования вебхука

``` js
(async () => {
    const app = express();
    const webHookAPI = whatsAppClient.webhookAPI(app)
    webHookAPI.createIncomingMessageReceivedHook((data) => {
        console.log(`webhook data ${data}`)
    })
    app.listen(3000, () => console.log(`Started. App listening on port 3000!`));
})();

```

## Лицензия

Лицензировано на условиях MIT. Смотрите файл [LICENSE](LICENSE)
