import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';

@Controller('cv')
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @Post('/:id')
  create(@Body() createCvDto: CreateCvDto,@Param() id: string) {
    return this.cvService.create(createCvDto,id);
  }

  @Get()
  findAll() {
    return this.cvService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cvService.findOne(id);
  }
  @Get(':id/skills')
  showSkills(@Param('id') id: string) {
    return this.cvService.showSkills(id);
  }
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCvDto: UpdateCvDto) {
    return this.cvService.update(id, updateCvDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cvService.remove(id);
  }
  @Get(':cvId/:skillId')
  addSkill(@Param('skillId') id: string,@Param('cvId') id2: string){
    return this.cvService.addSkill(id,id2);
  }
  @Get(':cvId/:skillId')
  removeSkill(@Param('skillId') id: string,@Param('cvId') id2: string){
    return this.cvService.removeSkill(id,id2);
  }
}
