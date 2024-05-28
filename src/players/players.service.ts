import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Players } from './schemas/players.schema';
import { League } from 'src/league/schemas/league.schema';
import { Matches } from 'src/matches/schemas/matches.schema';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class PlayersService {
    constructor(
        @InjectModel(Players.name) private playersModel: Model<Players>,
        @InjectModel(League.name) private leagueModel: Model<League>,
    ) {}

    async loginUser(loginData: any) {
        try {
            console.log(loginData, "LOGITANDATA");
            const user = await this.playersModel.findOne({
                fullname: loginData.fullname,
                password: loginData.password
            });

            console.log(user, "userenc");
            if (!user) {
                throw new HttpException("No se encontró usuario", HttpStatus.NOT_FOUND);
            }
            const isPasswordValid = user.password === loginData.password;
            if (!isPasswordValid) {
                throw new HttpException("Contraseña inválida", HttpStatus.UNAUTHORIZED);
            }
            const token = jwt.sign(
                { id: user.id, fullname: user.fullname, admin: user.admin },
                "9zp9zp12345",
                { expiresIn: "4h" }
            );
            console.log(token, "TOKENNNNNNNNN");
            return { token: token };
        } catch (error) {
            throw new HttpException("Error al autenticar usuario", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getPlayers() {
        try {
            const players = await this.playersModel.find().exec();
            if (!players || players.length === 0) {
                throw new HttpException('No se encontraron jugadores', HttpStatus.NOT_FOUND);
            }
            return {
                message: 'Jugadores encontrados exitosamente',
                count: players.length,
                players: players
            };
        } catch (err) {
            throw new HttpException('Error al encontrar jugadores', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async postPlayer(playerData: any) {
        try {
            console.log(playerData, "dataplayer");
            const { leagueId, ...player } = playerData;
            const duplicateUser = await this.playersModel.findOne({ fullname: player.fullname }).exec();
            console.log(duplicateUser, "dup?");
            if (duplicateUser) {
                throw new HttpException('El usuario ya existe', HttpStatus.BAD_REQUEST);
            }

            const newPlayer = new this.playersModel(player);
            const savedPlayer = await newPlayer.save();

            if (leagueId) {
                const league = await this.leagueModel.findById(leagueId).populate('players').exec();
                console.log(league, "leagueee");
                if (!league) {
                    throw new HttpException('Liga no encontrada', HttpStatus.NOT_FOUND);
                }

                league.players.push(savedPlayer.id);
                await league.save();
            }

            return {
                message: 'Jugador creado exitosamente',
                player: savedPlayer
            };
        } catch (err) {
            console.log(err);
            throw new HttpException('Error al crear jugador', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}