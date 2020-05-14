# Версия библиотеки для браузеров

Поддерживаются все браузеры, кроме старых, включая IE 11. 

## 1. Установка
Добавить скрипт в html файл:
``` html
<script type="text/javascript" src="https://unpkg.com/@green-api/whatsapp-api-client/lib/whatsapp-api-client.min.js"></script>
```
## 2. Отправка сообщения в WhatsApp
Чтобы отправить сообщение нужно получить регистрационный токен, id инстанса через сервер [green-api.com](https://green-api.com) и пройти авторизацию в теолефоне через QR код. В примере ``YOUR_ID_INSTANCE`` и ``YOUR_API_TOKEN_INSTANCE`` нужно заменить значения на свои

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
Комплексный пример находится здесь [browserExample.html](examples/browserExample.html)
