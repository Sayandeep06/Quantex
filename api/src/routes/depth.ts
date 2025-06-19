import { Router } from "express"
import { GET_DEPTH } from "../types";
import { RedisManager } from "../RedisManager";
import { MessageFromOrderbook } from "../types";

export const depthRouter = Router();

depthRouter.get('/', async (req, res)=>{
    const {symbol} = req.query;
    const response : MessageFromOrderbook = await RedisManager.getInstance().sendAndAwait({
        type: GET_DEPTH,
        data: {
            market: symbol as string
        }
    })
    res.json(response.payload)
})

