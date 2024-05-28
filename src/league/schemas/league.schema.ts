import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Matches } from 'src/matches/schemas/matches.schema';
import { Players } from 'src/players/schemas/players.schema';

@Schema()
export class League extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    days: string;

    @Prop({ required: true })
    stadium: string;

    @Prop({ required: true })
    hour: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Matches' }] }) // Cambiar a referencia a los partidos
    matches: Matches[]; // Cambiar a plural

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Players' }] })
    players: Players[];

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;
}

export const LeagueSchema = SchemaFactory.createForClass(League);