import { type } from 'os';
import { User } from 'src/user/entities/user.entity';
import {Skill} from 'src/skill/entities/skill.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Cv {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  name: string;
  @Column()
  firstname: string;
  @Column()
  cin: string;
  @Column()
  job: string;
  @Column()
  age: number;
  @Column()
  path: string;
  @ManyToOne((type)=>User)
  user: User; 
  @ManyToMany(()=>Skill, skill=>skill.cvs  )
  skills: Skill[];
}
