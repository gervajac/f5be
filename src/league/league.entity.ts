import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany } from "typeorm";
import { Matches } from "src/matches/matches.entity";
import { Players } from "src/players/players.entity";

@Entity()
export class League {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    days: string;

    @Column()
    stadium: string;

    @Column()
    hour: string;

    @OneToMany(() => Matches, match => match.league)
    matches: Matches[];

    @ManyToMany(() => Players, player => player.leagues)
    players: Players[];

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createdAt: Date;
}

const leagues = new League()