import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MessageBody, SubscribeMessage, WebSocketGateway, ConnectedSocket, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import User from '../user/user';
import TwitchJs, { Api, Chat } from 'twitch-js';
import Commands from '../user/commands';
import { createApi } from 'unsplash-js';
import nodeFetch from 'node-fetch';


@Injectable()
@WebSocketGateway()
export class MagicwallGateway implements OnModuleInit {
  private api:Api;
  private chat:Chat;
  private channel;
  constructor(private configService: ConfigService){
    const token = this.configService.get<string>('TOKEN');
    const username = this.configService.get<string>('USER');
    this.channel = this.configService.get<string>('CHANNEL');
    const { api, chat } = new TwitchJs({ token, username });
    this.api = api;
    this.chat = chat;
    // Connect ...
    this.chat.connect().then(() => {
    // ... and then join the channel.
    chat.join(this.channel);
    });
  }
  onModuleInit(){
    // Aqui nós nos conectamos à Twitch
    let lastCommandTimestamp = new Date("1983-02-27").valueOf();
    this.chat.on(TwitchJs.Chat.Events.ALL, message => {
      if(message.command === TwitchJs.Chat.Commands.PRIVATE_MESSAGE){
        const user = new User(message);
        const commands = new Commands(user.message);
        if(commands.isCommand){
          // Você digitou o comando certo!
          if(commands.value == ''){
            // Você não enviou valor algum junto com o comando
            this.chat.say(this.channel, `@${user.username} Como trocar a cor da parede: !parede VALOR`);
            this.chat.say(this.channel, `Substitua "VALOR" por qualquer cor válida (hexadecimal, nome da cor, rgb, etc) ou um termo para buscar imagem`);
            return;
          }
          if(commands.isColor){
            // Você digitou uma cor válida!
            this.sendColor(commands.value);
          }else{
            const cooldown = this.configService.get<number>('COOLDOWN');
            let seconds = Math.floor((user.date.valueOf() - lastCommandTimestamp) / 1000);
            if(seconds < cooldown){
                this.chat.say(this.channel, `@${user.username}, aguarde ${cooldown - seconds} segundos para usar ${commands.command} novamente!`);
            }else{
                lastCommandTimestamp = user.date.valueOf();
                seconds = cooldown;
                // Aqui nós enviaremos o valor para o Unsplash
                this.searchUnsplash(commands.value);
            }    
          }
        }
      }
    });
    console.log('Magicwall Gateway Iniciado');
  }
  @WebSocketServer()
  private server: Server;
  @SubscribeMessage('fernando')
  handleEvent(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ) {
    // Função de Teste para possibilitar Websocket do Front para o Back
    // return console.log(data, client);
    return ` ${data} - ${client}`;
  }
  sendData(data: string){
      this.server.emit('events', [...data].reverse().join(''));
  }
  sendColor(color: string){
      this.server.emit('changeColor', color);
  }
  sendPhoto(photoURL: string){
    this.server.emit('changePhoto', photoURL);
  }
  searchUnsplash(term: string){
    const unsplash = createApi({
      accessKey: this.configService.get<string>('UNSPLASH_ACCESS'),
      fetch: nodeFetch.bind(this)
    });
    unsplash.search.getPhotos({
      query: term,
      page: 1,
      perPage: 1,
      orientation: 'landscape',
    }).then(result => {
      if (result.type === 'success') {
        if(result.response.total > 0){
          const firstPhoto = result.response.results[0];
          this.sendPhoto(firstPhoto.urls.regular);
          // Dar os créditos no chat
          this.chat.say(this.channel, `Usando a foto ${firstPhoto.description} por ${firstPhoto.user.name}`);
          // Trigger Download
          unsplash.photos.trackDownload({
            downloadLocation: firstPhoto.links.download_location,
          });
        }else{
          this.chat.say(this.channel, `Foto não encontrada.`);
        }
      }
    });
  }
}
