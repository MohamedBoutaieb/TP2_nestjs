import { TodoStatusEnum } from '../enums/todo-status.enum';
import { IsEnum, IsOptional } from 'class-validator';

export class SearchTodoDto {
  @IsOptional()
  criteria: string;
  @IsOptional()
  @IsEnum(TodoStatusEnum)
  status: TodoStatusEnum;
  @IsOptional()
  name: string;
  @IsOptional()
  description: string;
  @IsOptional()
  page = 1;
  @IsOptional()
  dateDepart: Date ;
  @IsOptional()
  dateArrival: Date;
}
