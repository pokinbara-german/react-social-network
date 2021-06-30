import { nanoid } from 'nanoid'

type ApiMessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
};

export interface messageType extends ApiMessageType {
    id: string
}

type subscriberType = (messages: Array<messageType>) => void;

/** @constant {string} URL to websocket end-point */
const BASE_URL = 'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx';

let subscribers: Array<subscriberType> = [];

let ws: WebSocket | null = null;

function closeHandler() {
    console.log('CLOSE WS');
    setTimeout(createChanel, 3000);
}

function messageHandler(event: MessageEvent) {
    const newMessages = JSON.parse(event.data);
    newMessages.forEach((message: messageType) => message.id = nanoid())
    subscribers.forEach(subscriber => subscriber(newMessages));
}

/**
 * Clean WebSocket object from listeners and closes connection.
 */
function cleanUpWs() {
    ws?.removeEventListener('close', closeHandler);
    ws?.removeEventListener('message', messageHandler);
    ws?.close();
}

function createChanel() {
    cleanUpWs();
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
        cleanUpWs();
        subscribers = [];
    }
}