import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateRepasseDto,
  ListRepasseDto,
  RepasseOutputDto,
  UpdateRepasseStatusDto,
} from '../../../application/dtos/repasse';
import {
  CreateRepasseUseCase,
  GetRepasseUseCase,
  ListRepassesUseCase,
  UpdateRepasseStatusUseCase,
} from '../../../application/use-cases/repasse';

@ApiTags('Repasses')
@Controller('repasses')
export class RepasseController {
  constructor(
    private readonly createRepasseUseCase: CreateRepasseUseCase,
    private readonly getRepasseUseCase: GetRepasseUseCase,
    private readonly listRepassesUseCase: ListRepassesUseCase,
    private readonly updateRepasseStatusUseCase: UpdateRepasseStatusUseCase,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Registrar repasse',
    description:
      'Registra um novo repasse financeiro. Status inicial: pendente',
  })
  @ApiResponse({
    status: 201,
    description: 'Repasse registrado com sucesso',
    type: RepasseOutputDto,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 404, description: 'Médico não encontrado' })
  create(@Body() dto: CreateRepasseDto) {
    return this.createRepasseUseCase.execute(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar repasses',
    description: 'Retorna repasses com filtros e paginação',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista paginada de repasses',
  })
  findAll(@Query() dto: ListRepasseDto) {
    return this.listRepassesUseCase.execute(dto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar repasse',
    description: 'Retorna os dados de um repasse específico',
  })
  @ApiParam({ name: 'id', description: 'ID do repasse' })
  @ApiResponse({
    status: 200,
    description: 'Dados do repasse',
    type: RepasseOutputDto,
  })
  @ApiResponse({ status: 404, description: 'Repasse não encontrado' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.getRepasseUseCase.execute(id);
  }

  @Patch(':id/status')
  @ApiOperation({
    summary: 'Atualizar status do repasse',
    description:
      'Atualiza o status de um repasse (pendente, processado, cancelado)',
  })
  @ApiParam({ name: 'id', description: 'ID do repasse' })
  @ApiResponse({
    status: 200,
    description: 'Status atualizado',
    type: RepasseOutputDto,
  })
  @ApiResponse({ status: 400, description: 'Transição de status inválida' })
  @ApiResponse({ status: 404, description: 'Repasse não encontrado' })
  updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateRepasseStatusDto,
  ) {
    return this.updateRepasseStatusUseCase.execute(id, dto);
  }
}
