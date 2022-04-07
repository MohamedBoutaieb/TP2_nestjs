
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {Skill} from 'src/skill/entities/skill.entity';
import { Cv } from 'src/entities/cv.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;
  @Column({ nullable: false })
  username: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @OneToMany(
    () => Cv,(cv)=>cv.user,
    )
    Cvs : Cv[] ;
  @DeleteDateColumn()
  del;
  

}