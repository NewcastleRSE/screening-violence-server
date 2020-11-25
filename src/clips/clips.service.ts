import {HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Clip, ClipDocument} from "./clip.schema";
import {Model} from "mongoose";

@Injectable()
export class ClipsService {
    constructor(
        @InjectModel(Clip.name) private clipModel: Model<ClipDocument>
    ) {
    }


    async findAll(): Promise<Clip[]> {
        return this.clipModel.find().exec();
    }


    async findByShortId(id) {
       this.findAll().then((clips) => {
            clips.forEach((clip) => {
                if (clip.shortid === id) {
                    return clip;
                }
            });
        });
    }
}
