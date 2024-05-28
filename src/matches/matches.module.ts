import { Module } from '@nestjs/common';
import { MatchesController } from './matches.controller';
import { MatchesService } from './matches.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MatchesSchema, Matches } from './schemas/matches.schema';
import { LeagueSchema, League } from 'src/league/schemas/league.schema';
import { Players, PlayersSchema } from 'src/players/schemas/players.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Matches.name, schema: MatchesSchema },
      { name: League.name, schema: LeagueSchema },
      { name: Players.name, schema: PlayersSchema },
    ]),
  ],
  controllers: [MatchesController],
  providers: [MatchesService],
  exports: [MatchesService] // Exporta MatchesService
})
export class MatchesModule {}
