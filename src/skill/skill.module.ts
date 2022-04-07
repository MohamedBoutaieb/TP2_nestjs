import { Module } from '@nestjs/common';
import { SkillService } from './skill.service';
import { SkillController } from './skill.controller';
import { Skill } from './entities/skill.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cv } from 'src/cv/entities/cv.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Skill,Cv])],
  controllers: [SkillController],
  providers: [SkillService]
})
export class SkillModule {}
