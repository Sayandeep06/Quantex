import { WebSocket } from "ws";
import { IncomingMessage, SUBSCRIBE, UNSUBSCRIBE } from "./types/incoming";
import { OutgoingMessage } from "./types/outgoing";
import { SubscriptionManager } from "./SubscriptionManager";

export class User{
    private id: string;
    private ws: WebSocket;

    constructor(id: string, ws: WebSocket){
        this.id = id;
        this.ws = ws; 
        this.addListeners();
    }

//    private subscriptions: string[] = [];

//    public subscribe(subscription: string){
//        this.subscriptions.push(subscription);
//    }

//    public unsubscribe(subscription: string){
//        this.subscriptions = this.subscriptions.filter(x => x !== subscription);
//    }

    emit(message: OutgoingMessage){
        this.ws.send(JSON.stringify(message))
    }

    private addListeners() {
        this.ws.on("message", (message: string) => {
            const parsedMessage: IncomingMessage = JSON.parse(message);
            if (parsedMessage.method === SUBSCRIBE) {
                parsedMessage.params.forEach(s => SubscriptionManager.getInstance().subscribe(this.id, s));
            }

            if (parsedMessage.method === UNSUBSCRIBE) {
                parsedMessage.params.forEach(s => SubscriptionManager.getInstance().unsubscribe(this.id, parsedMessage.params[0]));
            }
        });
    }
}