import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import {
  CreateMedicoUseCase,
  GetMedicoUseCase,
  GetSaldoMedicoUseCase,
  ListMedicosUseCase,
  UpdateMedicoUseCase,
} from '../application/use-cases/medico';
import {
  CreateProducaoUseCase,
  GetProducaoUseCase,
  ListProducoesUseCase,
} from '../application/use-cases/producao';
import {
  CreateRepasseUseCase,
  GetRepasseUseCase,
  ListRepassesUseCase,
} from '../application/use-cases/repasse';
import { DatabaseModule } from '../infrastructure/database/database.module';
import {
  MedicoController,
  ProducaoController,
  RepasseController,
} from './http/controllers';
import { DomainExceptionFilter } from './http/filters';

@Module({
  imports: [DatabaseModule],
  controllers: [MedicoController, ProducaoController, RepasseController],
  providers: [
    // Filters
    {
      provide: APP_FILTER,
      useClass: DomainExceptionFilter,
    },
    // Medico Use Cases
    CreateMedicoUseCase,
    GetMedicoUseCase,
    ListMedicosUseCase,
    UpdateMedicoUseCase,
    GetSaldoMedicoUseCase,
    // Producao Use Cases
    CreateProducaoUseCase,
    GetProducaoUseCase,
    ListProducoesUseCase,
    // Repasse Use Cases
    CreateRepasseUseCase,
    GetRepasseUseCase,
    ListRepassesUseCase,
  ],
})
export class PresentationModule {}
