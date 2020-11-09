import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Clip, ClipSchema } from './clip.schema';
import { ClipsService } from './clips.service';
import { ClipsController } from './clips.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Clip.name, schema: ClipSchema }]),
    ],
    providers: [ClipsService],
    controllers: [ClipsController]
})
export class ClipsModule {}
