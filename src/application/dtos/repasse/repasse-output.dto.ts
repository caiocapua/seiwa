import { Repasse } from '../../../domain/entities';
import { RepasseStatus } from '../../../domain/enums';

export class RepasseOutputDto {
  id: string;
  medicoId: string;
  hospital: string;
  valor: number;
  data: Date;
  status: RepasseStatus;
  descricao?: string;
  createdAt: Date;

  static fromEntity(repasse: Repasse): RepasseOutputDto {
    const dto = new RepasseOutputDto();
    dto.id = repasse.id;
    dto.medicoId = repasse.medicoId;
    dto.hospital = repasse.hospital;
    dto.valor = repasse.valor;
    dto.data = repasse.data;
    dto.status = repasse.status;
    dto.descricao = repasse.descricao;
    dto.createdAt = repasse.createdAt;
    return dto;
  }
}
