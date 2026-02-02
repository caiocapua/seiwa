import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateProducaoDto,
  ListProducaoDto,
  ProducaoOutputDto,
} from '../../../application/dtos/producao';
import {
  CreateProducaoUseCase,
  GetProducaoUseCase,
  ListProducoesUseCase,
} from '../../../application/use-cases/producao';

@ApiTags('Produções')
@Controller('producoes')
export class ProducaoController {
  constructor(
    private readonly createProducaoUseCase: CreateProducaoUseCase,
    private readonly getProducaoUseCase: GetProducaoUseCase,
    private readonly listProducoesUseCase: ListProducoesUseCase,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Registrar produção',
    description: 'Registra uma nova produção médica',
  })
  @ApiResponse({
    status: 201,
    description: 'Produção registrada com sucesso',
    type: ProducaoOutputDto,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 404, description: 'Médico não encontrado' })
  create(@Body() dto: CreateProducaoDto) {
    return this.createProducaoUseCase.execute(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar produções',
    description: 'Retorna produções com filtros e paginação',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista paginada de produções',
  })
  findAll(@Query() dto: ListProducaoDto) {
    return this.listProducoesUseCase.execute(dto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar produção',
    description: 'Retorna os dados de uma produção específica',
  })
  @ApiParam({ name: 'id', description: 'ID da produção' })
  @ApiResponse({
    status: 200,
    description: 'Dados da produção',
    type: ProducaoOutputDto,
  })
  @ApiResponse({ status: 404, description: 'Produção não encontrada' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.getProducaoUseCase.execute(id);
  }
}
