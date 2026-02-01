import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateRepasseDto, ListRepasseDto } from '../../../application/dtos/repasse';
import {
  CreateRepasseUseCase,
  GetRepasseUseCase,
  ListRepassesUseCase,
} from '../../../application/use-cases/repasse';

@Controller('repasses')
export class RepasseController {
  constructor(
    private readonly createRepasseUseCase: CreateRepasseUseCase,
    private readonly getRepasseUseCase: GetRepasseUseCase,
    private readonly listRepassesUseCase: ListRepassesUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateRepasseDto) {
    return this.createRepasseUseCase.execute(dto);
  }

  @Get()
  findAll(@Query() dto: ListRepasseDto) {
    return this.listRepassesUseCase.execute(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.getRepasseUseCase.execute(id);
  }
}
