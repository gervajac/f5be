import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { League } from "src/league/league.entity";
import { Players } from "src/players/players.entity";

@Entity()
export class Matches {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @Column("simple-array")
    team1: string[]; // Array de nombres de jugadores del equipo 1

    @Column("simple-array")
    team2: string[]; // Array de nombres de jugadores del equipo 2

    @Column("simple-array", { nullable: true })
    winner: string[]; // Nombre del equipo ganador, puede ser 'team1' o 'team2'

    @Column("simple-array", { nullable: true })
    losser: string[]; // Nombre del equipo ganador, puede ser 'team1' o 'team2'
    
    @Column("simple-array", { nullable: true })
    tie: string[]; // Nombre del equipo ganador, puede ser 'team1' o 'team2'

    @ManyToOne(() => League, league => league.matches)
    league: League; // Relación con la liga a la que pertenece el partido

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;
}

const matches = new Matches()