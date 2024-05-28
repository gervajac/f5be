import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { League } from './schemas/league.schema';
import { Players } from 'src/players/schemas/players.schema';
import { Matches } from 'src/matches/schemas/matches.schema';

@Injectable()
export class LeagueService {
    constructor(
        @InjectModel(League.name) private leagueModel: Model<League>,
    ) {}

    async getLeagues() {
        try {
            const leagues = await this.leagueModel.find().populate('players').exec();
            if (!leagues || leagues.length === 0) {
                throw new HttpException('No se encontraron ligas', HttpStatus.NOT_FOUND);
            }
            return {
                message: 'Ligas encontradas exitosamente',
                count: leagues.length,
                leagues: leagues
            };
        } catch (err) {
            throw new HttpException('Error al encontrar ligas', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getOneLeague(leagueName: string, shortBy: string) {
        try {
            const league = await this.leagueModel
                .findOne({ name: leagueName })
                .populate({
                    path: 'players',
                    model: 'Players'
                })
                .populate({
                    path: 'matches',
                    model: 'Matches'
                })
                .exec();
            console.log(league, "LEAGUE")
            const allLeagues = await this.leagueModel.find().exec();
            if (!league) {
                throw new HttpException('No se encontraron ligas', HttpStatus.NOT_FOUND);
            }
    
            if (league.matches.length === 0 && league.players.length === 0) {
                return {
                    message: 'Ligas encontradas exitosamente 1',
                    league: league,
                    players: league.players,
                    allLeagues: allLeagues,
                    lastMatch: null,
                    recentMatches: null
                };
            }
      
            if (league.matches.length === 0 && league.players.length !== 0) {
                return {
                    message: 'Ligas encontradas exitosamente 2',
                    league: league,
                    players: league.players,
                    allLeagues: allLeagues,
                    lastMatch: null,
                    recentMatches: null
                };
            }
            console.log(league.matches.length, "length")
            const lastMatch = league.matches[league.matches.length - 1];
            console.log(lastMatch, "hay last match??")
            const played = lastMatch.winner.length >= 1 || lastMatch.tie.length >= 1 ? true : false;
    
            const recentMatches = league.matches.slice(Math.max(league.matches.length - 10, 0));
    
            const playersWithStats = league.players.map(player => {
                const winnerCount = league.matches.filter(match => match.winner && match.winner.includes(player.fullname)).length;
                const loserCount = league.matches.filter(match => match.losser && match.losser.includes(player.fullname)).length;
                const tieCount = league.matches.filter(match => match.tie.length >= 1 && (match.winner.includes(player.fullname) || match.losser.includes(player.fullname))).length;
                const matchesPlayed = winnerCount + loserCount;
                return {
                    ...player.toObject(),
                    winnerCount,
                    loserCount,
                    tieCount,
                    matchesPlayed
                };
            });
    
            let playersFiltered = [];
            if (shortBy === "empty") {
                const playersWinners = playersWithStats.sort((a, b) => b.winnerCount - a.winnerCount);
                playersFiltered = playersWinners;
            }
            if (shortBy === "matchesplayed") {
                const playersPlayed = playersWithStats.sort((a, b) => b.matchesPlayed - a.matchesPlayed);
                playersFiltered = playersPlayed;
            }
            if (shortBy === "matcheswinning") {
                const playersWinners = playersWithStats.sort((a, b) => b.winnerCount - a.winnerCount);
                playersFiltered = playersWinners;
            }
            if (shortBy === "matchestied") {
                const playersTied = playersWithStats.sort((a, b) => b.tieCount - a.tieCount);
                playersFiltered = playersTied;
            }
            if (shortBy === "matcheslosing") {
                const playersTied = playersWithStats.sort((a, b) => b.loserCount - a.loserCount);
                playersFiltered = playersTied;
            }
    
            return {
                message: 'Ligas encontradas exitosamente3',
                league: league,
                players: playersFiltered,
                allLeagues: allLeagues,
                lastMatch: played ? null : lastMatch,
                recentMatches: recentMatches
            };
        } catch (err) {
            throw new HttpException('Error al encontrar ligas', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async postLeague(league) {
        try {
            const duplicateLeague = await this.leagueModel.findOne({ name: league.name }).exec();
            if (duplicateLeague) {
                throw new HttpException('Liga existente', HttpStatus.BAD_REQUEST);
            }
            const newLeague = new this.leagueModel(league);
            const savedLeague = await newLeague.save();
            return {
                message: 'Liga creada exitosamente',
                league: savedLeague
            };
        } catch (err) {
            throw new HttpException('Error al crear Liga', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
