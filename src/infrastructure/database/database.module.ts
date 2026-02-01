import { Module } from '@nestjs/common';
import {
  MEDICO_REPOSITORY,
  PRODUCAO_REPOSITORY,
  REPASSE_REPOSITORY,
} from '../../domain/repositories';
import { PrismaService } from './prisma/prisma.service';
import {
  PrismaMedicoRepository,
  PrismaProducaoRepository,
  PrismaRepasseRepository,
} from './repositories';

@Module({
  providers: [
    PrismaService,
    {
      provide: MEDICO_REPOSITORY,
      useClass: PrismaMedicoRepository,
    },
    {
      provide: PRODUCAO_REPOSITORY,
      useClass: PrismaProducaoRepository,
    },
    {
      provide: REPASSE_REPOSITORY,
      useClass: PrismaRepasseRepository,
    },
  ],
  exports: [
    PrismaService,
    MEDICO_REPOSITORY,
    PRODUCAO_REPOSITORY,
    REPASSE_REPOSITORY,
  ],
})
export class DatabaseModule {}
