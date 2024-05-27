import { Controller, Get, Post, Delete, Body, Req, UseGuards, Patch, Param, NotFoundException } from '@nestjs/common';
import { PlayersService } from './players.service';
import { request } from 'express';

@Controller('players')
export class PlayersController {

    constructor(private PlayersService: PlayersService){}

    @Get()
    async getPlayers(@Req() request) {
        console.log(`Solicitud recibida en ${request.method} ${request.path}`);
        try {
            return await this.PlayersService.getPlayers();
        } catch (error) {
            return error; 
        }
    }

    @Post()
    async PostPlayer(@Req() player) {
        return this.PlayersService.PostPlayer(player.body)
    }

    @Post("/login")
    loginUser(@Body() newUser) {
      console.log(newUser, "newuser")
       return this.PlayersService.loginUser(newUser)
    }


}
