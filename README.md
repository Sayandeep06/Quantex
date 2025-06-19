# Quantex
![System design](system.webp)

Engine: infinitely polls messages from the queue 
maintains an array of orderbooks and all the balances of the users
source of truth for everything 
slowly takes snapshots 
CENTRAL SERVER THAT STORES ALL THE BALANCES AND THE ORDERBOOKS  
can move these to golang or rust to have multiple engines 