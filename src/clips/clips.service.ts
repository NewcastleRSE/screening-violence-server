import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Clip, ClipDocument } from './clip.schema';
import { Model } from 'mongoose';
import { ClipDto } from './clip.dto';

@Injectable()
export class ClipsService {
  constructor(@InjectModel(Clip.name) private clipModel: Model<ClipDocument>) {}

  async findAll(language): Promise<ClipDto[]> {
    const allClips = await this.clipModel.find().exec();
    const langSpecificClips = [];
    allClips.forEach((clip) => {
      langSpecificClips.push(this.buildLanguageSpecificClip(clip, language));
    });

    return langSpecificClips;
  }

  // NOTE update this method when adding any new fields available in different languages
  buildLanguageSpecificClip(clip, language) {
    // build language specific clip

    // default is english
    let name = clip.nameen;
    let tags = clip.tagsen;
    let displayLocation = clip.displayLocationen;
    let description = clip.descriptionen;

    // change for Spanish
    if (language === 'es') {
      if (clip.namees) {
        name = clip.namees;
      }
      if (clip.tagses) {
        tags = clip.tagses;
      }
      if (clip.displayLocationes) {
        displayLocation = clip.displayLocationes;
      }
      if (clip.descriptiones) {
        description = clip.descriptiones;
      }
    }

    // build dto
    const langSpecificClip = {
      _id: clip._id,
      name,
      shortid: clip.shortid,
      url: clip.url,
      location: clip.location,
      displayLocation,
      filmmaker: clip.filmmaker,
      duration: clip.duration,
      tags,
      thumbnail: clip.thumbnail,
      description,
    };

    return langSpecificClip;
  }

  // async findByShortId(id) {
  //    this.findAll().then((clips) => {
  //         clips.forEach((clip) => {
  //             if (clip.shortid === id) {
  //                 return clip;
  //             }
  //         });
  //     });
  // }
}
