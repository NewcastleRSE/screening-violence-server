import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Req,
  Res,
} from '@nestjs/common';
import { ClipsService } from './clips.service';
import * as _ from 'lodash';
import { LocsService } from '../locs/locs.service';

@Controller('api')
export class ClipsController {
  constructor(
    private clipsService: ClipsService,
    private locsService: LocsService,
  ) {}

  @Get('allclips')
  async getAllClips(@Res() res, @Req() request) {
    let language = request.query.lang;

    // if not provided or an incorrect code
    if (!language) {
      language = 'en';
    } else if (!this.checkLanguageValid(language)) {
      language = 'en';
    } else {
      const clips = await this.clipsService.findAll(language);
      return res.status(HttpStatus.OK).json(clips);
    }
  }

  // test against expected languages
  checkLanguageValid(language) {
    const validLanguages = ['en', 'es', 'fr'];
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
        throw new HttpException('ID does not exist', HttpStatus.NOT_FOUND);
      }
    });
  }

  // all locations
  @Get('locs')
  async getAllLocations(@Res() res, @Req() request) {
    let language = request.query.lang;

    if (!language) {
      language = 'en';
    } else if (!this.checkLanguageValid(language)) {
      language = 'en';
    }

    const locations = [];
    this.clipsService.findAll(language).then((clips) => {
      clips.forEach((clip) => {
        locations.push(clip.location);
      });
      return res.status(HttpStatus.OK).json(_.uniq(locations));
    });
  }

  @Get('locsInfo')
  async getLocsWithInfo(@Res() res, @Req() request) {
    let language = request.query.lang;

    if (!language) {
      language = 'en';
    } else if (!this.checkLanguageValid(language)) {
      language = 'en';
    }

    const locations = [];
    this.clipsService.findAll(language).then((clips) => {
      clips.forEach((clip) => {
        locations.push(clip.location);
      });

      // count number of occurrences of each
      const locMap = _.countBy(locations);

      // get lat and long
      this.locsService.findAll(language).then((locsInfo) => {
        // console.log(locsInfo)
        // make copy of list and add new parameter
        let locationsObjects = [];
        Object.keys(locsInfo).forEach((key) => {
          locationsObjects[key] = locsInfo[key];
        });
        locationsObjects = locationsObjects.map((v) => {
          const o = Object.assign({}, v);
          o.appearances = 0;
          return o;
        });

        const listToReturn = [];
        // update appearances if present
        for (let i = 0; i < locationsObjects.length; i++) {
          let displayName;
          let lat;
          let long;
          let name;
          let appears;
          let description;
          if (locationsObjects[i].displayName) {
            displayName = locationsObjects[i].displayName;
          }
          if (locationsObjects[i].description) {
            description = locationsObjects[i].description;
          }
          if (locationsObjects[i].lat) {
            lat = locationsObjects[i].lat;
          }
          if (locationsObjects[i].long) {
            long = locationsObjects[i].long;
          }
          if (locationsObjects[i].name) {
            name = locationsObjects[i].name;
          }
          if (locMap[name]) {
            appears = locMap[name];
          }

          if (appears != undefined) {
            locationsObjects[i].appearances = appears;
          }

          const locObject = {
            name,
            displayName,
            lat,
            long,
            appearances: locationsObjects[i].appearances,
            description,
          };

          listToReturn.push(locObject);
        }

        return res.status(HttpStatus.OK).json(listToReturn);
      });
    });
  }

  // description for single location
  @Get('locDesc')
  async getInfoForSingleLoc(@Req() request, @Res() res) {
    if (!request.query.loc || !request.query.lang) {
      throw new HttpException(
          'Missing query parameter',
          HttpStatus.BAD_REQUEST,
      );
    }

    let language = request.query.lang;

    if (!language) {
      language = 'en';
    } else if (!this.checkLanguageValid(language)) {
      language = 'en';
    }

    let location = request.query.loc;

    const desc = await this.locsService.getDescriptionForLoc(language, location);
    return res
      .status(HttpStatus.OK)
      .json(desc);
  }

  // all clips for a location
  @Get('clips/loc')
  async getClipsForLocation(@Req() request, @Res() res) {
    if (!request.query.loc || !request.query.lang) {
      throw new HttpException(
        'Missing query parameter',
        HttpStatus.BAD_REQUEST,
      );
    }
    const location = request.query.loc;
    let language = request.query.lang;

    if (location === undefined) {
      throw new HttpException(
        'Missing query parameter',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!language) {
      language = 'en';
    } else if (!this.checkLanguageValid(language)) {
      language = 'en';
    }

    this.clipsService.findAll(language).then((clips) => {
      const matching = _.remove(clips, (o) => {
        return o.location === location;
      });

      return res.status(HttpStatus.OK).json(matching);
    });
  }

  // all tags
  @Get('tags')
  async getAlltags(@Req() request, @Res() res) {
    let language = request.query.lang;

    if (!language) {
      language = 'en';
    } else if (!this.checkLanguageValid(language)) {
      language = 'en';
    }
    const tags = [];
    this.clipsService.findAll(language).then((clips) => {
      clips.forEach((clip) => {
        clip.tags.forEach((tag) => {
          tags.push(tag);
        });
      });
      return res.status(HttpStatus.OK).json(_.countBy(tags));
    });
  }

  // all clips for a tag
  @Get('clips/tag')
  async getClipsForTag(@Req() req, @Res() res) {
    let language = req.query.lang;

    if (!language) {
      language = 'en';
    } else if (!this.checkLanguageValid(language)) {
      language = 'en';
    }

    const tag = req.query.tag;
    console.log(tag);
    this.clipsService.findAll(language).then((clips) => {
      const matching = _.remove(clips, (o) => {
        return o.tags.includes(tag);
      });

      return res.status(HttpStatus.OK).json(matching);
    });
  }
}
