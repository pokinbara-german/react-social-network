import {nanoid} from 'nanoid';

type ApiMessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
};

export type eventNamesType = 'message-received' | 'connection-changed';

export interface messageType extends ApiMessageType {
    id: string
}

type messageReceivedSubscriberType = (messages: Array<messageType>) => void;
type connectionChangedSubscriberType = (status: boolean) => void;
type subscribersType = {
    'message-received': Array<messageReceivedSubscriberType>,
    'connection-changed': Array<connectionChangedSubscriberType>
}

/** @constant {string} URL to websocket end-point */
const BASE_URL = 'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx';

let subscribers: subscribersType = {
    'message-received': [],
    'connection-changed': []
};

let ws: WebSocket | null = null;

function closeHandler() {
    console.log('CLOSE WS');
    notifyConnectionChanged(false);
    setTimeout(createChanel, 3000);
}

function messageHandler(event: MessageEvent) {
    const newMessages = JSON.parse(event.data);
    newMessages.forEach((message: messageType) => message.id = nanoid());
    subscribers['message-received'].forEach(subscriber => subscriber(newMessages));
}

/**
 * Notify about connection is opened
 */
function openHandler() {
    notifyConnectionChanged(true);
}

/**
 * Clean WebSocket object from listeners and closes connection.
 */
function cleanUpWs() {
    ws?.removeEventListener('close', closeHandler);
    ws?.removeEventListener('message', messageHandler);
    ws?.removeEventListener('open', openHandler);
    ws?.close();
}

function notifyConnectionChanged(status: boolean) {
    subscribers['connection-changed'].forEach(subscriber => subscriber(status));
}

function createChanel() {
    cleanUpWs();
    ws = new WebSocket(BASE_URL);
    notifyConnectionChanged(false);
    ws.addEventListener('close', closeHandler);
    ws.addEventListener('message', messageHandler);
    ws.addEventListener('open', openHandler);
}

export const chatApi = {
    //TODO: refactor this
    subscribe(eventName: eventNamesType, callback: messageReceivedSubscriberType | connectionChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName].push(callback);
        // @ts-ignore
        return () => subscribers[eventName] = subscribers[eventName].filter(subscriber => subscriber !== callback);
    },
    //TODO: refactor this too
    unsubscribe(eventName: eventNamesType, callback: messageReceivedSubscriberType | connectionChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(subscriber => subscriber !== callback);
    },
    sendMessage(message: string) {
        ws?.send(message);
    },
    connect() {
        createChanel();
    },
    disconnect() {
        cleanUpWs();
        subscribers['message-received'] = [];
        subscribers['connection-changed'] = [];
    }
}