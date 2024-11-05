// server/src/users/schemas/user.schema.ts
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  portfolio: string[]; // array of stock IDs or tickers
}

export const UserSchema = SchemaFactory.createForClass(User);
