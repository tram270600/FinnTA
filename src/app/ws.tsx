import * as ReduxWebSocket from '@giantmachines/redux-websocket';

export const connect = (userId: string) => ReduxWebSocket.connect(`ws://localhost:27017/ws/chat?id=${userId}`);

export const { disconnect } = ReduxWebSocket;
