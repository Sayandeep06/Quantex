
export type TickerUpdateMessage = {
  stream: string, 
  data: {
    c?: string,  // Last price (optional)
    h?: string,  // High price (optional)
    l?: string,  // Low price (optional)
    v?: string,  // Base volume (optional)
    V?: string,  // Quote volume (optional)
    s?: string,  // Symbol (optional)
    id: number,  // Unique ID for the message
    e: "ticker"  // Event type: "ticker"
  }
}

export type DepthUpdateMessage = {
  stream: string,
  data: {
    b?: [string, string][], // Bids: [price, quantity]
    a?: [string, string][], // Asks: [price, quantity]
    e: "depth"              // Event type: "depth"
  }
}

export type TradeAddedMessage = {
  stream: string,
  data: {
    e: "trade",   // Event type: "trade"
    t: number,    // Trade ID or timestamp
    m: boolean,   // Is buyer the market maker? (true = sell side aggressor)
    p: string,    // Price
    q: string,    // Quantity
    s: string     // Symbol
  }
}

export type WsMessage = TickerUpdateMessage | DepthUpdateMessage | TradeAddedMessage;
