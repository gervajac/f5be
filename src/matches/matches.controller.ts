import { Controller, Post, Body, Res, HttpStatus, Patch, Param, NotFoundException } from '@nestjs/common';
import { MatchesService } from './matches.service';

@Controller('matches')
export class MatchesController {

    constructor(private matchesService: MatchesService) {}

    @Post()
    async addMatch(@Body() requestBody, @Res() res) {
        try {
            const { date, leagueId, team1, team2 } = requestBody;
            const { message, matchId } = await this.matchesService.addMatch(date, leagueId, team1, team2);
            return res.status(HttpStatus.CREATED).json({ message, matchId });
        } catch (error) {
            console.error('Error al agregar el partido:', error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Ocurrió un error al procesar la solicitud' });
        }
    }

    @Patch()
    async updateMatch(@Body() requestBody, @Res() res) {
        try {
            const { winner, losser, tie, id } = requestBody;
            const updatedMatch = await this.matchesService.updateMatch(id, winner, losser, tie);
            return res.status(HttpStatus.OK).json(updatedMatch);
        } catch (error) {
            console.error('Error al actualizar el partido:', error);
            if (error instanceof NotFoundException) {
                return res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
            } else {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Ocurrió un error al procesar la solicitud' });
            }
        }
    }
}
