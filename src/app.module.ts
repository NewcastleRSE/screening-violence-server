import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ClipsModule } from './clips/clips.module';
import { LocsModule } from './locs/locs.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }),
    ClipsModule,
    LocsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
