import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cv } from 'src/cv/entities/cv.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,Cv])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
