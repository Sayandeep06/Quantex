import {Router} from 'express'
export const klineRouter = Router();

klineRouter.get("/", async (req, res)=>{
    const { symbol, interval, startTime, endTime } = req.query;
    res.json({
        symbol, startTime, endTime, interval
    })
})