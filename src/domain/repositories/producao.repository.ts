import { Producao } from '../entities/producao.entity';

export interface FindProducaoFilters {
  medicoId?: string;
  hospital?: string;
  dataInicio?: Date;
  dataFim?: Date;
}

export interface IProducaoRepository {
  create(producao: Producao): Promise<Producao>;
  findById(id: string): Promise<Producao | null>;
  findAll(filters?: FindProducaoFilters): Promise<Producao[]>;
  sumByMedicoAndPeriod(
    medicoId: string,
    dataInicio: Date,
    dataFim: Date,
    hospital?: string,
  ): Promise<number>;
}

export const PRODUCAO_REPOSITORY = Symbol('IProducaoRepository');
