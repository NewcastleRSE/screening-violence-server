import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
export type LocDocument = Loc & Document;

@Schema()
export class Loc {
    _id: Types.ObjectId;

    @Prop()
    name: string;

    @Prop()
    displayNameen: string;

    @Prop()
    displayNamees: string;

    @Prop()
    displayNamefr: string;

    @Prop()
    lat: string;

    @Prop()
    long: string;

    @Prop()
    descriptionen: string;

    @Prop()
    descriptiones: string;

    @Prop()
    descriptionfr: string;
}

export const LocSchema = SchemaFactory.createForClass(Loc);
