import {WebSocketServer, WebSocket} from 'ws';

const wss = new WebSocketServer({port: 8080})

const subsciptions: {[key: string]:{
    ws: WebSocket,
    rooms: string[]
}} = {}

wss.on('connection', (socket)=>{
    const id = randomId();
    subsciptions[id] = {
        ws: socket,
        rooms: []
    }
    socket.on('message', (message)=>{
        socket.send("hey you sent me"+ message)
    })
})

const randomId = ()=>{
    return Math.random();
}