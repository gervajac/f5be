import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import { League } from './league.entity';
import { Matches } from 'src/matches/matches.entity';
import {Repository} from "typeorm";
import { Players } from 'src/players/players.entity';

@Injectable()
export class LeagueService {

    constructor(@InjectRepository(Players) private playersRepository: Repository<Players>,
    @InjectRepository(League) private leagueRepository: Repository<League>,
    @InjectRepository(Matches) private matchesRepository: Repository<Matches>) {}


    async getLeagues() {
        try {
            const ligas = await this.leagueRepository.find({ relations: ['players'] });
            if (!ligas || ligas.length === 0) {
                throw new HttpException('No se encontraron ligas', HttpStatus.NOT_FOUND);
            }
            return {
                message: 'Ligas encontradas exitosamente',
                count: ligas.length,
                ligas: ligas
            };
        } catch (err) {
            throw new HttpException('Error al encontrar ligas', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getOneLeague(leagueName, shortBy) {
        console.log(leagueName, shortBy, "LEAGUENAMEEEEEE")
        try {
            const ligas = await this.leagueRepository.findOne({ where: [{ name: leagueName }], relations: ['players', 'matches'] });
            console.log(ligas, "LIGA ENCONTRADA")
            const ligasTotales = await this.leagueRepository.find();
            console.log(ligasTotales, "ligas totales")
            if (!ligas) {
                throw new HttpException('No se encontraron ligas', HttpStatus.NOT_FOUND);
            }
            console.log(ligas.matches,"11111")
            console.log(ligas.players,"22222")
            if(ligas.matches.length === 0 && ligas.players.length === 0) {
                console.log("ENTRA ACA???")
                return {
                    message: 'Ligas encontradas exitosamente',
                    ligas: ligas,
                    players: ligas.players,
                    ligasTotales: ligasTotales,
                    ultimoPartido: null,
                    recentMatches: null
                };
            }

            if(ligas.matches.length === 0 && ligas.players.length !== 0) {
                console.log("ENTRA ACA???")
                return {
                    message: 'Ligas encontradas exitosamente',
                    ligas: ligas,
                    players: [ligas.players],
                    ligasTotales: ligasTotales,
                    ultimoPartido: null,
                    recentMatches: null
                };
            }

            const ultimoPartido = ligas.matches[ligas.matches.length - 1];
            const played = ultimoPartido.winner || ultimoPartido.tie ? true : false;
    
            // Obtener los últimos 10 partidos
            const recentMatches = ligas.matches.slice(Math.max(ligas.matches.length - 10, 0));
            // Contar cuántas veces aparece cada jugador como ganador y perdedor
            const playersWithStats = ligas.players.map(player => {
                const winnerCount = ligas.matches.filter(match => match.winner && match.winner.includes(player.fullname)).length;
                const loserCount = ligas.matches.filter(match => match.losser && match.losser.includes(player.fullname)).length;
                const tieCount = ligas.matches.filter(match => match.tie && (match.winner.includes(player.fullname) || match.losser.includes(player.fullname))).length;
                const matchesPlayed = winnerCount + loserCount
                return {
                    ...player,
                    winnerCount,
                    loserCount,
                    tieCount,
                    matchesPlayed
                };
            });
            let PlayersFiltered = []
            if(shortBy === "empty") {
               const PlayersWinners = playersWithStats.sort((a, b) => b.winnerCount - a.winnerCount);
               PlayersFiltered.push(PlayersWinners)
            }
            if(shortBy === "matchesplayed"){
                const PlayersPlayed = playersWithStats.sort((a, b) => b.matchesPlayed - a.matchesPlayed);
                PlayersFiltered.push(PlayersPlayed)
            }
            if(shortBy === "matcheswinning"){
                const PlayersWinners = playersWithStats.sort((a, b) => b.winnerCount - a.winnerCount);
                PlayersFiltered.push(PlayersWinners)
            }
            if(shortBy === "matchestied"){
                const PlayersTied = playersWithStats.sort((a, b) => b.tieCount - a.tieCount);
                PlayersFiltered.push(PlayersTied)
            }
            if(shortBy === "matcheslosing"){
                const PlayersTied = playersWithStats.sort((a, b) => b.loserCount - a.loserCount);
                PlayersFiltered.push(PlayersTied)
            }
            
            return {
                message: 'Ligas encontradas exitosamente',
                ligas: ligas,
                players: PlayersFiltered,
                ligasTotales: ligasTotales,
                ultimoPartido: played ? null : ultimoPartido,
                recentMatches: recentMatches
            };
        } catch (err) {
            throw new HttpException('Error al encontrar ligas', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async postLeague(league) {
        try {
            const duplicateLeague = await this.leagueRepository.findOne({
                where: [
                    { name: league.name }
                ]
            });
            if (duplicateLeague) {
                throw new Error('Liga existente');
            }
            const newLeague = this.leagueRepository.create(league);
            const savedLeague = await this.leagueRepository.save(newLeague);
            return {
                message: 'Liga creada exitosamente',
                league: savedLeague
            };
        } catch (err) {
            console.log(err);
            throw new HttpException('Error al crear Liga', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
