import { Controller, Get, Post, Delete, Body, Req, UseGuards, Patch, Param, NotFoundException } from '@nestjs/common';
import { PlayersService } from './players.service';
import { Request } from 'express';

@Controller('players')
export class PlayersController {
    constructor(private playersService: PlayersService) {}

    @Get()
    async getPlayers(@Req() request: Request) {
        console.log(`Solicitud recibida en ${request.method} ${request.path}`);
        try {
            return await this.playersService.getPlayers();
        } catch (error) {
            return error; 
        }
    }

    @Post()
    async postPlayer(@Body() player: any) {
        return this.playersService.postPlayer(player);
    }

    @Post("/login")
    async loginUser(@Body() newUser: any) {
        console.log(newUser, "newuser");
        return this.playersService.loginUser(newUser);
    }
}
