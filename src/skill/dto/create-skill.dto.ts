import { IsNotEmpty, IsOptional } from 'class-validator';
export class CreateSkillDto {
    @IsNotEmpty()
    @IsOptional()
    designation: string;
    cv: string[];
}
