import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
export type ClipDocument = Clip & Document;

@Schema()
export class Clip {
  _id: Types.ObjectId;

  @Prop()
  nameen: string;

  @Prop()
  namees: string;

  @Prop()
  shortid: string;

  @Prop()
  url: string;

  @Prop()
  location: string;

  @Prop()
  displayLocationen: string;

  @Prop()
  displayLocationes: string;

  @Prop()
  filmmaker: string;

  @Prop()
  duration: Types.Decimal128;

  @Prop()
  tagsen: [string];

  @Prop()
  tagses: [string];

  @Prop()
  thumbnail: string;

  @Prop()
  descriptionen: string;

  @Prop()
  descriptiones: string;
}

export const ClipSchema = SchemaFactory.createForClass(Clip);
