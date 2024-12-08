import { makeAutoObservable, runInAction } from 'mobx';

class StockStore {
  stocks: Array<{ _id: string; symbol: string; name: string; price: string }> = [];

  constructor() {
    makeAutoObservable(this);
  }

  // Fetch stocks from the backend
  async fetchStocks() {
    try {
      const response = await fetch('http://localhost:3000/stocks');
      if (!response.ok) throw new Error('Failed to fetch stocks');
      const data = await response.json();
      runInAction(() => {
        this.stocks = data; // Assume `data` is an array of stocks from the backend
      });
    } catch (error) {
      console.error('Error fetching stocks:', error);
    }
  }

  // Get a stock by ID
  async getStockById(id: string) {
    try {
      const response = await fetch(`http://localhost:3000/stocks/${id}`);
      if (!response.ok) throw new Error('Failed to fetch stock');
      const stock = await response.json();
      return stock;
    } catch (error) {
      console.error('Error fetching stock by ID:', error);
      return null;
    }
  }

  // Add a stock
  async addStock(stock: { symbol: string; name: string; price: string }) {
    try {
      const response = await fetch('http://localhost:3000/stocks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stock),
      });
      const newStock = await response.json();
      runInAction(() => {
        this.stocks.push(newStock); // Add the newly created stock to the list
      });
    } catch (error) {
      console.error('Failed to add stock:', error);
    }
  }

  // Delete a stock by ID
  async deleteStock(id: string) {
    try {
      const response = await fetch(`http://localhost:3000/stocks/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete stock');
      runInAction(() => {
        this.stocks = this.stocks.filter(stock => stock._id !== id);
      });
    } catch (error) {
      console.error('Error deleting stock:', error);
    }
  }

  // Update a stock by ID
  async updateStock(id: string, updatedData: { symbol: string; name: string; price: string }) {
    try {
      const response = await fetch(`http://localhost:3000/stocks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      const updatedStock = await response.json();
      runInAction(() => {
        const index = this.stocks.findIndex(stock => stock._id === id);
        if (index !== -1) {
          this.stocks[index] = updatedStock;
        }
      });
    } catch (error) {
      console.error('Failed to update stock:', error);
    }
  }
}

const stockStore = new StockStore();
export default stockStore;
