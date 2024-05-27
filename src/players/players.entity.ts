import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { League } from "src/league/league.entity";
import { Matches } from "src/matches/matches.entity";

@Entity()
export class Players {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: "https://media.tycsports.com/files/2023/11/27/650254/garnacho_1440x810_wmk.webp?v=1"})
    image: string;

    @Column({nullable: true})
    sex: string;

    @Column({nullable: true})
    fullname: string;

    @Column({nullable: true})
    password: string;

    @Column({default: false})
    admin: boolean;

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createdAt: Date;

    @ManyToMany(() => League, league => league.players)
    @JoinTable()
    leagues: League[];

    // @ManyToMany(() => Matches, match => match.players)
    // @JoinTable()
    // matches: Matches[];
}

const players = new Players()