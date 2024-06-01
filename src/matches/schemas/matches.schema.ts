import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { League } from 'src/league/schemas/league.schema';
import { Types } from 'mongoose';

@Schema()
export class Matches extends Document {
  @Prop({ required: true })
  date: Date;

  @Prop({ type: [String], required: true })
  team1: string[]; // Array de nombres de jugadores del equipo 1

  @Prop({ type: [String], required: true })
  team2: string[]; // Array de nombres de jugadores del equipo 2

  @Prop({ type: [String], required: false })
  winner: string[]; // Nombre del equipo ganador, puede ser 'team1' o 'team2'

  @Prop({ type: [String], required: false })
  losser: string[]; // Nombre del equipo perdedor, puede ser 'team1' o 'team2'

  @Prop({ type: [String], required: false })
  tie: string[]; // Nombre del equipo empatado, puede ser 'team1' o 'team2'

  @Prop({ type: [{ type: Types.ObjectId, ref: 'League' }] })
  leagues: League[];

  @Prop({ type: Number })
  team1Goals: number; // Goles marcados por el equipo 1

  @Prop({ type: Number })
  team2Goals: number; // Goles marcados por el equipo 2

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const MatchesSchema = SchemaFactory.createForClass(Matches);