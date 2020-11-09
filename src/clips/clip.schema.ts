import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ClipDocument = Clip & Document;

@Schema()
export class Clip {
   _id: Types.ObjectId;

   @Prop()
   name: string;

    @Prop()
    url: string;

    @Prop()
    location: string;

    @Prop()
    tags: [string];
}

export const ClipSchema = SchemaFactory.createForClass(Clip);
