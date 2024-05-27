import { Controller, Post, Body, Res, HttpStatus, Patch, Param, } from '@nestjs/common';
import { MatchesService } from './matches.service';

@Controller('matches')
export class MatchesController {

    constructor(private MatchesService: MatchesService) {}

    @Post()
    async addMatch(@Body() requestBody, @Res() res) {
        try {
            const { date, leagueId, team1, team2 } = requestBody;
            console.log(date, leagueId, team1, team2)
            const { message, matchId } = await this.MatchesService.addMatch(date, leagueId, team1, team2);
            return res.status(HttpStatus.CREATED).json({ message, matchId });
        } catch (error) {
            console.error('Error al agregar el partido:', error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Ocurrió un error al procesar la solicitud' });
        }
    }

    @Patch(':id')
    async updateMatch(@Param('id') id: number, @Body() requestBody, @Res() res) {
        try {
            const { winner, losser, tie } = requestBody;
            const updatedMatch = await this.MatchesService.updateMatch(id, winner, losser, tie);
            return res.status(HttpStatus.OK).json(updatedMatch);
        } catch (error) {
            console.error('Error al actualizar el partido:', error);
            if (error.response && error.response.status) {
                return res.status(error.response.status).json(error.response.data);
            } else {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Ocurrió un error al procesar la solicitud' });
            }
        }
    }
}
