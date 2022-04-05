import { IsNotEmpty } from 'class-validator';
export class CreateCvDto {
    @IsNotEmpty() 
    idUser: string;
    designation: string[];
    name: string;
    firstname: string;
    age: number;
    cin: string;
    job: string;
    path: string;
}
