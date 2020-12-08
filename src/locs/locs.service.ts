import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Loc, LocDocument } from './locs.schema';
import { Model } from 'mongoose';
import { LocDto } from './loc.dto';

@Injectable()
export class LocsService {
  constructor(@InjectModel(Loc.name) private locModel: Model<LocDocument>) {}

  async findAll(language): Promise<LocDto[]> {
    const allLocs = await this.locModel.find().exec();
    const langSpecificLocs = [];
    allLocs.forEach((loc) => {
      langSpecificLocs.push(this.buildLanguageSpecificLoc(loc, language));
    });
    return langSpecificLocs;
  }

  buildLanguageSpecificLoc(loc, language) {
    // default is english
    let displayName = loc.displayNameen;

    // change for Spanish
    if (language === 'es') {
      if (loc.displayNamees) {
        displayName = loc.displayNamees;
      }
    }

    // build dto
    const langSpecificLoc = {
      _id: loc._id,
      name: loc.name,
      displayName,
      lat: loc.lat,
      long: loc.long,
    };

    return langSpecificLoc;
  }
}
