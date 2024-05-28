import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';
import { League } from 'src/league/schemas/league.schema';
// import { Matches } from 'src/matches/schemas/matches.schema';

@Schema()
export class Players extends Document {
  @Prop({ default: 'https://media.tycsports.com/files/2023/11/27/650254/garnacho_1440x810_wmk.webp?v=1' })
  image: string;

  @Prop({ required: false })
  sex: string;

  @Prop({ required: true })
  fullname: string;

  @Prop({ required: false })
  password: string;

  @Prop({ default: false })
  admin: boolean;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'League' }] })
  leagues: League[];

  // Uncomment and update this if you have a Matches schema
  // @Prop({ type: [{ type: Types.ObjectId, ref: 'Matches' }] })
  // matches: Matches[];
}

export const PlayersSchema = SchemaFactory.createForClass(Players);