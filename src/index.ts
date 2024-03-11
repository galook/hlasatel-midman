import { WebSocket } from "ws";
import sound from "play-sound";
import * as fs from "fs";

const ws = new WebSocket("ws://localhost:8085");
const player = sound();

ws.on("open", () => {
  console.log("Connected to server");
  ws.send("con");
});

ws.on("message", (data) => {
 let parsedData;
  try {
    parsedData = JSON.parse(data.toString());
    
  } catch (e) {
    console.log('err parsing', e);
    return;
  }
  if(parsedData.action === 'go'){
    console.log("got some");
    const buf = Buffer.from(parsedData.data, 'base64url');
    fs.writeFileSync('play.mp3', buf);
    player.play('play.mp3', (err) => {
        if (err) {
            console.log(err);
        }
        }
    );
  }
});
