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
import { CreateMedicoDto, UpdateMedicoDto } from '../../../application/dtos/medico';
import { GetSaldoDto } from '../../../application/dtos/saldo';
import {
  CreateMedicoUseCase,
  GetMedicoUseCase,
  GetSaldoMedicoUseCase,
  ListMedicosUseCase,
  UpdateMedicoUseCase,
} from '../../../application/use-cases/medico';

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
  create(@Body() dto: CreateMedicoDto) {
    return this.createMedicoUseCase.execute(dto);
  }

  @Get()
  findAll() {
    return this.listMedicosUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.getMedicoUseCase.execute(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateMedicoDto,
  ) {
    return this.updateMedicoUseCase.execute(id, dto);
  }

  @Get(':id/saldo')
  getSaldo(
    @Param('id', ParseUUIDPipe) id: string,
    @Query() dto: GetSaldoDto,
  ) {
    return this.getSaldoMedicoUseCase.execute(id, dto);
  }
}
