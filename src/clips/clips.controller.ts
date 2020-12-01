import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { ClipsService } from './clips.service';
import * as _ from 'lodash';
import { LocsService } from '../locs/locs.service';

@Controller('api')
export class ClipsController {
  constructor(
    private clipsService: ClipsService,
    private locsService: LocsService,
  ) {}

  // todo add error handling if can't find request

  @Get('allclips')
  async getAllClips(@Res() res, @Req() request) {
    let language = request.query.lang;

    // if not provided or an incorrect code
    if (!language) {
      language = 'en';
    } else if (!this.checkLanguageValid(language)) {
      language = 'en';
    }

    else {
      const clips = await this.clipsService.findAll(language);
      return res.status(HttpStatus.OK).json(clips);
    }



  }

  checkLanguageValid(language) {
    const validLanguages = ['en', 'es'];
    return _.includes(validLanguages, language);
  }

  // clips by short id
  @Get('clips/shortid')
  async getClipsForShortId(@Req() request, @Res() res) {
    let language = request.query.lang;

    if (!language) {
      language = 'en';
    } else if (!this.checkLanguageValid(language)) {
      language = 'en';
    }

    console.log(language);
    let found = false;
    this.clipsService.findAll(language).then((clips) => {
      const id = request.query.shortid;
      clips.forEach((clip) => {
        if (clip.shortid === id) {
          found = true;
          return res.status(HttpStatus.OK).json(clip);
        }
      });

      if (found === false) {
        console.log('found is not true');
        return res.status(HttpStatus.OK);
      }
    });
  }
  //
  // // all locations
  // @Get('locs')
  // async getAllLocations(@Res() res) {
  //   const locations = [];
  //   this.clipsService.findAll().then((clips) => {
  //     clips.forEach((clip) => {
  //       locations.push(clip.location);
  //     });
  //     return res.status(HttpStatus.OK).json(_.uniq(locations));
  //   });
  // }
  //
  // @Get('locsInfo')
  // async getLocsWithInfo(@Res() res) {
  //   const locations = [];
  //   this.clipsService.findAll().then((clips) => {
  //     clips.forEach((clip) => {
  //       locations.push(clip.location);
  //     });
  //
  //     // count number of occurances of each
  //     const locMap = _.countBy(locations);
  //
  //     // get lat and long
  //     this.locsService.findAll().then((locsInfo) => {
  //       // make copy of list and add new parameter
  //       let locationsObjects = [];
  //       Object.keys(locsInfo).forEach((key) => {
  //         locationsObjects[key] = locsInfo[key];
  //       });
  //       locationsObjects = locationsObjects.map((v) => {
  //         const o = Object.assign({}, v);
  //         o.appearances = 0;
  //         return o;
  //       });
  //
  //       const listToReturn = [];
  //       // update appearances if present
  //       for (let i = 0; i < locationsObjects.length; i++) {
  //         const displayName = locationsObjects[i]._doc.displayName;
  //         const lat = locationsObjects[i]._doc.lat;
  //         const long = locationsObjects[i]._doc.long;
  //         const name = locationsObjects[i]._doc.name;
  //         const appears = locMap[name];
  //
  //         if (appears != undefined) {
  //           locationsObjects[i].appearances = appears;
  //         }
  //
  //         const locObject = {
  //           name,
  //           displayName,
  //           lat,
  //           long,
  //           appearances: locationsObjects[i].appearances,
  //         };
  //         listToReturn.push(locObject);
  //       }
  //
  //       return res.status(HttpStatus.OK).json(listToReturn);
  //     });
  //   });
  // }
  //
  // all clips for a location
  @Get('clips/loc')
  async getClipsForLocation(@Req() request, @Res() res) {
    const location = request.query.loc;
    let language = request.query.lang;

    if (!language) {
      language = 'en';
    } else if (!this.checkLanguageValid(language)) {
      language = 'en';
    }

    // todo if location is undefined error handling

    this.clipsService.findAll(language).then((clips) => {
      const matching = _.remove(clips, (o) => {
        return o.location === location;
      });
      return res.status(HttpStatus.OK).json(matching);
    });
  }
  //
  // // all tagsen
  // @Get('tagsen')
  // async getAlltagsen(@Req() req, @Res() res) {
  //   const tagsen = [];
  //   this.clipsService.findAll().then((clips) => {
  //     clips.forEach((clip) => {
  //       clip.tagsen.forEach((tag) => {
  //         tagsen.push(tag);
  //       });
  //     });
  //     return res.status(HttpStatus.OK).json(_.countBy(tagsen));
  //   });
  // }
  //
  // // all clips for a tag
  // @Get('clips/tag')
  // async getClipsForTag(@Req() req, @Res() res) {
  //   const tag = req.query.tag.toLowerCase();
  //   this.clipsService.findAll().then((clips) => {
  //     const matching = _.remove(clips, (o) => {
  //       return o.tagsen.includes(tag);
  //     });
  //     return res.status(HttpStatus.OK).json(matching);
  //   });
  // }
}
