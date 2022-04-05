import { Module } from '@nestjs/common';
import { CvService } from './cv.service';
import { CvController } from './cv.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cv } from 'src/entities/cv.entity';
import { Skill } from 'src/skill/entities/skill.entity';
import {SkillService } from 'src/skill/skill.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cv,Skill])],
  controllers: [CvController],
  providers: [CvService,SkillService]
})
export class CvModule {}
