import { Medico } from '../entities/medico.entity';

export interface IMedicoRepository {
  create(medico: Medico): Promise<Medico>;
  findById(id: string): Promise<Medico | null>;
  findByCrm(crm: string): Promise<Medico | null>;
  findAll(): Promise<Medico[]>;
  update(medico: Medico): Promise<Medico>;
}

export const MEDICO_REPOSITORY = Symbol('IMedicoRepository');
