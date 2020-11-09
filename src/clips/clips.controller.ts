import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ClipsService } from './clips.service';

@Controller('clips')
export class ClipsController {

    constructor(private clipsService: ClipsService) {
    }

    @Get('all')
    async getAllClips(@Res() res) {
        const clips = await this.clipsService.findAll();
        return res.status(HttpStatus.OK).json(clips);
    }

}
