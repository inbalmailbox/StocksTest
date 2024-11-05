import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'stocksCollection' })
export class Stock extends Document {
  @Prop()
  symbol: string;

  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  stockExchange: string;

  @Prop()
  exchangeShortName: string;
}

export const StockSchema = SchemaFactory.createForClass(Stock);
