import { Module } from '@nestjs/common';
import { LocsService } from './locs.service';
import { LocsController } from './locs.controller';
import {MongooseModule} from "@nestjs/mongoose";
import { Loc, LocSchema } from './locs.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Loc.name, schema: LocSchema }])],
  providers: [LocsService],
  controllers: [LocsController],
  exports: [LocsService],
})
export class LocsModule {}
