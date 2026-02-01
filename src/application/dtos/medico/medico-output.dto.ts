import { Medico } from '../../../domain/entities';

export class MedicoOutputDto {
  id: string;
  nome: string;
  crm: string;
  especialidade?: string;
  createdAt: Date;
  updatedAt: Date;

  static fromEntity(medico: Medico): MedicoOutputDto {
    const dto = new MedicoOutputDto();
    dto.id = medico.id;
    dto.nome = medico.nome;
    dto.crm = medico.crm;
    dto.especialidade = medico.especialidade;
    dto.createdAt = medico.createdAt;
    dto.updatedAt = medico.updatedAt;
    return dto;
  }
}
