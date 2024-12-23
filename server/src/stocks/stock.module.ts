// server/src/stocks/stock.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios'; // Import HttpModule from @nestjs/axios
import { StockService } from './stock.service';
import { StocksController } from './stock.controller';
import { Stock, StockSchema } from './schemas/stock.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Stock.name, schema: StockSchema }]),
    HttpModule, // Import HttpModule here
  ],
  providers: [StockService],
  exports: [StockService], // Export if used in other modules
  controllers: [StocksController],
})
export class StockModule {}
