import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateProducaoDto, ListProducaoDto } from '../../../application/dtos/producao';
import {
  CreateProducaoUseCase,
  GetProducaoUseCase,
  ListProducoesUseCase,
} from '../../../application/use-cases/producao';

@Controller('producoes')
export class ProducaoController {
  constructor(
    private readonly createProducaoUseCase: CreateProducaoUseCase,
    private readonly getProducaoUseCase: GetProducaoUseCase,
    private readonly listProducoesUseCase: ListProducoesUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateProducaoDto) {
    return this.createProducaoUseCase.execute(dto);
  }

  @Get()
  findAll(@Query() dto: ListProducaoDto) {
    return this.listProducoesUseCase.execute(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.getProducaoUseCase.execute(id);
  }
}
