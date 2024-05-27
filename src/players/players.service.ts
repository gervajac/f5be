import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import { Players } from './players.entity';
import { League } from 'src/league/league.entity';
import { Matches } from 'src/matches/matches.entity';
import * as jwt from 'jsonwebtoken'
import {Repository} from "typeorm";

@Injectable()
export class PlayersService {

    constructor(@InjectRepository(Players) private playersRepository: Repository<Players>,
    @InjectRepository(League) private leagueRepository: Repository<League>,
    @InjectRepository(Matches) private matchesRepository: Repository<Matches>) {}

    async loginUser(loginData) {
        try {
        console.log(loginData,"LOGITANDATA")
          const user = await this.playersRepository.findOne({
            where: [
              { fullname: loginData.fullname },
              { password: loginData.password }
            ]
          });

          console.log(user, "userenc")
          if (!user) {
            throw new HttpException("No se encontró usuario", HttpStatus.NOT_FOUND);
          }
          const isPasswordValid = user.password === loginData.password;
          if (!isPasswordValid) {
            throw new HttpException("Contraseña inválida", HttpStatus.UNAUTHORIZED);
          }
          const token = jwt.sign({id: user.id, fullname: user.fullname, admin: user.admin}, "9zp9zp12345", {expiresIn: "4h"})
          console.log(token, "TOKENNNNNNNNN")
          return {
            token: token
          };
        } catch (error) {
          // Manejo de errores
          throw new HttpException("Error al autenticar usuario", HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }


    async getPlayers() {
        try {
            const players = await this.playersRepository.find();
            if (!players || players.length === 0) {
                throw new HttpException('No se encontraron jugadores', HttpStatus.NOT_FOUND);
            }
            return {
                message: 'Jugadores encontrados exitosamente',
                count: players.length,
                players: players
            };
        } catch (err) {
            // Si ocurre algún error, lanzamos una excepción 500 con un mensaje genérico
            throw new HttpException('Error al encontrar jugadores', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async PostPlayer(playerData) {
        try {
          console.log(playerData, "dataplayer")
            const { leagueId, ...player } = playerData;
            const duplicateUser = await this.playersRepository.findOne({ where: { fullname: player.fullname } });
            console.log(duplicateUser, "dup?")
            if (duplicateUser) {
                throw new Error('User already exists');
            }
    
            const newPlayer = this.playersRepository.create(player);
            const savedPlayer: any = await this.playersRepository.save(newPlayer);
            
            if (leagueId) {
                const league = await this.leagueRepository.findOne({ 
                    where: { id: leagueId },
                    relations: ['players']
                });
                console.log(league, "leagueee")
                if (!league) {
                    throw new Error('League not found');
                }
            
                // Asigna el jugador a la lista de jugadores de la liga
                league.players.push(savedPlayer);
                
                // Guarda la liga con el jugador agregado
                await this.leagueRepository.save(league);
            }
    
            return {
                message: 'Jugador creado exitosamente',
                player: savedPlayer
            };
        } catch (err) {
            console.log(err);
            throw new HttpException('Error al crear Jugador', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
