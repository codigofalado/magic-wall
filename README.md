# Magic Wall

BOT que permite que a galera do chat troque a cor do background da câmera do canal de Live Coding [Código Falado](https://www.twitch.tv/codigofalado).

Foi desenvolvido ao vivo na [Twitch](https://www.twitch.tv/codigofalado)!.

# To-do (Recursos entregues e futuros):

- [x] Instalar o Nest.JS
- [x] Criar um módulo para receber o código do BOT
- [x] Instalar a Twitch JS
- [x] Criar arquivo de configuração com os dados do canal
- [x] Front-End Básico com Websockets (socket.io)
- [x] Controller Back-End Básico Para o Websocket
- [x] Conectar-se ao chat e "ouvir" as mensagens
- [x] Abstrair os dados da mensagem individual
- [x] Criar o comando `!parede` (`!wall`) para pegar a cor.
- [x] Certificar-se de que os comandos são case insensitive
- [x] Enviar a cor para o Front-End (**BOOM** -> MVP vai até aqui)
- [x] Quando User não enviar nada (nem cor e nem texto), ensina a usar o comando no chat.
- [x] Integrar com a API do Unsplash
- [x] Fazer o BOT gritar no chat os créditos da imagem atual
- [ ] Integrar o BOT ao recurso de Pontos do Canal na Twitch
- [ ] Segurar a imagem trocada com pontos por N minutos
- [ ] Criar um comando para imagem randômica

## Iniciando o projeto

`npm run start`

## Iniciando o projeto em modo desenvolvimento

`npm run start:dev`

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
