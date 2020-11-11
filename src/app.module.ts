import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ClipsModule } from './clips/clips.module';
import { LocsModule } from './locs/locs.module';





@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/screening'),
    ClipsModule,
    LocsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
