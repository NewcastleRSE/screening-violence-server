import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { ClipsService } from './clips.service';
import * as _ from 'lodash';
import {LocsService} from "../locs/locs.service";

@Controller('api')
export class ClipsController {
  constructor(
      private clipsService: ClipsService,
       private locsService: LocsService
  ) {}

  @Get('allclips')
  async getAllClips(@Res() res) {
    const clips = await this.clipsService.findAll();
    return res.status(HttpStatus.OK).json(clips);
  }

  // all locations
  @Get('locs')
  async getAllLocations(@Res() res) {
    const locations = [];
    this.clipsService.findAll().then((clips) => {
      clips.forEach((clip) => {
        locations.push(clip.location);
      });
      return res.status(HttpStatus.OK).json(_.uniq(locations));
    });
  }

  @Get('locsInfo')
  async getLocsWithInfo(@Res() res) {
    const locations = [];
    this.clipsService.findAll().then((clips) => {
      clips.forEach((clip) => {
        locations.push(clip.location);
      });

      // count number of occurances of each
      let locMap = _.countBy(locations);

      // get lat and long
      this.locsService.findAll().then((locsInfo) => {

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

        // update appearances if present
        for (let i = 0; i < locationsObjects.length; i++) {
          const locName = locationsObjects[i].name;
          const appears = locMap[locName];

          if (appears != undefined) {
            locationsObjects[i].appearances = appears;
          }
        }
        return res.status(HttpStatus.OK).json(locationsObjects);
      })


    });
  }

  // all clips for a location
  @Get('clips/loc')
  async getClipsForLocation(@Req() request, @Res() res) {
    const location = request.query.loc;
    this.clipsService.findAll().then((clips) => {
      const matching = _.remove(clips, (o) => {
        return o.location === location;
      });
      return res.status(HttpStatus.OK).json(matching);
    });
  }

  // all tags
  @Get('tags')
  async getAllTags(@Req() req, @Res() res) {
    const tags = [];
    this.clipsService.findAll().then((clips) => {
      clips.forEach((clip) => {
        clip.tags.forEach((tag) => {
          tags.push(tag);
        });
      });
      return res.status(HttpStatus.OK).json(_.uniq(tags));
    });
  }

  // all clips for a tag
  @Get('clips/tag')
  async getClipsForTag(@Req() req, @Res() res) {
    const tag = req.query.tag.toLowerCase();
    this.clipsService.findAll().then((clips) => {
      const matching = _.remove(clips, (o) => {
        return o.tags.includes(tag);
      });
      return res.status(HttpStatus.OK).json(matching);
    });
  }
}
