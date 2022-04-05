import { Injectable } from '@nestjs/common';
import { Cv } from 'src/entities/cv.entity';
import { Skill } from 'src/skill/entities/skill.entity';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CvService {
  constructor(
     @InjectRepository(Cv)
    private readonly cvRepository: Repository<Cv>,
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}
  async create(createCvDto: CreateCvDto) {
    const skills: Skill[] = await Promise.all(
      createCvDto.designation.map((item) =>
        this.preloadDesignationByName(item),
      ),
    );
    const cv: Cv = await this.cvRepository.create({
      ...createCvDto,
      skills,
    });
    return this.cvRepository.save(cv);
  }
  async preloadDesignationByName(designation: string): Promise<Skill> {
    const skill = await this.skillRepository.findOne({where : {designation} } );
    return skill ? skill : this.skillRepository.create(new Skill(designation));
  }

  async findOne(id: string) {
    return await this.cvRepository.findOne({where : {id}});
  }

  findAll() {
    return this.cvRepository.find();
  }

  update(id: number, updateCvDto: UpdateCvDto) {
    //TODO implement this
    return `test`;
  }

  remove(id: number) {
    //TODO implement this
    return `test`;
  }
}
