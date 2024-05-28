import { Controller, Get, Post, Body, Req, Param, HttpException, HttpStatus } from '@nestjs/common';
import { LeagueService } from './league.service';

@Controller('league')
export class LeagueController {
    constructor(private leagueService: LeagueService) {}

    @Get()
    async getLeagues(@Req() request) {
        try {
            return await this.leagueService.getLeagues();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':leagueName/:shortBy')
    async getOneLeague(@Param('leagueName') leagueName: string, @Param('shortBy') shortBy: string) {
        try {
            return await this.leagueService.getOneLeague(leagueName, shortBy);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post()
    async postLeague(@Body() league) {
        try {
            return await this.leagueService.postLeague(league);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}