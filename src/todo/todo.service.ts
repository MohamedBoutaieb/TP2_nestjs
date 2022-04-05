import { Injectable, NotFoundException } from '@nestjs/common';
import { Between, Like, Repository } from "typeorm";
import { TodoEntity } from './Entity/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateTodoDto } from './update-todo.dto';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { SearchTodoDto } from './dto/search-todo.dto';

@Injectable()
export class TodoService {

  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}
  async getStats(searchTodoDto: SearchTodoDto) {
   if (searchTodoDto.dateArrival && searchTodoDto.dateDepart){
     return await this.todoRepository.count({withDeleted: true, where:[{status: searchTodoDto.status
    }, {createdAt: Between(searchTodoDto.dateDepart, searchTodoDto.dateArrival) }] });
   }
   return await this.todoRepository.count({withDeleted: true, where:{status: searchTodoDto.status} });
  }
  addTodo(todo: Partial<TodoEntity>): Promise<TodoEntity> {
    return this.todoRepository.save(todo);
  }

  async updateTodo(
    updateTodoDto: UpdateTodoDto,
    id: string,
  ): Promise<TodoEntity> {
    const newTodo = await this.todoRepository.preload({ id, ...updateTodoDto });
    if (newTodo) {
      return this.todoRepository.save(newTodo);
    } else {
      throw new NotFoundException(`Le todo d'id ${id} n'existe pas `);
    }
  }

  async deleteTodo(id: string): Promise<DeleteResult> {
    const result = await this.todoRepository.delete(id);
    if (result.affected) {
      return result;
    }
    throw new NotFoundException(`Le todo d'id ${id} n'existe pas `);
  }
  async softDeleteTodo(id: string): Promise<UpdateResult> {
    const result = await this.todoRepository.softDelete(id);
    if (result.affected) {
      return result;
    }
    throw new NotFoundException(`Le todo d'id ${id} n'existe pas `);
  }

  async softRestoreTodo(id: string) {
    const result = await this.todoRepository.restore(id);
    if (result.affected) {
      return result;
    }
    throw new NotFoundException(`Le todo d'id ${id} n'existe pas `);
  }

  async findAll(searchTodoDto: SearchTodoDto): Promise<TodoEntity[]> {
    const criterias = [];
    if (searchTodoDto.status) {
      criterias.push({ status: searchTodoDto.status });
    }
    console.log(searchTodoDto);
    if (searchTodoDto.criteria) {
      criterias.push({ name: Like(`%${searchTodoDto.criteria}%`) });
      criterias.push({ description: Like(`%${searchTodoDto.criteria}%`) });
    }
    console.log(criterias);
    if (criterias.length) { 
      return await this.todoRepository.find({ withDeleted: true, where: criterias });
    }
    return  await this.todoRepository.find({ withDeleted: true});
  }
  async findAllByPage(searchTodoDto: SearchTodoDto,page : number): Promise<TodoEntity[]> {
    const criterias = [];
    if (searchTodoDto.status) {
      criterias.push({ status: searchTodoDto.status });
    }
    console.log(searchTodoDto);
    if (searchTodoDto.criteria) {
      criterias.push({ name: Like(`%${searchTodoDto.criteria}%`) });
      criterias.push({ description: Like(`%${searchTodoDto.criteria}%`) });
    }
    console.log(criterias);
    if (criterias.length) { 
      return await this.todoRepository.find({ withDeleted: true, where: criterias,skip : (page -1)*3 ,
        take:3 });
    }
    return  await this.todoRepository.find({ withDeleted: true ,skip : (page -1)*3 ,
      take:3});
  }
}
