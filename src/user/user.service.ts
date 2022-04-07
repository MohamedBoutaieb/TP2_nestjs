import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cv } from 'src/cv/entities/cv.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Cv)
   private readonly cvRepository: Repository<Cv>,
   @InjectRepository(User)
   private readonly UserRepository: Repository<User>,
 
 ) {}
  create(createUserDto: CreateUserDto) {
    return this.UserRepository.save(createUserDto);
  }

  findAll() {
    return this.UserRepository.find();
  }

  async findOne(id: string) {
    const usr = await this.UserRepository.findOne({where:{id : id}});
    if (usr ){ return usr;}
    throw new NotFoundException(`user with id ${id} not found`);
  }

   async update(id: string, updateUserDto: UpdateUserDto) {
     const usr = await this.UserRepository.count({where:{id : id}});
  
     if (usr){await this.UserRepository.update(id, updateUserDto);
      return `user with id ${id} has been updated successfully`;
    }
    else {throw new NotFoundException("user is not found");}
  }

  async remove(id: string) {
    const usr = await this.UserRepository.findOne({where:{id : id}});
     if (usr){
      await this.UserRepository.softDelete(id);
      return usr;
     }
       throw new NotFoundException(`user with id ${id} does not exist`); 
    };
    
  }

