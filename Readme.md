### Установка

Предварительно требуется docker и docker-compose.

```
git clone https://github.com/romapost/onlango-react
cd onlango-react
```
SSL сертификат `cert.pem` и приватный ключ сервера `privkey.pem` необходимо положить в папку `ssl`.
```
docker-compose run api npm install --production
docker-compose up
```
