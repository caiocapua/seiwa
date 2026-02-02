import { Medico } from '../entities/medico.entity';

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
}

export interface IMedicoRepository {
  create(medico: Medico): Promise<Medico>;
  findById(id: string): Promise<Medico | null>;
  findByCrm(crm: string): Promise<Medico | null>;
  findAll(pagination?: PaginationParams): Promise<PaginatedResult<Medico>>;
  update(medico: Medico): Promise<Medico>;
}

export const MEDICO_REPOSITORY = Symbol('IMedicoRepository');
