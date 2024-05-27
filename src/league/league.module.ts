import { Module } from '@nestjs/common';
import { LeagueController } from './league.controller';
import { PlayersController } from 'src/players/players.controller';
import { MatchesController } from 'src/matches/matches.controller';
import { Players } from 'src/players/players.entity';
import { Matches } from 'src/matches/matches.entity';
import { League } from './league.entity';
import { LeagueService } from './league.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Players]), TypeOrmModule.forFeature([Matches]), TypeOrmModule.forFeature([League])],
  controllers: [LeagueController],
  providers: [LeagueService],
  exports: [LeagueService]
})
export class LeagueModule {}
