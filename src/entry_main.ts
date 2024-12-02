import {
    allComponents,
    provideFluentDesignSystem,
} from "@fluentui/web-components";
import {SocketCanvasElement} from "./socket_canvas.js";
// Make everything use microsoft fluent by default.
provideFluentDesignSystem().register(allComponents);

/* 

Useful types (you don't have to use them explicitly, 
they serve as documentation for what the protocol is doing) 

*/

interface Point {
    x: number,
    y: number,
}

interface WelcomeMessage {
    // The size of the remote canvas.
    x: number,
    y: number,
    data: [number]
}

interface UpdateMessage {
    point: Point,
    value: boolean,
}

let firstMessage = true;
// Create a websocket connection. 
// More info at https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API
const socket = new WebSocket("ws:socket.zavazadlo.unsigned-short.com");
socket.onmessage = (m) => {
    if (firstMessage) {
        const data = JSON.parse(m.data);

        for (let i = 0; i < data.y; i++) {
            for (let j = 0; j < data.x; j++) {
                canvas.setPixel(i, j, Boolean(data.data[i*data.x+j]));

            }
        }
        firstMessage = false;
    }
}


// Example of how to use the canvas element:
let canvas = new SocketCanvasElement();
canvas.width = 128;
canvas.height = 128;
canvas.ondraw = (x, y) => {
    console.log(x, y);

    socket.send(JSON.stringify({point: {x: x, y: y}, value: true}));

    socket.onmessage = (m) => {
        if (!firstMessage) {
            const data = JSON.parse(m.data);
            for (let i = 0; i < data.length; i++) {
                canvas.setPixel(data[i].point.x, data[i].point.y, data[i].value);
            }
        }
    }
}
document.querySelector("#container")!.appendChild(canvas);

// We can only draw into canvas once it is actually shown, hence we postpose the draw operation.
// setTimeout(() => {
//     for (let x = 0; x < 128; x++) {
//         canvas.setPixel(x, x, true);
//     }
// })

function refresh(){
  setTimeout(refresh, 100);
  socket.send(JSON.stringify({point: {x: 0, y: 0}, value: true}));
}

setTimeout(refresh, 100);