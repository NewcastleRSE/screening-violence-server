import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Loc, LocDocument } from './locs.schema';
import { Model } from 'mongoose';
import { LocDto } from './loc.dto';
import * as _ from 'lodash';

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

  async getDescriptionForLoc(language, loc) {
    const all = await this.findAll(language);
    const locList = _.remove(all, (o) => {
      return o.name === loc;
    })
    if (locList[0]) {
      return locList[0].description;
    }
  }

  buildLanguageSpecificLoc(loc, language) {
    // default is english
    let displayName = loc.displayNameen;
  let description = loc.descriptionen;

    // change for Spanish
    if (language === 'es') {
      if (loc.displayNamees) {
        displayName = loc.displayNamees;
      }

      if (loc.descriptiones) {
        description = loc.descriptiones;
      }
    }

    // change for French
    if (language === 'fr') {
      if (loc.displayNamefr) {
        displayName = loc.displayNamefr;
      }
      if (loc.descriptionfr) {
        description = loc.descriptionfr;
      }
    }


    // build dto
    const langSpecificLoc = {
      _id: loc._id,
      name: loc.name,
      displayName,
      lat: loc.lat,
      long: loc.long,
      description
    };

    return langSpecificLoc;
  }
}
