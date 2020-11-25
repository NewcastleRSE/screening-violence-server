import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
export type LocDocument = Loc & Document;

@Schema()
export class Loc {
    _id: Types.ObjectId;

    @Prop()
    name: string;

    @Prop()
    displayName: string;

    @Prop()
    lat: string;

    @Prop()
    long: string;
}

export const LocSchema = SchemaFactory.createForClass(Loc);
