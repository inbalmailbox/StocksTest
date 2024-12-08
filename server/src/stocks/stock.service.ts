import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stock } from './schemas/stock.schema';
import { HttpService } from '@nestjs/axios'; // Import HttpService
import { lastValueFrom } from 'rxjs'; // Import lastValueFrom for observable handling
import axios from 'axios';

@Injectable()
export class StockService implements OnModuleInit{

    constructor(
        @InjectModel(Stock.name) private stockModel: Model<Stock>,
        private readonly httpService: HttpService, // Inject HttpService
    ) {}

    async onModuleInit() {
        console.log('Server initialized, fetching stocks...');
        await this.fetchAndStoreStocks();
      }


   
    async fetchAndStoreStocks(): Promise<Stock[]> {
      const apiUrl = 'https://financialmodelingprep.com/api/v3/stock/list?apikey=wK81sw0qFGOJKZKnNOnSS3KDplwqjpVK';
      console.log('Starting to fetch stock data from the API...');
      try {
        const response = await axios.get(apiUrl);
        console.log('API response received:', response.data); // Log the response
  
        const stocks = response.data.slice(1,10); // Assuming API returns an array of stock data // and cutting it to be short
        
        const savedStocks = []; // Array to store saved stocks
  
        // Save stocks to MongoDB (if not already stored)
        for (const stock of stocks) {
          console.log(`Checking if stock ${stock.symbol} already exists in DB...`);
          const existingStock = await this.stockModel.findOne({ ticker: stock.symbol }).exec();
          if (!existingStock) {
            console.log(`Stock ${stock.symbol} not found, creating new entry.`);
            const newStock = new this.stockModel({
              ticker: stock.symbol,
              name: stock.name,
              price: stock.price,
              change: stock.change,
            });
            savedStocks.push(await newStock.save()); // Push the saved stock into the array
          } else {
            console.log(`Stock ${stock.symbol} already exists in DB.`);
          }
        }
  
        console.log('Stocks have been successfully fetched and stored.');
        return savedStocks; // Return the array of saved stocks
      } catch (error) {
        console.error('Error fetching stocks from API:', error);
        throw new Error('Failed to fetch stocks');
      }
    }
  

    async findAll(): Promise<Stock[]> {
        return this.stockModel.find().exec(); // Fetch all stocks from MongoDB
      }
      

    // Add a new stock
    async addStock(stockData: Partial<Stock>): Promise<Stock> {
        const newStock = new this.stockModel(stockData);
        return newStock.save();
    }

    // Update a stock
    async updateStock(id: string, stockData: Partial<Stock>): Promise<Stock> {
        return this.stockModel.findByIdAndUpdate(id, stockData, { new: true });
    }

    // Delete a stock
    async deleteStock(id: string): Promise<{ deleted: boolean }> {
        const result = await this.stockModel.findByIdAndDelete(id);
        return { deleted: !!result };
    }



     
    }
