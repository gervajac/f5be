import { Module } from '@nestjs/common';
import { LeagueController } from './league.controller';
import { PlayersController } from 'src/players/players.controller';
import { MatchesController } from 'src/matches/matches.controller';
import { LeagueSchema, League } from './schemas/league.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { LeagueService } from './league.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Players, PlayersSchema } from 'src/players/schemas/players.schema';
import { Matches, MatchesSchema } from 'src/matches/schemas/matches.schema'; // Importar Matches y MatchesSchema
import { PlayersModule } from 'src/players/players.module'; // Importar PlayersModule

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: League.name, schema: LeagueSchema },
      { name: Players.name, schema: PlayersSchema },
      { name: Matches.name, schema: MatchesSchema } // Agregar el schema de Matches aquí
    ])
  ],
  controllers: [LeagueController],
  providers: [LeagueService],
  exports: [LeagueService]
})
export class LeagueModule {}