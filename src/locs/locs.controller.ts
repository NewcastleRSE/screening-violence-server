import { Controller } from '@nestjs/common';
import {LocsService} from "./locs.service";

@Controller('api/locs')
export class LocsController {
    constructor(
        private locsService: LocsService
    ) {
    }

}
