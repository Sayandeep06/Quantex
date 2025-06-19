import {Router} from 'express'
export const tradesRouter = Router();

tradesRouter.get("/", async (req, res)=>{
    const {symbol, limit} = req.query;
    //make db call to get the trades and idk what to do for now 
    res.json({
        trades: "Getting trades from DB"
    })
})