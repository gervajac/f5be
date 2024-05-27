import { Controller, Get, Post, Delete, Body, Req, UseGuards, Patch, Param, NotFoundException } from '@nestjs/common';
import { LeagueService } from './league.service';

@Controller('league')
export class LeagueController {

    constructor(private LeagueService: LeagueService){}

    @Get()
    async getLeagues(@Req() request) {
        try {
            return await this.LeagueService.getLeagues();
        } catch (error) {
            return error; 
        }
    }

    @Get(':leagueName/:shortBy') 
    async getOneLeague(@Param('leagueName') leagueName: string,  @Param('shortBy') shortBy: string) { 
        try {
            console.log(leagueName, "leaguenameee")
            return await this.LeagueService.getOneLeague(leagueName, shortBy);
        } catch (error) {
            return error; 
        }
    }

    @Post()
    async PostPlayer(@Req() league) {
        return this.LeagueService.postLeague(league.body)
    }


}
