import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { League } from 'src/league/league.entity';
import { Matches } from './matches.entity';
import { Players } from 'src/players/players.entity';


@Injectable()
export class MatchesService {

    constructor(@InjectRepository(Players) private playersRepository: Repository<Players>,
    @InjectRepository(League) private leagueRepository: Repository<League>,
    @InjectRepository(Matches) private matchesRepository: Repository<Matches>) {}


    async addMatch(date: Date, leagueId: any, team1: string[], team2: string[]): Promise<{ message: string, matchId: number }> {
        try {
            const league = await this.leagueRepository.findOne({where: leagueId});
            if (!league) {
                throw new HttpException('La liga especificada no existe', HttpStatus.NOT_FOUND);
            }

            const match = new Matches();
            match.date = date;
            match.league = league;
            match.team1 = team1;
            match.team2 = team2;

            const savedMatch = await this.matchesRepository.save(match);

            return { message: 'Partido agregado exitosamente', matchId: savedMatch.id };
        } catch (error) {
            console.error('Error al agregar el partido:', error);
            throw new HttpException('Ocurrió un error al procesar la solicitud', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateMatch(id: any, winner: string[], losser: string[], tie: boolean = false): Promise<Matches> {
      console.log("entra aca?", id)
        const match = await this.matchesRepository.findOne({where:{id: id}});
        if (!match) {
          throw new NotFoundException(`Match with ID ${id} not found.`);
        }
        console.log(match, "match")
        if (match.winner || match.losser || match.tie) {
          throw new Error(`Match with ID ${id} already has winner, losser or tie set.`);
        }
    
        match.winner = winner;
        match.losser = losser;
    
        if (tie) {
          match.tie = [...winner, ...losser];
        }
        console.log(match, "postadded")
        return this.matchesRepository.save(match);
      }

};


