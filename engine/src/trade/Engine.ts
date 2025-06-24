import fs from 'fs'
import { RedisManager } from '../RedisManager';
import { ORDER_UPDATE, TRADE_ADDED } from '../types';
import { CANCEL_ORDER, CREATE_ORDER, GET_DEPTH, GET_OPEN_ORDERS, MessageFromApi, ON_RAMP } from '../types/fromAPI';
import { Fill, Order, Orderbook } from './Orderbook';


export const BASE_CURRENCY = "INR";

interface UserBalance {
    [key: string]: {
        available: number;
        locked: number;
    }
}

export class Engine {
    private orderbooks: Orderbook[] = [];
    private balances: Map<string, UserBalance> = new Map();


    constructor(){
        let snapshot = null
        try{
            if(process.env.WITH_SNAPSHOT){
                snapshot = fs.readFileSync("./snapshot.json")
            }
        }catch(e){
            console.log("No snapshot found");
        }

        if(snapshot){
            const snapshotSnapshot = JSON.parse(snapshot.toString());
            this.orderbooks = snapshotSnapshot.orderbooks.map((o:any) => new Orderbook(o.baseAsset, o.bids, o.asks, o.lastTradeId, o.currrentPrice));
            this.balances = new Map(snapshotSnapshot.balances);
        } else {
            this.orderbooks = [new Orderbook(`TATA`, [], [], 0, 0)];
 //           this.setBaseBalances();
        }

        setInterval(() =>{
 //           this.saveSnapshot();
        }, 1000*3)
    }

    saveSnapshot(){
        
    }
}
 