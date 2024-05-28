import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { MatchesModule } from './matches/matches.module';
import { LeagueModule } from './league/league.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://gervajac:Gervajacob123@f5cluster.qvbv6qx.mongodb.net'),
    PlayersModule,
    MatchesModule,
    LeagueModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}