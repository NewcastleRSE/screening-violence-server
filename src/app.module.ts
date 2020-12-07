import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ClipsModule } from './clips/clips.module';
import { LocsModule } from './locs/locs.module';
import { CsvConvertService } from './csv-convert/csv-convert.service';
import { CsvConvertController } from './csv-convert/csv-convert.controller';
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
    LocsModule
  ],

  controllers: [AppController, CsvConvertController],
  providers: [AppService, CsvConvertService],
})
export class AppModule {}
