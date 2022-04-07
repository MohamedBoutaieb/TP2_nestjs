import { Injectable, NotFoundException } from '@nestjs/common';
import { Cv } from 'src/entities/cv.entity';
import { Skill } from 'src/skill/entities/skill.entity';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CvService {
  constructor(
     @InjectRepository(Cv)
    private readonly cvRepository: Repository<Cv>,
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
  ) {}
  async create(createCvDto: CreateCvDto,id: string) {
    
    const usr = await this.UserRepository.findOneById(id);
   if (!usr){ throw new NotFoundException("the user id does not exist");}
   else{ const cv = await  this.cvRepository.save({...createCvDto});
    if (!usr.Cvs) usr.Cvs =[];
    usr.Cvs.push(cv);
    return cv ;}
  }
  
  
  async showSkills(id :string ) {
    const cv = await this.cvRepository.findOne({where : {id: id}});
   if (!cv) throw new NotFoundException("the cv id does not exist");
    if(cv.skills) return cv.skills;
    throw new NotFoundException("you have no skills");
  }

  async findOne(id: string) {
    return await this.cvRepository.findOne({where : {id: id}});
  }
  async addSkill(skillId: string,cvId:string){
    const skill = await this.skillRepository.findOne({where : {id: skillId}});
    const cv = await this.cvRepository.findOne({where : {id: cvId}});
    if (!cv || !skill) throw new NotFoundException("please check your skill or cv id");
    if (!skill.cvs) skill.cvs =[];
    skill.cvs.push(cv);
    if (!cv.skills) cv.skills =[];
    skill.cvs.push(cv);
    await this.skillRepository.save(skill)
    return await this.cvRepository.save(cv);
  }
  async removeSkill(skillId: string,cvId:string){
    const cv = await this.cvRepository.findOne({where : {id: cvId}});
    if (!cv ) throw new NotFoundException("please check your skill or cv id");
    if (!cv.skills) cv.skills =[];
    const skills = [];
    cv.skills.forEach(element => {
      if (element.id!=skillId) skills.push(element);
    });
    return await this.cvRepository.save(cv);
  }

  findAll() {
    return this.cvRepository.find();
  }

   async update(id : string,updateCvDto: UpdateCvDto) {
    
    return await this.cvRepository.save({id,...updateCvDto});
  }

  remove(id: string) {
    return this.cvRepository.softDelete(id);
  }
}
