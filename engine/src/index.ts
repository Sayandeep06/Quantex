import { createClient } from "redis";
import {Engine} from "./trade/Engine";

async function main(){
    const engine = new Engine();
    // this to poll messages from the apiserver queue constantly
    const redisClient = createClient();
    await redisClient.connect();
    console.log("connected to redis")
    
    while(true){
        const response = await redisClient.rPop("messages" as string)
        if(!response){

        }else{
//            engine.process(JSON.parse(response));
        }
    }
}

main();