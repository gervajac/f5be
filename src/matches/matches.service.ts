import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Matches } from './schemas/matches.schema';
import { League } from 'src/league/schemas/league.schema';

@Injectable()
export class MatchesService {

    constructor(
        @InjectModel(Matches.name) private matchesModel: Model<Matches>,
        @InjectModel(League.name) private leagueModel: Model<League>
    ) {}

    async addMatch(date: Date, leagueId: string, team1: string[], team2: string[]): Promise<{ message: string, matchId: string }> {
        try {
            const newMatch = new this.matchesModel({ date, league: leagueId, team1, team2 }); // Utilizar this.matchesModel para crear un nuevo partido
            const savedMatch = await newMatch.save();

            if (leagueId) {
                const league = await this.leagueModel.findById(leagueId).populate('matches').exec();
                if (!league) {
                    throw new HttpException('Liga no encontrada', HttpStatus.NOT_FOUND);
                }

                league.matches.push(savedMatch.id);
                await league.save();
            }
            console.log(savedMatch, "match guardado")
            return { message: 'Partido agregado exitosamente', matchId: savedMatch.id };
        } catch (error) {
            console.error('Error al agregar el partido:', error);
            throw new HttpException('Ocurrió un error al procesar la solicitud', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateMatch(id: string, winner: string[], losser: string[], tie: boolean = false): Promise<Matches> {
        try {
            console.log(id, "ID Q LLEGA")
            const match = await this.matchesModel.findById(id);
            console.log(match, "matchsss")
            if (!match) {
                throw new NotFoundException(`Partido con ID ${id} no encontrado.`);
            }

            if (match.winner.length >= 1 || match.losser.length >= 1 || match.tie.length >= 1) {
                throw new Error(`El partido con ID ${id} ya tiene definido el ganador, perdedor o empate.`);
            }

            match.winner = winner;
            match.losser = losser;

            if (tie) {
                match.tie = [...winner, ...losser];
            }

            return await match.save();
        } catch (error) {
            console.error('Error al actualizar el partido:', error);
            throw error;
        }
    }
}