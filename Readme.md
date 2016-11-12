### Установка
```
$ git clone https://github.com/romapost/onlango-react
$ cd onlango-react
$ npm install --production
```
### Конфигурация nginx
```
root    [путь к папке onlango-react/public] 
index   index.html;


# для работы pushState/HistoryAPI fallback
location / {
  try_files $uri $uri/ /index.html;
}

# дефолтный userpic
location /userpics/ {
  try_files $uri /userpic.jpg;
}

# для работы api на aocket.io
location /api/ {
  proxy_http_version  1.1;
  proxy_set_header  X-Real-IP $remote_addr;
  proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header  X-NginX-Proxy true;
  proxy_set_header  Host $http_host;
  proxy_set_header  Upgrade $http_upgrade;
  proxy_set_header  Connection "upgrade";
  proxy_redirect    off;

  proxy_buffers     8 32k;
  proxy_buffer_size 64k;

  proxy_pass        http://localhost:3000;
}
```
### Запуск
```
$ cd onlango-react
$ npm start
```
