import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { MatchesModule } from './matches/matches.module';
import { LeagueModule } from './league/league.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: "postgres",
    host: "bgaqf60lh4ieqf9o19hx-postgresql.services.clever-cloud.com",
    port: 50013,
    username: "udlwuwelr1s0mlhzzdnk",
    password: "wkq8Jbo6fKvGZ1AMIvP1NfuOtTwVtG",
    database: "bgaqf60lh4ieqf9o19hx",
    entities: [__dirname + "/**/*.entity{.ts,.js}"],
    synchronize: true
  }), PlayersModule, MatchesModule, LeagueModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
