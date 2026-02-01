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
import { CreateRepasseDto, ListRepasseDto, RepasseOutputDto } from '../../../application/dtos/repasse';
import {
  CreateRepasseUseCase,
  GetRepasseUseCase,
  ListRepassesUseCase,
} from '../../../application/use-cases/repasse';

@ApiTags('Repasses')
@Controller('repasses')
export class RepasseController {
  constructor(
    private readonly createRepasseUseCase: CreateRepasseUseCase,
    private readonly getRepasseUseCase: GetRepasseUseCase,
    private readonly listRepassesUseCase: ListRepassesUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Registrar repasse', description: 'Registra um novo repasse financeiro. Status inicial: pendente' })
  @ApiResponse({ status: 201, description: 'Repasse registrado com sucesso', type: RepasseOutputDto })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 404, description: 'Médico não encontrado' })
  create(@Body() dto: CreateRepasseDto) {
    return this.createRepasseUseCase.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar repasses', description: 'Retorna repasses com filtros opcionais' })
  @ApiResponse({ status: 200, description: 'Lista de repasses', type: [RepasseOutputDto] })
  findAll(@Query() dto: ListRepasseDto) {
    return this.listRepassesUseCase.execute(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar repasse', description: 'Retorna os dados de um repasse específico' })
  @ApiParam({ name: 'id', description: 'ID do repasse' })
  @ApiResponse({ status: 200, description: 'Dados do repasse', type: RepasseOutputDto })
  @ApiResponse({ status: 404, description: 'Repasse não encontrado' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.getRepasseUseCase.execute(id);
  }
}
