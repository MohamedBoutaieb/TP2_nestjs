import {IsNotEmpty,IsOptional} from "class-validator";


export class CreateUserDto {
    id: string;
    @IsNotEmpty()
    username: string;
    @IsNotEmpty()
    password: string;
    @IsOptional()
    email: string;
}
