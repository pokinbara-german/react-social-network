export type messageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}

type subscriberType = (messages:Array<messageType>) => void;

const BASE_URL = 'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx';

let subscribers: Array<subscriberType> = [];

let ws: WebSocket | null = null;

function closeHandler() {
    console.log('CLOSE WS');
    setTimeout(createChanel, 3000);
}

function messageHandler(event: MessageEvent) {
    const newMessages = JSON.parse(event.data);
    subscribers.forEach(subscriber => subscriber(newMessages));
}

function createChanel() {
    ws?.removeEventListener('close', closeHandler);
    ws?.close();
    ws = new WebSocket(BASE_URL);
    ws.addEventListener('close', closeHandler);
    ws.addEventListener('message', messageHandler);
}

export const chatApi = {
    subscribe(callback: subscriberType) {
        subscribers.push(callback);
        return () => subscribers = subscribers.filter(subscriber => subscriber !== callback);
    },
    unsubscribe(callback: subscriberType) {
        subscribers = subscribers.filter(subscriber => subscriber !== callback);
    },
    sendMessage(message: string) {
        ws?.send(message);
    },
    connect() {
        createChanel();
    },
    disconnect() {
        ws?.removeEventListener('close', closeHandler);
        ws?.removeEventListener('message', messageHandler);
        ws?.close();
        subscribers = [];
    }
}