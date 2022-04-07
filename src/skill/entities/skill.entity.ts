
import { Cv } from 'src/entities/cv.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Skill {
  constructor(designation: string
  ) {
    this.designation=designation;
  }
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  designation: string;
  @ManyToMany(()=>Cv, cv=>cv.skills)
  @JoinTable()
  cvs: Cv[];
  @DeleteDateColumn()
  del;
}