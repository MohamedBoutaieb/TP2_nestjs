import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Skill } from './entities/skill.entity';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository : Repository<Skill>  )
  {}
  async create(createSkillDto: CreateSkillDto) {
    return await this.skillRepository.save(createSkillDto);
  }

  async findAll() {
    const skills = await this.skillRepository.find();
    if ( ! skills.length) {throw new NotFoundException("you have no skills");}
    return skills;
  }
  
  async findOne(id: string) {
    const skills = await this.skillRepository.findOne({where :{id: id}});
    if (!skills) {throw new NotFoundException("there is no skill with such id");}
    return skills;
  }

  async update(id: string, updateSkillDto: UpdateSkillDto) {
    const skill = await this.skillRepository.findOne({where :{id: id}});
    if (!skill) {throw new NotFoundException("there is no skill with such id");}
    skill.designation= updateSkillDto?.designation;
    return await this.skillRepository.save(skill);
  }

  remove(id: string ) {
    return this.skillRepository.softDelete(id);
  }
}
