import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateMedicoDto, MedicoOutputDto, UpdateMedicoDto } from '../../../application/dtos/medico';
import { GetSaldoDto, SaldoOutputDto } from '../../../application/dtos/saldo';
import {
  CreateMedicoUseCase,
  GetMedicoUseCase,
  GetSaldoMedicoUseCase,
  ListMedicosUseCase,
  UpdateMedicoUseCase,
} from '../../../application/use-cases/medico';

@ApiTags('Médicos')
@Controller('medicos')
export class MedicoController {
  constructor(
    private readonly createMedicoUseCase: CreateMedicoUseCase,
    private readonly getMedicoUseCase: GetMedicoUseCase,
    private readonly listMedicosUseCase: ListMedicosUseCase,
    private readonly updateMedicoUseCase: UpdateMedicoUseCase,
    private readonly getSaldoMedicoUseCase: GetSaldoMedicoUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar médico', description: 'Cadastra um novo médico no sistema' })
  @ApiResponse({ status: 201, description: 'Médico cadastrado com sucesso', type: MedicoOutputDto })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 409, description: 'CRM já cadastrado' })
  create(@Body() dto: CreateMedicoDto) {
    return this.createMedicoUseCase.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar médicos', description: 'Retorna todos os médicos cadastrados' })
  @ApiResponse({ status: 200, description: 'Lista de médicos', type: [MedicoOutputDto] })
  findAll() {
    return this.listMedicosUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar médico', description: 'Retorna os dados de um médico específico' })
  @ApiParam({ name: 'id', description: 'ID do médico' })
  @ApiResponse({ status: 200, description: 'Dados do médico', type: MedicoOutputDto })
  @ApiResponse({ status: 404, description: 'Médico não encontrado' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.getMedicoUseCase.execute(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar médico', description: 'Atualiza os dados de um médico' })
  @ApiParam({ name: 'id', description: 'ID do médico' })
  @ApiResponse({ status: 200, description: 'Médico atualizado', type: MedicoOutputDto })
  @ApiResponse({ status: 404, description: 'Médico não encontrado' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateMedicoDto,
  ) {
    return this.updateMedicoUseCase.execute(id, dto);
  }

  @Get(':id/saldo')
  @ApiOperation({ summary: 'Consultar saldo', description: 'Retorna o saldo consolidado do médico no período' })
  @ApiParam({ name: 'id', description: 'ID do médico' })
  @ApiResponse({ status: 200, description: 'Saldo consolidado', type: SaldoOutputDto })
  @ApiResponse({ status: 404, description: 'Médico não encontrado' })
  getSaldo(
    @Param('id', ParseUUIDPipe) id: string,
    @Query() dto: GetSaldoDto,
  ) {
    return this.getSaldoMedicoUseCase.execute(id, dto);
  }
}
