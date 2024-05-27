import { Module } from '@nestjs/common';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import {TypeOrmModule} from "@nestjs/typeorm"
import { Players } from './players.entity';
import { Matches } from 'src/matches/matches.entity';
import { League } from 'src/league/league.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Players]), TypeOrmModule.forFeature([Matches]), TypeOrmModule.forFeature([League])],
  controllers: [PlayersController],
  providers: [PlayersService],
  exports: [PlayersService]
})
export class PlayersModule {}
