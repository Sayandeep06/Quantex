import { BASE_CURRENCY } from "./Engine";
export interface Order {
    price: number,
    quantity: number,
    orderId: string,
    filled: number,
    side: "buy" | "sell",
    userId: string
}

export interface Fill {
    price: string,
    qty: number, 
    tradeId: number,
    otherUserId: string;
    markerOrderId: string
}

export class Orderbook{
    bids: Order[];
    asks: Order[];
    baseAsset: string;
    quoteAsset: string = BASE_CURRENCY;
    lastTradeId: number;
    currentPrice: number;

    constructor(baseAsset: string, bids: Order[], asks: Order[], lastTradeId: number, currentPrice: number){
        this.bids = bids;
        this.asks = asks;
        this.baseAsset = baseAsset;
        this.lastTradeId = lastTradeId || 0;
        this.currentPrice = currentPrice;
    }

    ticker(){
        return `${this.baseAsset}_${this.quoteAsset}`;
    }

    getSnapshot(){
        return {
            baseAsset: this.baseAsset,
            bids: this.bids,
            asks: this.asks,
            lastTradeId: this.lastTradeId,
            currentPrice: this.currentPrice
        }
    }

    getDepth(){
        const bidLevels: [string, string][] = [];
        const askLevels: [string, string][] = [];

        const bidDepthMap: { [price: string]: number } = {};
        const askDepthMap: { [price: string]: number } = {};

        for (const order of this.bids) {
            if (!bidDepthMap[order.price]) bidDepthMap[order.price] = 0;
            bidDepthMap[order.price] += order.quantity;
        }

        for (const order of this.asks) {
            if (!askDepthMap[order.price]) askDepthMap[order.price] = 0;
            askDepthMap[order.price] += order.quantity;
        }

        for( const price in bidDepthMap){
            bidLevels.push([price, bidDepthMap[price].toString()]);
        }

        for(const price in askLevels){
            askLevels.push([price, askDepthMap[price].toString()])
        }

        return {
            bidLevels,
            askLevels
        };
    }

    getOpenOrders(userId: string): Order[]{
        const asks = this.asks.filter(x => x.userId === userId);
        const bids = this.asks.filter(x => x.userId === userId)
        return [...asks, ...bids];
    }

    cancelBid(order: Order){
        const cancelledOrder = this.bids.find(x => x.orderId === order.orderId);

    }

    cancelAsk(order: Order){
        const cancelledOrder = this.asks.find(x => x.orderId === order.orderId);
        if(!cancelledOrder)     return;

        this.asks = this.asks.filter(x => x.orderId !== order.orderId);
        return cancelledOrder.price
    }
}