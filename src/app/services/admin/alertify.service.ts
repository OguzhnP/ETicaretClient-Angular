import { Injectable } from '@angular/core';
declare var alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  // message (message: string,messageType : MessageType,position: Position,delay : Number=3,dismissOthers : boolean=false)
  message (message: string,options: Partial<AlertifyOptions>)
  {
    alertify.set('notifier','position', options.position);
    alertify.set('notifier','delay', options.delay);
    const msj=alertify[options.messageType](message);
    if (options.dismissOther) {
      msj.dismissOthers();
    }
  }

  dismissAll(){
    alertify.dismissAll();
  }
  
}

export class AlertifyOptions {
  messageType: MessageType=MessageType.Message;
  position: Position =Position.BottomCenter;
  delay: Number=3;  
  dismissOther:boolean=false;

}

export enum MessageType{
  Error = "error",
  Message ="message",
  Notify ="notify",
  Success="success",
  Warning="warning"
}

export enum Position{
  TopCenter = "top-center",
  TopRight ="top-right",
  TopLeft="top-left",
  BottomCenter="bottom-center",
  BottomRight="bottom-right",
  BottomLeft="bottom-left"
}
