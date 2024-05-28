import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { MatchesModule } from './matches/matches.module';
import { LeagueModule } from './league/league.module';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';

mongoose.set('debug', true); // Enable Mongoose debugging

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://gervajac:Gervajacob123@f5cluster.qvbv6qx.mongodb.net/?retryWrites=true&w=majority&appName=f5cluster', {
      retryAttempts: 5, // Customize retry attempts
      retryDelay: 3000, // Customize retry delay in milliseconds
    }),
    PlayersModule,
    MatchesModule,
    LeagueModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}