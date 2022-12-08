import { Component, OnInit } from '@angular/core';

// import * as Stomp from 'stompjs';
// import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import * as $ from 'jquery';
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-local-chat',
  templateUrl: './local-chat.component.html',
  styleUrls: ['./local-chat.component.css']
})
export class LocalChatComponent {

  private serverUrl = environment.apiUrl + '/socket';

  private stompClient;

  constructor() {

  }

  ngOnInit(): void {
    console.log('00');
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection(){
    var ws = new SockJS(this.serverUrl);

    this.stompClient = Stomp.over(ws);
    let that = this;
    console.log('1');
    this.stompClient.connect({}, function(frame) {
      console.log('22');
      that.stompClient.subscribe("/chat", (message) => {
        console.log('33');
        if(message.body) {
          console.log('444');
          $(".chat").append("<div class='message'>"+message.body+"</div>")
          console.log(message.body);
        }
      });
    });
  }

  sendMessage(message){
    this.stompClient.send("/app/send/message" , {}, message);
    $('#input').val('');
  }



}
