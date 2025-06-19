import express from 'express'
import cors from 'cors'
import { depthRouter } from './routes/depth';
import { klineRouter } from './routes/kline';
import { orderRouter } from './routes/order';
import { tickerRouter } from './routes/ticker';
import { tradesRouter } from './routes/trades';

const app = express();
app.use(cors());
app.use(express.json())

app.use('/api/v1/klines', klineRouter);
app.use('/api/v1/tickers', tickerRouter);
app.use('api/v1/trades', tradesRouter);
app.use('/api/v1/depth', depthRouter);
app.use('/api/v1/order', orderRouter);



app.listen(3000, ()=>{
    console.log(`Server running on http://localhost:3000`)
})