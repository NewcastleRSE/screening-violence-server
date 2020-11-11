import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Loc, LocDocument} from "./locs.schema";
import {Model} from "mongoose";

@Injectable()
export class LocsService {
    constructor(
        @InjectModel(Loc.name) private locModel: Model<LocDocument>
    ) {
    }

    async findAll(): Promise<Loc[]> {
        return this.locModel.find().exec();
}

}
