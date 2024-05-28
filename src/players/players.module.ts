import { Module } from '@nestjs/common';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import {TypeOrmModule} from "@nestjs/typeorm"
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersSchema, Players} from './schemas/players.schema';
import { LeagueSchema, League } from '../league/schemas/league.schema'; 
import { Matches, MatchesSchema } from 'src/matches/schemas/matches.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Players.name, schema: PlayersSchema },
      { name: League.name, schema: LeagueSchema },
      { name: Matches.name, schema: MatchesSchema }// Agrega LeagueModel aquí
    ])
  ],
  controllers: [PlayersController],
  providers: [PlayersService],
  exports: [PlayersService]
})
export class PlayersModule {}
