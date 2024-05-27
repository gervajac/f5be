import { Module } from '@nestjs/common';
import { MatchesController } from './matches.controller';
import { MatchesService } from './matches.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Matches } from './matches.entity';
import { League } from 'src/league/league.entity';
import { Players } from 'src/players/players.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Matches]), TypeOrmModule.forFeature([League]), TypeOrmModule.forFeature([Players])],
  controllers: [MatchesController],
  providers: [MatchesService],
  exports: [MatchesService]
})
export class MatchesModule {}
