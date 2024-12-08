// server/src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StockModule } from '../stocks/stock.module'; // import your Stock module
import { UserModule } from '../users/user.module'; // import your User module
import { ConfigModule } from '@nestjs/config';
import { StocksController } from '../stocks/stock.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://inbalmailbox:Hq96MA7xvIe3de5U@cluster0.m5s68.mongodb.net/stocks?retryWrites=true&w=majority&appName=Cluster0'),
    ConfigModule.forRoot({
      isGlobal: true, // Makes the ConfigModule available throughout the application
    }),
    StockModule,
    UserModule,
  ],
  controllers: [StocksController],
})
export class AppModule {}
