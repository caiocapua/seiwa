import { Repasse } from '../entities/repasse.entity';
import { RepasseStatus } from '../enums/repasse-status.enum';

export interface FindRepasseFilters {
  medicoId?: string;
  hospital?: string;
  status?: RepasseStatus;
  dataInicio?: Date;
  dataFim?: Date;
}

export interface IRepasseRepository {
  create(repasse: Repasse): Promise<Repasse>;
  findById(id: string): Promise<Repasse | null>;
  findAll(filters?: FindRepasseFilters): Promise<Repasse[]>;
  update(repasse: Repasse): Promise<Repasse>;
  sumByMedicoAndPeriod(
    medicoId: string,
    dataInicio: Date,
    dataFim: Date,
    status: RepasseStatus,
    hospital?: string,
  ): Promise<number>;
}

export const REPASSE_REPOSITORY = Symbol('IRepasseRepository');
