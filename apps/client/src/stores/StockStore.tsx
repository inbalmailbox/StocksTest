// client/src/stores/StockStore.ts
import { makeAutoObservable, runInAction } from 'mobx';

class StockStore {
  stocks: Array<{ symbol: any; name: string; price: string }> = [];

  constructor() {
    makeAutoObservable(this);
  }

  async fetchStocks() {
    try {    
      const response = await fetch(`https://financialmodelingprep.com/api/v3/stock/list?apikey=wK81sw0qFGOJKZKnNOnSS3KDplwqjpVK`);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      console.log("Fetched data:", data);
      runInAction(() => {
        this.stocks = data;
      });
    } catch (error) {
      console.error('Failed to fetch stocks:', error);
    }
  }

  // Fetch a single stock by its symbol from the Financial Modeling Prep API
  async getStockById(symbol: string) {
    try {   

      const response = await fetch(`https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=wK81sw0qFGOJKZKnNOnSS3KDplwqjpVK`); // Your API key
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const stockData = await response.json();
      return stockData;
    } catch (error) {
      console.error("Error fetching stock by ID:", error);
      return null;
    }
  }

  // Remove a stock from the database and update the local store
  async removeStock(symbol: string) {
    try {
      await fetch(`http://localhost:3000/stocks/${symbol}`, {
        method: 'DELETE',
      });
      runInAction(() => {
        this.stocks = this.stocks.filter(stock => stock.symbol !== symbol);
      });
    } catch (error) {
      console.error("Error removing stock:", error);
    }
  }
}

const stockStore = new StockStore();
export default stockStore;
