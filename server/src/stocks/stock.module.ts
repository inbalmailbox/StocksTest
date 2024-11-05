// server/src/stocks/stock.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios'; // Import HttpModule from @nestjs/axios
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { Stock, StockSchema } from './schemas/stock.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Stock.name, schema: StockSchema }]),
    HttpModule, // Import HttpModule here
  ],
  providers: [StockService],
  controllers: [StockController],
})
export class StockModule {}
