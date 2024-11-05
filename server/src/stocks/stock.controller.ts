// server/src/stocks/stock.controller.ts
import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'; // Import HttpService
import { StockService } from './stock.service';
import { lastValueFrom } from 'rxjs';

@Controller('stocks')
export class StockController {
    constructor(
        private readonly stockService: StockService, 
        private readonly httpService: HttpService // Inject HttpService
    ) {}

    @Get('fetch-and-store')
    async fetchAndStoreStocks() {
        const response = await lastValueFrom(this.httpService.get(`https://financialmodelingprep.com/api/v3/stock/list?apikey=wK81sw0qFGOJKZKnNOnSS3KDplwqjpVK`));
        const stocksData = response.data;
console.log(stocksData);
        // Assuming stocksData is an array of stock objects
        for (const stock of stocksData) {
            const stockToSave = {
                symbol: stock.symbol,
                name: stock.name,
                price: stock.price,
                stockExchange: stock.stockExchange,
                exchangeShortName: stock.exchangeShortName,
            };

            await this.stockService.addStock(stockToSave); // Save each stock to the database
        }

        return { message: 'Stocks fetched and stored successfully!' }; // You can modify this message as needed
    }

    // Other controller methods...
}
