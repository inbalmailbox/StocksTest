import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { StockService } from './stock.service';
import { Stock } from './schemas/stock.schema';




@Controller('stocks') // This makes the route accessible at /stocks
export class StocksController {
  constructor(private readonly stocksService: StockService) {}

  @Get()
  async findAll() {
    return this.stocksService.findAll(); // Fetch all stocks
  }



  // Add a new stock
  @Post()
  addStock(@Body() stockData: Partial<Stock>): Promise<Stock> {
    return this.stocksService.addStock(stockData);
  }

  // Update an existing stock
  @Put(':id')
  updateStock(@Param('id') id: string, @Body() stockData: Partial<Stock>): Promise<Stock> {
    return this.stocksService.updateStock(id, stockData);
  }

  // Delete a stock
  @Delete(':id')
  deleteStock(@Param('id') id: string): Promise<{ deleted: boolean }> {
    return this.stocksService.deleteStock(id);
  }
}
