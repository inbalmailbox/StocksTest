import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stock } from './schemas/stock.schema';
import { HttpService } from '@nestjs/axios'; // Import HttpService
import { lastValueFrom } from 'rxjs'; // Import lastValueFrom for observable handling

@Injectable()
export class StockService {

    constructor(
        @InjectModel(Stock.name) private stockModel: Model<Stock>,
        private readonly httpService: HttpService, // Inject HttpService
    ) {}

    // Fetch and store stocks (already implemented)
    async fetchAndStoreStocks(): Promise<void> {

        try {
            const response = await lastValueFrom(this.httpService.get('https://financialmodelingprep.com/api/v3/search?query=AA&apikey=wK81sw0qFGOJKZKnNOnSS3KDplwqjpVK'));
            const stocksData = response.data; // Assuming this is an array of stock objects
                console.log("the stockdta is"+stocksData);
            // Loop through each stock data and save it to MongoDB
            for (const stock of stocksData) {
                const stockToSave = {
                    symbol: stock.symbol,
                    name: stock.name,
                    price: stock.price, // Ensure price is available in the fetched data
                    stockExchange: stock.stockExchange,
                    exchangeShortName: stock.exchangeShortName,
                };

                await this.addStock(stockToSave); // Save each stock to the database
            }
        } catch (error) {
            console.error('Error fetching and storing stocks:', error);
        }
    }

    // Retrieve all stocks
    async getAllStocks(): Promise<Stock[]> {
        return this.stockModel.find().exec();
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
